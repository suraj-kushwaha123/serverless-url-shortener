import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import AppShell from "../components/AppShell";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import OverviewCards from "../components/analytics/OverviewCards";
import ClickChart from "../components/analytics/ClickChart";
import TrafficSources from "../components/analytics/TrafficSources";
import RecentActivity from "../components/analytics/RecentActivity";
import TopCountries from "../components/analytics/TopCountries";
import DeviceDistribution from "../components/analytics/DeviceDistribution";
import { getAnalytics } from "../services/analytics";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAnalytics() {
      try {
        const currentUser = await getCurrentUser();
        const data = await getAnalytics(currentUser.userId);

        if (isMounted) {
          setAnalytics(data);
          setError("");
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError("Failed to load analytics data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          <AnalyticsHeader />

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8">
            <OverviewCards
              analytics={analytics}
              loading={loading}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            <div className="lg:col-span-2">
              <ClickChart
                data={analytics?.dailyClicks}
                loading={loading}
              />
            </div>

            <TrafficSources
              data={analytics?.trafficSources}
              loading={loading}
            />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            <div className="lg:col-span-2">
              <RecentActivity
                activities={analytics?.recentActivity}
                loading={loading}
              />
            </div>

            <div className="space-y-6">

              <TopCountries
                countries={analytics?.topCountries}
                loading={loading}
              />

              <DeviceDistribution
                devices={analytics?.deviceDistribution}
                loading={loading}
              />

            </div>

          </div>
      </div>
    </AppShell>
  );
}
