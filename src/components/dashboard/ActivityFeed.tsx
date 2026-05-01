"use client";

import {
  Rocket,
  AlertTriangle,
  ArrowUpCircle,
  RotateCcw,
  Wrench,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { getRelativeTime } from "@/lib/utils";
import type { ActivityEvent } from "@/types";

const eventIcons: Record<ActivityEvent["type"], React.ElementType> = {
  deploy: Rocket,
  alert: AlertTriangle,
  scale: ArrowUpCircle,
  rollback: RotateCcw,
  config: Wrench,
};

const severityVariants: Record<ActivityEvent["severity"], "info" | "warning" | "danger"> = {
  info: "info",
  warning: "warning",
  critical: "danger",
};

interface ActivityFeedProps {
  events: ActivityEvent[];
}

// TODO: add infinite scroll pagination for large event histories
// TODO: add filtering by event type and severity
export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>Activity Feed</CardHeader>
      <CardContent className="max-h-[420px] space-y-1 overflow-y-auto p-2">
        {events.map((event) => {
          const Icon = eventIcons[event.type];

          return (
            <div
              key={event.id}
              className={cn(
                "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
                "hover:bg-white/[0.03]"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                  event.severity === "critical" &&
                    "bg-red-500/10 text-red-400",
                  event.severity === "warning" &&
                    "bg-amber-500/10 text-amber-400",
                  event.severity === "info" &&
                    "bg-cyan-500/10 text-cyan-400"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-300">{event.message}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={severityVariants[event.severity]}>
                    {event.service}
                  </Badge>
                  <span className="text-[11px] text-zinc-600">
                    {getRelativeTime(event.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
