import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { formatNumber, formatLatency } from "@/lib/utils";
import type { EndpointMetric } from "@/types";

interface EndpointTableProps {
  endpoints: EndpointMetric[];
}

const methodColors: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  POST: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  PUT: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  DELETE: "text-red-400 bg-red-500/10 border-red-500/20",
  PATCH: "text-purple-400 bg-purple-500/10 border-purple-500/20",
};

// TODO: add sorting by column headers
// TODO: add search/filter for endpoints
export function EndpointTable({ endpoints }: EndpointTableProps) {
  return (
    <Card>
      <CardHeader>Endpoint Performance</CardHeader>
      <CardContent className="overflow-x-auto p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Endpoint
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                Avg Latency
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                P99
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                Requests
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                Error Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((endpoint) => (
              <tr
                key={`${endpoint.method}-${endpoint.path}`}
                className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "inline-flex min-w-[52px] items-center justify-center rounded border px-1.5 py-0.5 text-[10px] font-bold",
                        methodColors[endpoint.method]
                      )}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm text-zinc-300">
                      {endpoint.path}
                    </code>
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="font-mono text-sm tabular-nums text-zinc-300">
                    {formatLatency(endpoint.avgLatency)}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className={cn(
                      "font-mono text-sm tabular-nums",
                      endpoint.p99Latency > 500
                        ? "text-red-400"
                        : endpoint.p99Latency > 200
                          ? "text-amber-400"
                          : "text-zinc-300"
                    )}
                  >
                    {formatLatency(endpoint.p99Latency)}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="font-mono text-sm tabular-nums text-zinc-300">
                    {formatNumber(endpoint.requestCount)}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Badge
                    variant={
                      endpoint.errorRate > 1
                        ? "danger"
                        : endpoint.errorRate > 0.1
                          ? "warning"
                          : "success"
                    }
                  >
                    {endpoint.errorRate.toFixed(2)}%
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
