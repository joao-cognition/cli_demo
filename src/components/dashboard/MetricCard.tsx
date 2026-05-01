"use client";

import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { formatNumber, calculatePercentChange } from "@/lib/utils";
import type { Metric } from "@/types";

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const change = calculatePercentChange(metric.value, metric.previousValue);
  const isPositiveTrend = metric.lowerIsBetter
    ? metric.trend === "down"
    : metric.trend === "up";

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:border-white/[0.12]">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-bold tabular-nums text-zinc-100">
              {metric.unit === "%"
                ? `${metric.value}%`
                : metric.unit === "ms"
                  ? `${metric.value}ms`
                  : metric.unit === "MB/s"
                    ? `${metric.value} MB/s`
                    : formatNumber(metric.value)}
            </p>
          </div>

          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              isPositiveTrend
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400",
              metric.trend === "stable" &&
                "bg-zinc-500/10 text-zinc-400"
            )}
          >
            {metric.trend === "up" ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : metric.trend === "down" ? (
              <ArrowDownRight className="h-3 w-3" />
            ) : (
              <Minus className="h-3 w-3" />
            )}
            {Math.abs(change).toFixed(1)}%
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-4 flex h-8 items-end gap-px">
          {metric.sparkline.map((value, i) => {
            const max = Math.max(...metric.sparkline);
            const min = Math.min(...metric.sparkline);
            const range = max - min || 1;
            const height = ((value - min) / range) * 100;

            return (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-t-sm transition-all duration-300",
                  i === metric.sparkline.length - 1
                    ? "bg-cyan-400/80"
                    : "bg-cyan-500/20 group-hover:bg-cyan-500/30"
                )}
                style={{ height: `${Math.max(height, 4)}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>
    </Card>
  );
}
