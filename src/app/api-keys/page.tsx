"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatNumber, truncateMiddle } from "@/lib/utils";
import { apiKeys } from "@/lib/mock-data";
import type { ApiKey } from "@/types";

// TODO: implement key rotation with zero-downtime transition
// TODO: add usage analytics per API key with breakdown by endpoint
// TODO: add IP allowlist configuration per key
export default function ApiKeysPage() {
  const [keys] = useState<ApiKey[]>(apiKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyToClipboard = async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard access denied or unavailable
    }
  };

  const statusConfig = {
    active: { variant: "success" as const, label: "Active" },
    revoked: { variant: "danger" as const, label: "Revoked" },
    expired: { variant: "warning" as const, label: "Expired" },
  };

  return (
    <div className="grid-bg min-h-screen">
      <Header
        title="API Keys"
        subtitle="Manage authentication and access control"
      />

      <div className="space-y-6 p-8">
        {/* Header actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              {keys.filter((k) => k.status === "active").length} active keys
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Create API Key
          </Button>
        </div>

        {/* Keys list */}
        <div className="space-y-4">
          {keys.map((apiKey) => {
            const isVisible = visibleKeys.has(apiKey.id);
            const config = statusConfig[apiKey.status];

            return (
              <Card
                key={apiKey.id}
                className={cn(
                  "transition-all",
                  apiKey.status === "expired" && "opacity-60"
                )}
              >
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-semibold text-zinc-200">
                          {apiKey.name}
                        </h3>
                        <Badge variant={config.variant} pulse={apiKey.status === "active"}>
                          {config.label}
                        </Badge>
                      </div>

                      {/* Key display */}
                      <div className="flex items-center gap-2">
                        <code className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 font-mono text-sm text-zinc-400">
                          {isVisible
                            ? apiKey.key
                            : truncateMiddle(
                                apiKey.key.replace(/./g, "\u2022"),
                                24
                              )}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="rounded p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.05] hover:text-zinc-300"
                        >
                          {isVisible ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(apiKey.key, apiKey.id)
                          }
                          className="rounded p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.05] hover:text-zinc-300"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        {copiedId === apiKey.id && (
                          <span className="text-xs text-emerald-400">
                            Copied!
                          </span>
                        )}
                      </div>

                      {/* Permissions */}
                      <div className="flex flex-wrap gap-1.5">
                        {apiKey.permissions.map((perm) => (
                          <Badge key={perm} variant="default">
                            {perm}
                          </Badge>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-[11px] text-zinc-600">
                        <span>
                          Rate limit: {formatNumber(apiKey.rateLimit)}/min
                        </span>
                        <span>
                          Today: {formatNumber(apiKey.requestsToday)} requests
                        </span>
                        <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {apiKey.status === "active" && (
                        <Button variant="danger" size="sm">
                          <Trash2 className="h-3 w-3" />
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
