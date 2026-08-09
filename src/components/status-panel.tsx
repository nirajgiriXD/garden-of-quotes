import { RotateCcwIcon, SproutIcon, TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type StatusPanelProps = {
  tone: "error" | "empty";
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
};

/** Shared presentation for the non-happy paths: failed loads and empty results. */
export function StatusPanel({
  tone,
  title,
  description,
  action,
}: StatusPanelProps) {
  const Icon = tone === "error" ? TriangleAlertIcon : SproutIcon;

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className="bg-card ring-border/60 flex w-full flex-col items-center gap-4 rounded-2xl p-10 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)] ring-1 sm:p-14"
    >
      <span
        className={
          tone === "error"
            ? "bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full"
            : "bg-accent text-accent-foreground flex size-12 items-center justify-center rounded-full"
        }
      >
        <Icon className="size-6" />
      </span>

      <div className="space-y-1.5">
        <h2 className="font-serif text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm text-pretty">
          {description}
        </p>
      </div>

      {action && (
        <Button onClick={action.onClick} variant="outline">
          <RotateCcwIcon />
          {action.label}
        </Button>
      )}
    </div>
  );
}
