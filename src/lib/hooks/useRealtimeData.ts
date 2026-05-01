"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface RealtimeConfig<T> {
  initialData: T;
  updateFn: (data: T) => T;
  intervalMs?: number;
}

// TODO: replace polling with actual WebSocket connection
// TODO: add reconnection logic with exponential backoff (max 5 retries)
export function useRealtimeData<T>({
  initialData,
  updateFn,
  intervalMs = 2000,
}: RealtimeConfig<T>): { data: T; isLive: boolean; toggleLive: () => void } {
  const [data, setData] = useState<T>(initialData);
  const [isLive, setIsLive] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleLive = useCallback(() => {
    setIsLive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isLive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setData((prev) => updateFn(prev));
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLive, intervalMs, updateFn]);

  return { data, isLive, toggleLive };
}
