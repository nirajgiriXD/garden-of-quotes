import { useCallback, useEffect, useMemo, useState } from "react";

import { QuoteCard } from "@/components/quote-card";
import { QuoteCardSkeleton } from "@/components/quote-card-skeleton";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatusPanel } from "@/components/status-panel";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useQuotes } from "@/hooks/use-quotes";
import {
  ANY_TAG,
  authorLabel,
  formatTag,
  pickRandomQuote,
  quotesForTag,
} from "@/lib/quotes";
import type { Quote } from "@/types/quote";

const App = () => {
  const { quotes, tags, tagCounts, status, error, reload } = useQuotes();

  const [chosenQuote, setChosenQuote] = useState<Quote | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string>(ANY_TAG);

  // The opening quote is derived from the collection rather than set in an
  // effect, so the first render already has something to show.
  const openingQuote = useMemo(() => pickRandomQuote(quotes), [quotes]);
  const quote = chosenQuote ?? openingQuote;

  const showRandomQuote = useCallback(() => {
    setChosenQuote((current) => {
      const previous = current ?? openingQuote;

      return pickRandomQuote(quotes, selectedTag, previous) ?? previous;
    });
  }, [openingQuote, quotes, selectedTag]);

  const handleTagChange = useCallback(
    (tag: string) => {
      setSelectedTag(tag);

      // Move straight to a quote that matches the new filter.
      const next = pickRandomQuote(quotes, tag);

      if (next) setChosenQuote(next);
    },
    [quotes],
  );

  // Space or N fetches another quote, mirroring the primary button. Only fires
  // while nothing is focused, so it never steals keys from a focused control.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target !== document.body ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      if (event.key === "n" || event.key === " ") {
        event.preventDefault();
        showRandomQuote();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showRandomQuote]);

  const hasMatches = useMemo(
    () => quotesForTag(quotes, selectedTag).length > 0,
    [quotes, selectedTag],
  );

  return (
    <TooltipProvider>
      <div className="bg-garden flex min-h-dvh flex-col">
        <SiteHeader quotes={quotes} onSelectQuote={setChosenQuote} />

        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
          {status === "loading" && <QuoteCardSkeleton />}

          {status === "error" && (
            <StatusPanel
              tone="error"
              title="The garden is out of reach"
              description={
                error
                  ? `We couldn't load the quotes. ${error}`
                  : "We couldn't load the quotes. Check your connection and try again."
              }
              action={{ label: "Try again", onClick: reload }}
            />
          )}

          {status === "ready" && quotes.length === 0 && (
            <StatusPanel
              tone="empty"
              title="Nothing has bloomed yet"
              description="The collection came back empty. Please try again in a moment."
              action={{ label: "Reload", onClick: reload }}
            />
          )}

          {status === "ready" && quotes.length > 0 && !hasMatches && (
            <StatusPanel
              tone="empty"
              title={`No quotes tagged “${formatTag(selectedTag)}”`}
              description="Clear the filter to browse the whole garden again."
              action={{
                label: "Show all tags",
                onClick: () => handleTagChange(ANY_TAG),
              }}
            />
          )}

          {status === "ready" && quote && hasMatches && (
            <>
              <QuoteCard
                quote={quote}
                tags={tags}
                tagCounts={tagCounts}
                selectedTag={selectedTag}
                onTagChange={handleTagChange}
                onNewQuote={showRandomQuote}
              />

              <p className="text-muted-foreground mt-6 hidden text-xs sm:block">
                Press{" "}
                <kbd className="bg-muted rounded px-1.5 py-0.5 font-sans font-medium">
                  Space
                </kbd>{" "}
                for another quote, or{" "}
                <kbd className="bg-muted rounded px-1.5 py-0.5 font-sans font-medium">
                  /
                </kbd>{" "}
                to search.
              </p>
            </>
          )}

          {/* Announce quote changes to assistive technology. */}
          <p aria-live="polite" className="sr-only">
            {quote ? `${quote.quote} — ${authorLabel(quote)}` : ""}
          </p>
        </main>

        <SiteFooter quoteCount={quotes.length} />
      </div>
    </TooltipProvider>
  );
};

export default App;
