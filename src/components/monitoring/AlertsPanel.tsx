"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getRelativeTime } from "@/lib/utils";
import type { Alert } from "@/types";

interface AlertsPanelProps {
  alerts: Alert[];
}

const severityConfig = {
  critical: { variant: "danger" as const, icon: AlertTriangle },
  warning: { variant: "warning" as const, icon: AlertTriangle },
  info: { variant: "info" as const, icon: CheckCircle2 },
};

// TODO: add alert grouping by service
// TODO: add PagerDuty / Opsgenie integration for critical alerts
export function AlertsPanel({ alerts: initialAlerts }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState(initialAlerts);

  const acknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const dismiss = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <Card>
      <CardHeader
        action={
          unacknowledgedCount > 0 ? (
            <Badge variant="danger" pulse>
              {unacknowledgedCount} unack
            </Badge>
          ) : (
            <Badge variant="success">All clear</Badge>
          )
        }
      >
        Active Alerts
      </CardHeader>
      <CardContent className="space-y-2 p-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-zinc-600">
            <CheckCircle2 className="mb-2 h-8 w-8" />
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  "rounded-lg border px-4 py-3 transition-all",
                  alert.acknowledged
                    ? "border-white/[0.04] bg-white/[0.01]"
                    : alert.severity === "critical"
                      ? "border-red-500/20 bg-red-500/[0.05]"
                      : "border-amber-500/15 bg-amber-500/[0.03]"
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      alert.severity === "critical"
                        ? "text-red-400"
                        : alert.severity === "warning"
                          ? "text-amber-400"
                          : "text-cyan-400"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-200">
                        {alert.title}
                      </span>
                      <Badge variant={config.variant}>
                        {alert.severity}
                      </Badge>
                      {alert.acknowledged && (
                        <Badge variant="default">ACK</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      {alert.description}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-[11px] text-zinc-600">
                      <span>{alert.service}</span>
                      <span>
                        {alert.metric}: {alert.currentValue} (threshold:{" "}
                        {alert.threshold})
                      </span>
                      <span>{getRelativeTime(alert.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!alert.acknowledged && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => acknowledge(alert.id)}
                      >
                        ACK
                      </Button>
                    )}
                    <button
                      onClick={() => dismiss(alert.id)}
                      className="rounded p-1 text-zinc-600 transition-colors hover:bg-white/[0.05] hover:text-zinc-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
