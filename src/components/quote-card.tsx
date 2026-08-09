import { CheckIcon, CopyIcon, RefreshCwIcon, Share2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { TagFilter } from "@/components/tag-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authorLabel, tagLabels, toShareText } from "@/lib/quotes";
import { cn } from "@/lib/utils";
import type { Quote } from "@/types/quote";

type QuoteCardProps = {
  quote: Quote;
  tags: string[];
  tagCounts: Map<string, number>;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  onNewQuote: () => void;
};

/** Long quotes step down a size so they stay inside the card comfortably. */
function quoteSizeClass(length: number) {
  if (length > 280) return "text-lg sm:text-xl lg:text-2xl";
  if (length > 140) return "text-xl sm:text-2xl lg:text-3xl";

  return "text-2xl sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]";
}

export function QuoteCard({
  quote,
  tags,
  tagCounts,
  selectedTag,
  onTagChange,
  onNewQuote,
}: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => setCopied(false), 2000);

    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!spinning) return;

    const timer = window.setTimeout(() => setSpinning(false), 500);

    return () => window.clearTimeout(timer);
  }, [spinning]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toShareText(quote));
      setCopied(true);
      toast.success("Quote copied to clipboard");
    } catch {
      toast.error("Couldn't copy the quote", {
        description: "Your browser blocked clipboard access.",
      });
    }
  };

  const handleShare = () => {
    const url = new URL("https://twitter.com/intent/tweet");

    url.searchParams.set("text", toShareText(quote));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <article className="bg-card ring-border/60 relative w-full rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)] ring-1 sm:p-9 lg:p-12">
      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        {tagLabels(quote).map((tag) => (
          <Badge key={tag} variant="accent" className="capitalize">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Quote — re-keyed so each new quote animates in. */}
      <div
        key={quote.quote}
        className="animate-quote-in scrollbar-slim my-8 max-h-[45vh] overflow-y-auto sm:my-10"
      >
        <blockquote>
          <p
            className={cn(
              "font-serif font-medium tracking-tight text-pretty",
              quoteSizeClass(quote.quote.length),
            )}
          >
            <span
              aria-hidden="true"
              className="text-primary/40 mr-1 font-serif select-none"
            >
              &ldquo;
            </span>
            {quote.quote}
            <span
              aria-hidden="true"
              className="text-primary/40 ml-0.5 font-serif select-none"
            >
              &rdquo;
            </span>
          </p>
          <footer className="text-muted-foreground mt-6 flex items-center justify-end gap-3 text-sm">
            <span className="bg-border h-px w-8" aria-hidden="true" />
            <cite className="text-foreground/80 font-medium not-italic">
              {authorLabel(quote)}
            </cite>
          </footer>
        </blockquote>
      </div>

      <Separator />

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <TagFilter
          tags={tags}
          counts={tagCounts}
          value={selectedTag}
          onChange={onTagChange}
        />

        <Button
          onClick={() => {
            setSpinning(true);
            onNewQuote();
          }}
          className="w-full sm:ml-auto sm:w-auto"
          size="lg"
        >
          <RefreshCwIcon
            className={cn(spinning && "animate-spin")}
            aria-hidden="true"
          />
          New quote
        </Button>

        <div className="flex items-center justify-center gap-1 sm:justify-start">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                aria-label="Copy quote"
              >
                {copied ? (
                  <CheckIcon className="text-primary" />
                ) : (
                  <CopyIcon />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy quote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                aria-label="Share quote"
              >
                <Share2Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share on X</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </article>
  );
}
