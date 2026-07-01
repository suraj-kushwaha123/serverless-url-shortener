import api from "./api";

const emptyAnalytics = {
  totalClicks: 0,
  todayClicks: 0,
  countriesCount: 0,
  devicesCount: 0,
  dailyClicks: [],
  trafficSources: [],
  recentActivity: [],
  topCountries: [],
  deviceDistribution: [],
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const countryFlags = {
  India: "🇮🇳",
  USA: "🇺🇸",
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  Canada: "🇨🇦",
  Germany: "🇩🇪",
};

export async function getAnalytics(userId) {
  try {
    const response = await api.get("/analytics", {
      params: { userId },
    });

    return normalizeAnalyticsResponse(response.data);
  } catch (analyticsError) {
    if (!shouldFallbackToUrls(analyticsError)) {
      throw analyticsError;
    }

    const response = await api.get("/urls", {
      params: { userId },
    });

    return buildAnalyticsFromUrls(response.data);
  }
}

function shouldFallbackToUrls(error) {
  const status = error?.response?.status;

  return !status || status === 404 || status === 405;
}

function normalizeAnalyticsResponse(payload) {
  const source = payload?.analytics || payload || {};
  const urls = getArray(source.urls || source.items || source.links);

  if (hasAnalyticsCollections(source)) {
    return {
      ...emptyAnalytics,
      totalClicks: getNumber(source.totalClicks),
      todayClicks: getNumber(source.todayClicks || source.todaysClicks),
      countriesCount: getNumber(source.countriesCount || source.countries),
      devicesCount: getNumber(source.devicesCount || source.devices),
      dailyClicks: normalizeDailyClicks(source.dailyClicks || source.clicksByDay),
      trafficSources: normalizeNameValueList(source.trafficSources || source.referrers),
      recentActivity: normalizeRecentActivity(source.recentActivity || source.latestClicks),
      topCountries: normalizeCountries(source.topCountries || source.countries),
      deviceDistribution: normalizeDevices(source.deviceDistribution || source.devices),
    };
  }

  return buildAnalyticsFromUrls(urls);
}

function hasAnalyticsCollections(source) {
  return Boolean(
    source.dailyClicks ||
    source.clicksByDay ||
    source.trafficSources ||
    source.referrers ||
    source.recentActivity ||
    source.latestClicks ||
    source.topCountries ||
    source.deviceDistribution
  );
}

function buildAnalyticsFromUrls(urlsPayload) {
  const urls = getArray(urlsPayload);
  const totalClicks = urls.reduce((sum, item) => sum + getNumber(item.clicks), 0);
  const events = urls.flatMap((url) => getClickEvents(url));
  const todayClicks = countTodayClicks(events, urls);
  const dailyClicks = buildDailyClicks(events, urls);
  const trafficSources = buildTrafficSources(events, urls, totalClicks);
  const topCountries = buildTopCountries(events);
  const deviceDistribution = buildDeviceDistribution(events);
  const recentActivity = buildRecentActivity(events, urls);

  return {
    ...emptyAnalytics,
    totalClicks,
    todayClicks,
    countriesCount: topCountries.length,
    devicesCount: deviceDistribution.length,
    dailyClicks,
    trafficSources,
    recentActivity,
    topCountries,
    deviceDistribution,
  };
}

function getClickEvents(url) {
  const possibleEvents =
    url.clickEvents ||
    url.clicksHistory ||
    url.clickHistory ||
    url.analytics ||
    url.visits ||
    [];

  return getArray(possibleEvents).map((event) => ({
    ...event,
    shortCode: event.shortCode || url.shortCode,
    longUrl: event.longUrl || url.longUrl,
    clicks: getNumber(event.clicks || event.value || event.count || 1) || 1,
  }));
}

function countTodayClicks(events, urls) {
  const today = new Date().toDateString();

  if (events.length > 0) {
    return events.reduce((sum, event) => {
      const date = getDate(event.timestamp || event.createdAt || event.date);

      return date?.toDateString() === today ? sum + event.clicks : sum;
    }, 0);
  }

  return urls.reduce((sum, url) => {
    const date = getDate(url.lastClickedAt || url.updatedAt || url.createdAt);

    return date?.toDateString() === today ? sum + getNumber(url.clicks) : sum;
  }, 0);
}

function buildDailyClicks(events, urls) {
  const days = getLastSevenDays();
  const counts = new Map(days.map((day) => [day.key, 0]));

  if (events.length > 0) {
    events.forEach((event) => {
      const date = getDate(event.timestamp || event.createdAt || event.date);
      const key = getDateKey(date);

      if (counts.has(key)) {
        counts.set(key, counts.get(key) + event.clicks);
      }
    });
  } else {
    urls.forEach((url) => {
      const date = getDate(url.lastClickedAt || url.updatedAt || url.createdAt);
      const key = getDateKey(date);

      if (counts.has(key)) {
        counts.set(key, counts.get(key) + getNumber(url.clicks));
      }
    });
  }

  return days.map((day) => ({
    day: day.label,
    clicks: counts.get(day.key) || 0,
  }));
}

function buildTrafficSources(events, urls, totalClicks) {
  const sources = countBy(events, (event) => event.source || event.referrer || event.referrerDomain || "Direct");

  if (sources.length > 0) {
    return normalizeNameValueList(sources);
  }

  return urls.length > 0 && totalClicks > 0
    ? [{ name: "Tracked URLs", value: totalClicks }]
    : [];
}

function buildTopCountries(events) {
  const total = events.reduce((sum, event) => sum + event.clicks, 0);

  return countBy(events, (event) => event.country || event.countryName || "Unknown")
    .slice(0, 5)
    .map((item) => ({
      country: item.name,
      clicks: item.value,
      flag: countryFlags[item.name] || "",
      percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
    }));
}

function buildDeviceDistribution(events) {
  const total = events.reduce((sum, event) => sum + event.clicks, 0);

  return countBy(events, (event) => event.device || event.deviceType || "Unknown")
    .map((item) => ({
      name: item.name,
      value: total > 0 ? Math.round((item.value / total) * 100) : 0,
    }));
}

function buildRecentActivity(events, urls) {
  if (events.length > 0) {
    return [...events]
      .sort((a, b) => getDateValue(b.timestamp || b.createdAt || b.date) - getDateValue(a.timestamp || a.createdAt || a.date))
      .slice(0, 5)
      .map((event) => ({
        time: formatRelativeTime(event.timestamp || event.createdAt || event.date),
        country: formatCountry(event.country || event.countryName),
        device: event.device || event.deviceType || "Unknown",
        browser: event.browser || event.userAgentBrowser || "Unknown",
      }));
  }

  return [...urls]
    .sort((a, b) => getDateValue(b.lastClickedAt || b.updatedAt || b.createdAt) - getDateValue(a.lastClickedAt || a.updatedAt || a.createdAt))
    .slice(0, 5)
    .map((url) => ({
      time: formatRelativeTime(url.lastClickedAt || url.updatedAt || url.createdAt),
      country: "Not tracked",
      device: "Not tracked",
      browser: url.shortCode || "URL",
    }));
}

function normalizeDailyClicks(items) {
  return getArray(items).map((item) => ({
    day: item.day || item.date || item.label || "Unknown",
    clicks: getNumber(item.clicks || item.value || item.count),
  }));
}

function normalizeNameValueList(items) {
  return getArray(items)
    .map((item) => ({
      name: item.name || item.source || item.label || item.referrer || "Unknown",
      value: getNumber(item.value || item.clicks || item.count),
    }))
    .filter((item) => item.value > 0);
}

function normalizeCountries(items) {
  const normalized = getArray(items).map((item) => ({
    country: item.country || item.name || item.label || "Unknown",
    clicks: getNumber(item.clicks || item.value || item.count),
    flag: item.flag || countryFlags[item.country || item.name] || "",
    percentage: getNumber(item.percentage),
  }));
  const total = normalized.reduce((sum, item) => sum + item.clicks, 0);

  return normalized.map((item) => ({
    ...item,
    percentage: item.percentage || (total > 0 ? Math.round((item.clicks / total) * 100) : 0),
  }));
}

function normalizeDevices(items) {
  const normalized = getArray(items).map((item) => ({
    name: item.name || item.device || item.label || "Unknown",
    clicks: getNumber(item.clicks || item.count),
    value: getNumber(item.value || item.percentage),
  }));
  const total = normalized.reduce((sum, item) => sum + item.clicks, 0);

  return normalized.map((item) => ({
    name: item.name,
    value: item.value || (total > 0 ? Math.round((item.clicks / total) * 100) : 0),
  }));
}

function normalizeRecentActivity(items) {
  return getArray(items).map((item) => ({
    time: item.time || formatRelativeTime(item.timestamp || item.createdAt || item.date),
    country: item.country || formatCountry(item.countryName),
    device: item.device || item.deviceType || "Unknown",
    browser: item.browser || item.userAgentBrowser || "Unknown",
  }));
}

function countBy(items, getKey) {
  const counts = new Map();

  items.forEach((item) => {
    const key = getKey(item) || "Unknown";
    counts.set(key, (counts.get(key) || 0) + item.clicks);
  });

  return [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function getLastSevenDays() {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    return {
      key: getDateKey(date),
      label: DAY_LABELS[date.getDay()],
    };
  });
}

function getDateKey(date) {
  if (!date) return "";

  return date.toISOString().slice(0, 10);
}

function getDate(value) {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function getDateValue(value) {
  return getDate(value)?.getTime() || 0;
}

function formatRelativeTime(value) {
  const date = getDate(value);

  if (!date) return "Unknown";

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays <= 0) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (diffDays === 1) return "Yesterday";

  return `${diffDays} days ago`;
}

function formatCountry(country) {
  if (!country) return "Unknown";

  const flag = countryFlags[country];

  return flag ? `${flag} ${country}` : country;
}

function getArray(value) {
  return Array.isArray(value) ? value : [];
}

function getNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}
