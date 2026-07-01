from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone

import boto3
from boto3.dynamodb.conditions import Key

from common import CLICKS_TABLE, URLS_TABLE, get_user_id, response

dynamodb = boto3.resource("dynamodb")
clicks_table = dynamodb.Table(CLICKS_TABLE)
urls_table = dynamodb.Table(URLS_TABLE)

COUNTRY_FLAGS = {
    "India": "🇮🇳",
    "USA": "🇺🇸",
    "United States": "🇺🇸",
    "United Kingdom": "🇬🇧",
    "Canada": "🇨🇦",
    "Germany": "🇩🇪",
}


def lambda_handler(event, context):
    user_id = get_user_id(event)

    if not user_id:
        return response(401, {"message": "Authentication is required."})

    urls = get_user_urls(user_id)
    clicks = get_user_clicks(user_id)
    total_clicks = sum(int(url.get("clicks", 0)) for url in urls)

    return response(
        200,
        {
            "totalClicks": total_clicks,
            "todayClicks": today_clicks(clicks),
            "countriesCount": len({item.get("country") for item in clicks if item.get("country") and item.get("country") != "Unknown"}),
            "devicesCount": len({item.get("device") for item in clicks if item.get("device")}),
            "dailyClicks": daily_clicks(clicks),
            "trafficSources": name_value(clicks, "source"),
            "topCountries": top_countries(clicks),
            "deviceDistribution": device_distribution(clicks),
            "recentActivity": recent_activity(clicks, urls),
        },
    )


def get_user_urls(user_id):
    result = urls_table.query(
        IndexName="UserIdIndex",
        KeyConditionExpression=Key("userId").eq(user_id),
        ScanIndexForward=False,
    )

    return result.get("Items", [])


def get_user_clicks(user_id):
    result = clicks_table.query(
        IndexName="UserIdClickedAtIndex",
        KeyConditionExpression=Key("userId").eq(user_id),
        ScanIndexForward=False,
        Limit=1000,
    )

    return result.get("Items", [])


def today_clicks(clicks):
    today = datetime.now(timezone.utc).date()

    return sum(1 for item in clicks if parse_date(item.get("clickedAt")).date() == today)


def daily_clicks(clicks):
    today = datetime.now(timezone.utc).date()
    days = [today - timedelta(days=offset) for offset in range(6, -1, -1)]
    counts = defaultdict(int)

    for item in clicks:
        date = parse_date(item.get("clickedAt")).date()
        if date in days:
            counts[date] += 1

    return [
        {
            "day": day.strftime("%a"),
            "clicks": counts[day],
        }
        for day in days
    ]


def name_value(clicks, field):
    counts = Counter(item.get(field) or "Unknown" for item in clicks)

    return [
        {"name": name, "value": value}
        for name, value in counts.most_common()
        if value > 0
    ]


def top_countries(clicks):
    counts = Counter(item.get("country") or "Unknown" for item in clicks)
    total = sum(counts.values())

    return [
        {
            "country": country,
            "clicks": count,
            "flag": COUNTRY_FLAGS.get(country, ""),
            "percentage": round((count / total) * 100) if total else 0,
        }
        for country, count in counts.most_common(5)
        if country != "Unknown"
    ]


def device_distribution(clicks):
    counts = Counter(item.get("device") or "Unknown" for item in clicks)
    total = sum(counts.values())

    return [
        {
            "name": device,
            "value": round((count / total) * 100) if total else 0,
        }
        for device, count in counts.most_common()
        if device != "Unknown"
    ]


def recent_activity(clicks, urls):
    if clicks:
        return [
            {
                "time": format_relative_time(item.get("clickedAt")),
                "country": format_country(item.get("country")),
                "device": item.get("device", "Unknown"),
                "browser": item.get("browser", "Unknown"),
            }
            for item in clicks[:5]
        ]

    return [
        {
            "time": format_relative_time(item.get("updatedAt") or item.get("createdAt")),
            "country": "Not tracked",
            "device": "Not tracked",
            "browser": item.get("shortCode", "URL"),
        }
        for item in urls[:5]
    ]


def parse_date(value):
    if not value:
        return datetime.fromtimestamp(0, timezone.utc)

    clean_value = value.split("#")[0]

    try:
        parsed = datetime.fromisoformat(clean_value.replace("Z", "+00:00"))
    except ValueError:
        return datetime.fromtimestamp(0, timezone.utc)

    return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)


def format_relative_time(value):
    parsed = parse_date(value)
    diff = datetime.now(timezone.utc) - parsed

    if diff.days <= 0:
        return parsed.strftime("%I:%M %p")

    if diff.days == 1:
        return "Yesterday"

    return f"{diff.days} days ago"


def format_country(country):
    if not country or country == "Unknown":
        return "Unknown"

    flag = COUNTRY_FLAGS.get(country, "")

    return f"{flag} {country}".strip()
