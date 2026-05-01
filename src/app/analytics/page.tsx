"use client";

import { Header } from "@/components/layout/Header";
import { TrafficChart } from "@/components/analytics/TrafficChart";
import { EndpointTable } from "@/components/analytics/EndpointTable";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { endpoints, generateTrafficData } from "@/lib/mock-data";
import { formatNumber, formatBytes } from "@/lib/utils";

// TODO: add geographic distribution map for requests
// TODO: add comparison mode (current vs previous period)
export default function AnalyticsPage() {
  const trafficData = generateTrafficData();
  const totalRequests = trafficData.reduce((sum, d) => sum + d.requests, 0);
  const totalErrors = trafficData.reduce((sum, d) => sum + d.errors, 0);
  const avgBandwidth =
    trafficData.reduce((sum, d) => sum + d.bandwidth, 0) / trafficData.length;

  return (
    <div className="grid-bg min-h-screen">
      <Header
        title="Analytics"
        subtitle="Request patterns and endpoint performance"
      />

      <div className="space-y-6 p-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>Total Requests (24h)</CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tabular-nums text-zinc-100">
                {formatNumber(totalRequests)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Total Errors (24h)</CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tabular-nums text-red-400">
                {formatNumber(totalErrors)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Avg Bandwidth</CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tabular-nums text-cyan-400">
                {formatBytes(avgBandwidth)}/h
              </p>
            </CardContent>
          </Card>
        </div>

        <TrafficChart />
        <EndpointTable endpoints={endpoints} />
      </div>
    </div>
  );
}
