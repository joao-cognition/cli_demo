import type {
  Metric,
  ServiceStatus,
  ActivityEvent,
  ChartDataPoint,
  ApiKey,
  Alert,
  EndpointMetric,
  TrafficData,
} from "@/types";
import { generateSparkline } from "./utils";

export const metrics: Metric[] = [
  {
    id: "req-total",
    label: "Total Requests",
    value: 2_847_293,
    previousValue: 2_631_004,
    unit: "",
    trend: "up",
    sparkline: generateSparkline(20, 100000, 180000),
  },
  {
    id: "avg-latency",
    label: "Avg Latency",
    value: 42,
    previousValue: 47,
    unit: "ms",
    trend: "down",
    sparkline: generateSparkline(20, 30, 60),
  },
  {
    id: "error-rate",
    label: "Error Rate",
    value: 0.12,
    previousValue: 0.18,
    unit: "%",
    trend: "down",
    sparkline: generateSparkline(20, 0, 1),
  },
  {
    id: "active-conns",
    label: "Active Connections",
    value: 14_823,
    previousValue: 13_291,
    unit: "",
    trend: "up",
    sparkline: generateSparkline(20, 10000, 18000),
  },
  {
    id: "throughput",
    label: "Throughput",
    value: 847.3,
    previousValue: 792.1,
    unit: "MB/s",
    trend: "up",
    sparkline: generateSparkline(20, 600, 900),
  },
  {
    id: "cpu-usage",
    label: "CPU Usage",
    value: 67.4,
    previousValue: 71.2,
    unit: "%",
    trend: "down",
    sparkline: generateSparkline(20, 50, 85),
  },
];

export const services: ServiceStatus[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    status: "healthy",
    latency: 12,
    uptime: 99.998,
    lastCheck: new Date(Date.now() - 15000).toISOString(),
    region: "us-east-1",
  },
  {
    id: "auth-service",
    name: "Auth Service",
    status: "healthy",
    latency: 8,
    uptime: 99.999,
    lastCheck: new Date(Date.now() - 12000).toISOString(),
    region: "us-east-1",
  },
  {
    id: "data-pipeline",
    name: "Data Pipeline",
    status: "degraded",
    latency: 245,
    uptime: 99.847,
    lastCheck: new Date(Date.now() - 30000).toISOString(),
    region: "eu-west-1",
  },
  {
    id: "ml-inference",
    name: "ML Inference",
    status: "healthy",
    latency: 89,
    uptime: 99.991,
    lastCheck: new Date(Date.now() - 8000).toISOString(),
    region: "us-west-2",
  },
  {
    id: "cache-layer",
    name: "Cache Layer",
    status: "healthy",
    latency: 2,
    uptime: 99.9999,
    lastCheck: new Date(Date.now() - 5000).toISOString(),
    region: "us-east-1",
  },
  {
    id: "msg-broker",
    name: "Message Broker",
    status: "healthy",
    latency: 4,
    uptime: 99.995,
    lastCheck: new Date(Date.now() - 20000).toISOString(),
    region: "us-east-1",
  },
  {
    id: "search-engine",
    name: "Search Engine",
    status: "healthy",
    latency: 34,
    uptime: 99.972,
    lastCheck: new Date(Date.now() - 18000).toISOString(),
    region: "eu-west-1",
  },
  {
    id: "cdn-edge",
    name: "CDN Edge",
    status: "down",
    latency: 0,
    uptime: 98.234,
    lastCheck: new Date(Date.now() - 120000).toISOString(),
    region: "ap-southeast-1",
  },
];

