"use client";

import { useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Pause, Play } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRealtimeData } from "@/lib/hooks/useRealtimeData";
import { generateChartData } from "@/lib/mock-data";
import type { ChartDataPoint } from "@/types";

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// TODO: add zoom and pan capabilities to charts
// TODO: add data export functionality (CSV, JSON)
export function LiveChart() {
  const updateFn = useCallback((data: ChartDataPoint[]) => {
    const now = new Date();
    const newPoint: ChartDataPoint = {
      timestamp: now.toISOString(),
      requests: Math.round(140000 + Math.random() * 40000),
      errors: Math.round(200 + Math.random() * 300),
      latency: Math.round(35 + Math.random() * 25),
      cpu: Math.round(55 + Math.random() * 25),
      memory: Math.round(65 + Math.random() * 15),
    };
    return [...data.slice(1), newPoint];
  }, []);

  const { data, isLive, toggleLive } = useRealtimeData<ChartDataPoint[]>({
    initialData: generateChartData(24),
    updateFn,
    intervalMs: 3000,
  });

  return (
    <Card glow>
      <CardHeader
        action={
          <Button
            variant={isLive ? "primary" : "secondary"}
            size="sm"
            onClick={toggleLive}
          >
            {isLive ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            {isLive ? "Pause" : "Resume"}
          </Button>
        }
      >
        Request Volume (24h)
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="requestsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="errorsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(9,9,11,0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#d4d4d8",
              }}
              labelFormatter={(label) => formatTime(String(label))}
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#06b6d4"
              strokeWidth={1.5}
              fill="url(#requestsGrad)"
              name="Requests"
            />
            <Area
              type="monotone"
              dataKey="errors"
              stroke="#ef4444"
              strokeWidth={1.5}
              fill="url(#errorsGrad)"
              name="Errors"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
