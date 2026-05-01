"use client";

import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { LiveChart } from "@/components/dashboard/LiveChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import { metrics, services, activityFeed } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="grid-bg min-h-screen">
      <Header
        title="Dashboard"
        subtitle="Real-time infrastructure overview"
      />

      <div className="space-y-6 p-8">
        {/* Metrics grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <LiveChart />
          </div>
          <div>
            <ActivityFeed events={activityFeed} />
          </div>
        </div>

        {/* System Health */}
        <SystemHealth services={services} />
      </div>
    </div>
  );
}
