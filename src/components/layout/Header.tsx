"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Radio } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    function updateTime() {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.06] bg-zinc-950/50 px-8 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-100">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-zinc-500">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Live indicator */}
        <Badge variant="success" pulse>
          <Radio className="h-3 w-3" />
          LIVE
        </Badge>

        {/* Clock */}
        <div className="font-mono text-sm tabular-nums text-zinc-500">
          {currentTime}
        </div>

        {/* Search */}
        <button
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            "text-zinc-500 transition-colors hover:bg-white/[0.05] hover:text-zinc-300"
          )}
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button
          className={cn(
            "relative flex h-9 w-9 items-center justify-center rounded-lg",
            "text-zinc-500 transition-colors hover:bg-white/[0.05] hover:text-zinc-300"
          )}
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
        </button>

        {/* User avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-bold text-cyan-400">
          NO
        </div>
      </div>
    </header>
  );
}
