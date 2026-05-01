"use client";

import { Header } from "@/components/layout/Header";
import {
  ServiceLatencyChart,
  ResourceGauge,
} from "@/components/monitoring/ServiceStatus";
import { AlertsPanel } from "@/components/monitoring/AlertsPanel";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { services, alerts } from "@/lib/mock-data";

// TODO: add log aggregation viewer with full-text search
// TODO: add distributed tracing visualization
export default function MonitoringPage() {
  return (
    <div className="grid-bg min-h-screen">
      <Header
        title="Monitoring"
        subtitle="Real-time service health and resource utilization"
      />

      <div className="space-y-6 p-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ServiceLatencyChart />

          <Card>
            <CardHeader>Resource Utilization</CardHeader>
            <CardContent className="space-y-6">
              <ResourceGauge
                label="CPU"
                value={67.4}
                max={100}
                unit="%"
                color="#06b6d4"
              />
              <ResourceGauge
                label="Memory"
                value={82.1}
                max={100}
                unit="%"
                color="#a855f7"
              />
              <ResourceGauge
                label="Disk I/O"
                value={45.8}
                max={100}
                unit="%"
                color="#22c55e"
              />
              <ResourceGauge
                label="Network"
                value={73.2}
                max={100}
                unit="%"
                color="#f59e0b"
              />
              <ResourceGauge
                label="GPU (Inference)"
                value={91.7}
                max={100}
                unit="%"
                color="#ef4444"
              />
            </CardContent>
          </Card>
        </div>

        <AlertsPanel alerts={alerts} />
        <SystemHealth services={services} />
      </div>
    </div>
  );
}
