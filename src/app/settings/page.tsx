"use client";

import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface SettingToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  category: string;
}

const defaultSettings: SettingToggle[] = [
  {
    id: "realtime-updates",
    label: "Real-time Updates",
    description: "Enable live data streaming via WebSocket connections",
    enabled: true,
    category: "Data",
  },
  {
    id: "auto-scaling",
    label: "Auto-scaling",
    description: "Automatically scale services based on traffic patterns",
    enabled: true,
    category: "Infrastructure",
  },
  {
    id: "alert-notifications",
    label: "Alert Notifications",
    description: "Send alerts via email, Slack, and PagerDuty",
    enabled: true,
    category: "Alerts",
  },
  {
    id: "dark-mode",
    label: "Dark Mode",
    description: "Use dark theme across the dashboard (always on for NEXUS)",
    enabled: true,
    category: "UI",
  },
  {
    id: "audit-logging",
    label: "Audit Logging",
    description: "Log all API key usage and configuration changes",
    enabled: true,
    category: "Security",
  },
  {
    id: "rate-limiting",
    label: "Global Rate Limiting",
    description: "Enforce rate limits across all API endpoints",
    enabled: true,
    category: "Security",
  },
  {
    id: "ml-anomaly",
    label: "ML Anomaly Detection",
    description: "Use machine learning to detect unusual traffic patterns",
    enabled: false,
    category: "Intelligence",
  },
  {
    id: "geo-routing",
    label: "Geographic Routing",
    description: "Route requests to the nearest healthy region",
    enabled: false,
    category: "Infrastructure",
  },
  {
    id: "canary-deploys",
    label: "Canary Deployments",
    description: "Gradually roll out changes to a subset of traffic",
    enabled: false,
    category: "Infrastructure",
  },
  {
    id: "cost-optimization",
    label: "Cost Optimization",
    description: "Automatically downscale unused resources during off-peak",
    enabled: false,
    category: "Infrastructure",
  },
];

// TODO: add settings import/export (JSON)
// TODO: add settings history / changelog
// TODO: add role-based settings visibility
export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
    setHasChanges(true);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setHasChanges(false);
  };

  const categories = [...new Set(settings.map((s) => s.category))];

  return (
    <div className="grid-bg min-h-screen">
      <Header
        title="Settings"
        subtitle="Configure platform behavior and integrations"
      />

      <div className="space-y-6 p-8">
        {/* Actions bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {hasChanges && (
              <Badge variant="warning" pulse>
                Unsaved changes
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={resetSettings}
              disabled={!hasChanges}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button disabled={!hasChanges}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings by category */}
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader>{category}</CardHeader>
            <CardContent className="divide-y divide-white/[0.04] p-0">
              {settings
                .filter((s) => s.category === category)
                .map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {setting.label}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {setting.description}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSetting(setting.id)}
                      className={cn(
                        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
                        setting.enabled
                          ? "bg-cyan-500"
                          : "bg-zinc-700"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                          setting.enabled
                            ? "translate-x-5"
                            : "translate-x-0"
                        )}
                      />
                    </button>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}

        {/* System info */}
        <Card>
          <CardHeader>System Information</CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Version", value: "3.14.2" },
                { label: "Build", value: "a8f2e91" },
                { label: "Runtime", value: "Node 22.x" },
                { label: "Region", value: "us-east-1" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-zinc-500">{item.label}</p>
                  <p className="mt-1 font-mono text-sm text-zinc-300">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