export const activityFeed: ActivityEvent[] = [
  {
    id: "evt-1",
    type: "deploy",
    message: "Deployed api-gateway v3.14.2 to production",
    timestamp: new Date(Date.now() - 120000).toISOString(),
    severity: "info",
    service: "api-gateway",
  },
  {
    id: "evt-2",
    type: "alert",
    message: "CDN Edge node ap-southeast-1 unreachable",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    severity: "critical",
    service: "cdn-edge",
  },
  {
    id: "evt-3",
    type: "scale",
    message: "Auto-scaled ML Inference from 4 to 8 replicas",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    severity: "info",
    service: "ml-inference",
  },
  {
    id: "evt-4",
    type: "alert",
    message: "Data Pipeline latency exceeds 200ms threshold",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    severity: "warning",
    service: "data-pipeline",
  },
  {
    id: "evt-5",
    type: "config",
    message: "Updated rate limit to 10K req/min for tier-3 keys",
    timestamp: new Date(Date.now() - 1500000).toISOString(),
    severity: "info",
    service: "api-gateway",
  },
  {
    id: "evt-6",
    type: "rollback",
    message: "Rolled back auth-service to v2.8.1 (health check failure)",
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    severity: "warning",
    service: "auth-service",
  },
  {
    id: "evt-7",
    type: "deploy",
    message: "Deployed search-engine v1.22.0 with new ranking model",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    severity: "info",
    service: "search-engine",
  },
  {
    id: "evt-8",
    type: "scale",
    message: "Scaled down cache-layer from 12 to 6 nodes (low traffic)",
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    severity: "info",
    service: "cache-layer",
  },
];

export function generateChartData(hours: number): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 3600000);
    const baseRequests = 140000 + Math.sin(i / 3) * 40000;
    const requests = Math.round(baseRequests + (Math.random() - 0.5) * 20000);
    const errors = Math.round(requests * (0.001 + Math.random() * 0.003));

    data.push({
      timestamp: timestamp.toISOString(),
      requests,
      errors,
      latency: Math.round(35 + Math.random() * 25),
      cpu: Math.round(55 + Math.sin(i / 4) * 15 + Math.random() * 10),
      memory: Math.round(68 + Math.sin(i / 6) * 8 + Math.random() * 5),
    });
  }

  return data;
}

export const apiKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Production Frontend",
    key: "nx_live_a8f2e91c4b7d3e6f",
    createdAt: "2024-11-15T10:30:00Z",
    lastUsed: new Date(Date.now() - 30000).toISOString(),
    permissions: ["read:metrics", "read:logs", "write:config"],
    rateLimit: 10000,
    requestsToday: 847293,
    status: "active",
  },
  {
    id: "key-2",
    name: "CI/CD Pipeline",
    key: "nx_live_c3d4e5f6a7b8c9d0",
    createdAt: "2024-12-01T08:00:00Z",
    lastUsed: new Date(Date.now() - 3600000).toISOString(),
    permissions: ["read:metrics", "write:deploy", "write:config"],
    rateLimit: 5000,
    requestsToday: 1247,
    status: "active",
  },
  {
    id: "key-3",
    name: "Monitoring Dashboard",
    key: "nx_live_e5f6a7b8c9d0e1f2",
    createdAt: "2025-01-10T14:20:00Z",
    lastUsed: new Date(Date.now() - 120000).toISOString(),
    permissions: ["read:metrics", "read:logs", "read:alerts"],
    rateLimit: 15000,
    requestsToday: 234891,
    status: "active",
  },
  {
    id: "key-4",
    name: "Legacy Integration",
    key: "nx_test_f7a8b9c0d1e2f3a4",
    createdAt: "2024-06-20T09:15:00Z",
    lastUsed: "2025-02-28T18:00:00Z",
    permissions: ["read:metrics"],
    rateLimit: 1000,
    requestsToday: 0,
    status: "expired",
  },
  {
    id: "key-5",
    name: "Partner API Access",
    key: "nx_live_b9c0d1e2f3a4b5c6",
    createdAt: "2025-02-14T11:45:00Z",
    lastUsed: new Date(Date.now() - 7200000).toISOString(),
    permissions: ["read:metrics", "read:logs"],
    rateLimit: 3000,
    requestsToday: 12847,
    status: "active",
  },
];

