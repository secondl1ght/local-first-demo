"use client";

import { cn } from "@/lib/utils";
import { useSyncStore } from "@/zustand/sync-store";

export const OnlineIndicator = () => {
  const offline = useSyncStore((state) => state.offline);

  return (
    <div className="flex items-center justify-end space-x-2">
      <span className="relative flex size-3">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            offline ? "bg-red-400" : "bg-green-400",
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-3 rounded-full",
            offline ? "bg-red-500" : "bg-green-500",
          )}
        />
      </span>

      <p className="font-mono text-sm font-medium">
        {offline ? "Offline" : "Online"}
      </p>
    </div>
  );
};
