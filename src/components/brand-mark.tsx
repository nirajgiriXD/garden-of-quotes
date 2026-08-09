import { cn } from "@/lib/utils";

/**
 * The garden mark: a quotation glyph growing a pair of leaves. Drawn inline so
 * it inherits the current text colour and stays crisp at any size.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-8", className)}
    >
      <circle cx="16" cy="16" r="15" className="fill-primary" />
      <path
        d="M16 25.5V13.5"
        className="stroke-primary-foreground"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16 18c-3.6 0-5.8-2-6.2-5.6 3.6-.4 6.2 1.6 6.2 5.6Z"
        className="fill-primary-foreground"
      />
      <path
        d="M16 15c0-4 2.6-6.4 6.6-6.4C22.6 12.6 20 15 16 15Z"
        className="fill-primary-foreground"
        opacity="0.75"
      />
    </svg>
  );
}