export const alerts: Alert[] = [
  {
    id: "alert-1",
    title: "CDN Edge Node Unreachable",
    description:
      "ap-southeast-1 edge node has not responded to health checks for 5 minutes",
    severity: "critical",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    acknowledged: false,
    service: "cdn-edge",
    metric: "health_check",
    threshold: 1,
    currentValue: 0,
  },
  {
    id: "alert-2",
    title: "High Latency on Data Pipeline",
    description:
      "Average latency exceeded 200ms threshold for eu-west-1 region",
    severity: "warning",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    acknowledged: true,
    service: "data-pipeline",
    metric: "avg_latency_ms",
    threshold: 200,
    currentValue: 245,
  },
  {
    id: "alert-3",
    title: "Memory Usage Approaching Limit",
    description: "ML Inference pods using 87% of allocated memory",
    severity: "warning",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    acknowledged: false,
    service: "ml-inference",
    metric: "memory_percent",
    threshold: 85,
    currentValue: 87,
  },
  {
    id: "alert-4",
    title: "Elevated Error Rate on /api/v2/search",
    description: "Error rate spiked to 2.3% (threshold: 1%)",
    severity: "warning",
    timestamp: new Date(Date.now() - 2700000).toISOString(),
    acknowledged: true,
    service: "search-engine",
    metric: "error_rate_percent",
    threshold: 1.0,
    currentValue: 2.3,
  },
];

export const endpoints: EndpointMetric[] = [
  {
    path: "/api/v2/ingest",
    method: "POST",
    avgLatency: 18,
    p99Latency: 89,
    requestCount: 1_247_832,
    errorRate: 0.02,
    lastCalled: new Date(Date.now() - 1000).toISOString(),
  },
  {
    path: "/api/v2/query",
    method: "GET",
    avgLatency: 45,
    p99Latency: 234,
    requestCount: 892_341,
    errorRate: 0.08,
    lastCalled: new Date(Date.now() - 2000).toISOString(),
  },
  {
    path: "/api/v2/stream",
    method: "GET",
    avgLatency: 12,
    p99Latency: 56,
    requestCount: 324_891,
    errorRate: 0.01,
    lastCalled: new Date(Date.now() - 500).toISOString(),
  },
  {
    path: "/api/v2/auth/token",
    method: "POST",
    avgLatency: 67,
    p99Latency: 312,
    requestCount: 89_423,
    errorRate: 0.34,
    lastCalled: new Date(Date.now() - 15000).toISOString(),
  },
  {
    path: "/api/v2/config",
    method: "PUT",
    avgLatency: 23,
    p99Latency: 78,
    requestCount: 12_847,
    errorRate: 0.05,
    lastCalled: new Date(Date.now() - 60000).toISOString(),
  },
  {
    path: "/api/v2/health",
    method: "GET",
    avgLatency: 3,
    p99Latency: 12,
    requestCount: 4_892_103,
    errorRate: 0.0,
    lastCalled: new Date(Date.now() - 5000).toISOString(),
  },
  {
    path: "/api/v2/search",
    method: "POST",
    avgLatency: 156,
    p99Latency: 890,
    requestCount: 234_891,
    errorRate: 2.3,
    lastCalled: new Date(Date.now() - 3000).toISOString(),
  },
  {
    path: "/api/v2/webhooks",
    method: "POST",
    avgLatency: 34,
    p99Latency: 145,
    requestCount: 67_234,
    errorRate: 0.12,
    lastCalled: new Date(Date.now() - 8000).toISOString(),
  },
];

export function generateTrafficData(): TrafficData[] {
  const data: TrafficData[] = [];

  for (let i = 23; i >= 0; i--) {
    const hour = `${String(23 - i).padStart(2, "0")}:00`;
    const baseTraffic = 50000 + Math.sin(((23 - i) / 24) * Math.PI * 2) * 30000;

    data.push({
      hour,
      requests: Math.round(baseTraffic + Math.random() * 15000),
      errors: Math.round((baseTraffic * 0.002) + Math.random() * 50),
      bandwidth: Math.round(baseTraffic * 0.5 + Math.random() * 10000),
    });
  }

  return data;
}
