"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import type { TrafficData } from "@/types";

interface TrafficChartProps {
  data: TrafficData[];
}

// TODO: add time range selector (1h, 6h, 24h, 7d, 30d)
export function TrafficChart({ data }: TrafficChartProps) {

  return (
    <Card glow>
      <CardHeader>Traffic Distribution (24h)</CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="hour"
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
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
            />
            <Bar
              dataKey="requests"
              fill="#06b6d4"
              fillOpacity={0.6}
              radius={[3, 3, 0, 0]}
              name="Requests"
            />
            <Bar
              dataKey="errors"
              fill="#ef4444"
              fillOpacity={0.6}
              radius={[3, 3, 0, 0]}
              name="Errors"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
