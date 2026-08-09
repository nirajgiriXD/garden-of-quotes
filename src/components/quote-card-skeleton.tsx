import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function QuoteCardSkeleton() {
  return (
    <div
      className="bg-card ring-border/60 w-full rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)] ring-1 sm:p-9 lg:p-12"
      aria-hidden="true"
    >
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      <div className="my-8 space-y-4 sm:my-10">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-[92%]" />
        <Skeleton className="h-8 w-3/5" />
        <div className="flex justify-end pt-4">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <Separator />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-10 w-full sm:w-52" />
        <Skeleton className="h-11 w-full sm:ml-auto sm:w-36" />
        <div className="flex justify-center gap-1">
          <Skeleton className="size-10 rounded-md" />
          <Skeleton className="size-10 rounded-md" />
        </div>
      </div>
    </div>
  );
}
