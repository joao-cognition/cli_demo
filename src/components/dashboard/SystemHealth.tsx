"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { formatLatency, formatUptime, getRelativeTime } from "@/lib/utils";
import type { ServiceStatus } from "@/types";

interface SystemHealthProps {
  services: ServiceStatus[];
}

const statusConfig = {
  healthy: { variant: "success" as const, label: "Healthy" },
  degraded: { variant: "warning" as const, label: "Degraded" },
  down: { variant: "danger" as const, label: "Down" },
};

// TODO: add service dependency graph visualization
export function SystemHealth({ services }: SystemHealthProps) {
  const healthyCount = services.filter((s) => s.status === "healthy").length;
  const totalCount = services.length;

  return (
    <Card>
      <CardHeader
        action={
          <span className="text-xs tabular-nums text-zinc-500">
            {healthyCount}/{totalCount} healthy
          </span>
        }
      >
        Service Health
      </CardHeader>
      <CardContent className="space-y-1 p-2">
        {services.map((service) => {
          const config = statusConfig[service.status];

          return (
            <div
              key={service.id}
              className={cn(
                "flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors",
                "hover:bg-white/[0.03]"
              )}
            >
              {/* Status indicator */}
              <div className="relative flex h-2.5 w-2.5 shrink-0">
                {service.status !== "down" && (
                  <span
                    className={cn(
                      "absolute inline-flex h-full w-full rounded-full opacity-75",
                      service.status === "healthy"
                        ? "animate-ping bg-emerald-400"
                        : "animate-pulse bg-amber-400"
                    )}
                  />
                )}
                <span
                  className={cn(
                    "relative inline-flex h-2.5 w-2.5 rounded-full",
                    service.status === "healthy" && "bg-emerald-400",
                    service.status === "degraded" && "bg-amber-400",
                    service.status === "down" && "bg-red-500"
                  )}
                />
              </div>

              {/* Service info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-200">
                    {service.name}
                  </span>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-[11px] text-zinc-600">
                  <span>{service.region}</span>
                  <span>
                    {service.status === "down"
                      ? "—"
                      : formatLatency(service.latency)}
                  </span>
                  <span>{formatUptime(service.uptime)}</span>
                  <span>{getRelativeTime(service.lastCheck)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
