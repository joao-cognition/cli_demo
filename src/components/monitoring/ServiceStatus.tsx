"use client";

import { useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useRealtimeData } from "@/lib/hooks/useRealtimeData";
import { cn } from "@/lib/utils";

interface LatencyPoint {
  time: string;
  gateway: number;
  pipeline: number;
  inference: number;
  cache: number;
}

function generateLatencyHistory(): LatencyPoint[] {
  const data: LatencyPoint[] = [];
  for (let i = 59; i >= 0; i--) {
    const time = `${i}s`;
    data.push({
      time,
      gateway: Math.round(8 + Math.random() * 12),
      pipeline: Math.round(180 + Math.random() * 120),
      inference: Math.round(60 + Math.random() * 50),
      cache: Math.round(1 + Math.random() * 5),
    });
  }
  return data;
}

// TODO: add alerting thresholds as horizontal reference lines on charts
export function ServiceLatencyChart() {
  const updateFn = useCallback((data: LatencyPoint[]) => {
    const newPoint: LatencyPoint = {
      time: "0s",
      gateway: Math.round(8 + Math.random() * 12),
      pipeline: Math.round(180 + Math.random() * 120),
      inference: Math.round(60 + Math.random() * 50),
      cache: Math.round(1 + Math.random() * 5),
    };
    return [...data.slice(1), newPoint];
  }, []);

  const { data, isLive } = useRealtimeData<LatencyPoint[]>({
    initialData: generateLatencyHistory(),
    updateFn,
    intervalMs: 1000,
  });

  return (
    <Card glow>
      <CardHeader
        action={
          <Badge variant={isLive ? "success" : "default"} pulse={isLive}>
            {isLive ? "Streaming" : "Paused"}
          </Badge>
        }
      >
        Service Latency (60s window)
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "#71717a", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={9}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "#71717a", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              unit="ms"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(9,9,11,0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#d4d4d8",
              }}
            />
            <Line
              type="monotone"
              dataKey="gateway"
              stroke="#06b6d4"
              strokeWidth={1.5}
              dot={false}
              name="Gateway"
            />
            <Line
              type="monotone"
              dataKey="pipeline"
              stroke="#f59e0b"
              strokeWidth={1.5}
              dot={false}
              name="Pipeline"
            />
            <Line
              type="monotone"
              dataKey="inference"
              stroke="#a855f7"
              strokeWidth={1.5}
              dot={false}
              name="Inference"
            />
            <Line
              type="monotone"
              dataKey="cache"
              stroke="#22c55e"
              strokeWidth={1.5}
              dot={false}
              name="Cache"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface ResourceGaugeProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

export function ResourceGauge({
  label,
  value,
  max,
  unit,
  color,
}: ResourceGaugeProps) {
  const percentage = (value / max) * 100;
  const isWarning = percentage > 80;
  const isCritical = percentage > 90;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">{label}</span>
        <span
          className={cn(
            "font-mono text-sm tabular-nums",
            isCritical
              ? "text-red-400"
              : isWarning
                ? "text-amber-400"
                : "text-zinc-300"
          )}
        >
          {value.toFixed(1)}
          {unit}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: isCritical
              ? "#ef4444"
              : isWarning
                ? "#f59e0b"
                : color,
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-zinc-600">
        <span>0{unit}</span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
