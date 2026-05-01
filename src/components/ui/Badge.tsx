import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-zinc-800 text-zinc-300 border-zinc-700",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  danger: "bg-red-500/10 text-red-400 border-red-500/20",
  info: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export function Badge({
  children,
  variant = "default",
  pulse,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              variant === "success" && "bg-emerald-400",
              variant === "warning" && "bg-amber-400",
              variant === "danger" && "bg-red-400",
              variant === "info" && "bg-cyan-400",
              variant === "default" && "bg-zinc-400"
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              variant === "success" && "bg-emerald-400",
              variant === "warning" && "bg-amber-400",
              variant === "danger" && "bg-red-400",
              variant === "info" && "bg-cyan-400",
              variant === "default" && "bg-zinc-400"
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
