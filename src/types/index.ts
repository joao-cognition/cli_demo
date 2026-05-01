export interface Metric {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: "up" | "down" | "stable";
  sparkline: number[];
  lowerIsBetter?: boolean;
}

export interface ServiceStatus {
  id: string;
  name: string;
  status: "healthy" | "degraded" | "down";
  latency: number;
  uptime: number;
  lastCheck: string;
  region: string;
}

export interface ActivityEvent {
  id: string;
  type: "deploy" | "alert" | "scale" | "rollback" | "config";
  message: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
  service: string;
}

export interface ChartDataPoint {
  timestamp: string;
  requests: number;
  errors: number;
  latency: number;
  cpu: number;
  memory: number;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  permissions: string[];
  rateLimit: number;
  requestsToday: number;
  status: "active" | "revoked" | "expired";
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  acknowledged: boolean;
  service: string;
  metric: string;
  threshold: number;
  currentValue: number;
}

export interface EndpointMetric {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  avgLatency: number;
  p99Latency: number;
  requestCount: number;
  errorRate: number;
  lastCalled: string;
}

export interface TrafficData {
  hour: string;
  requests: number;
  errors: number;
  bandwidth: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "operator" | "viewer";
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
