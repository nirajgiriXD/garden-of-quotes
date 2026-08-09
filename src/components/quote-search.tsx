import { CornerDownLeftIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { authorLabel, searchQuotes } from "@/lib/quotes";
import type { Quote } from "@/types/quote";

const MAX_SUGGESTIONS = 10;

type QuoteSearchProps = {
  quotes: Quote[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (quote: Quote) => void;
};

export function QuoteSearch({
  quotes,
  open,
  onOpenChange,
  onSelect,
}: QuoteSearchProps) {
  const [query, setQuery] = useState("");

  // Filtered by hand so the result count stays capped over the full collection.
  const results = useMemo(
    () => searchQuotes(quotes, query, MAX_SUGGESTIONS),
    [quotes, query],
  );

  const handleSelect = (quote: Quote) => {
    onSelect(quote);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search quotes"
      description="Find a quote by its words, author or tag."
      className="top-[12vh] translate-y-0"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search by words, author or tag…"
      />
      <CommandList>
        <CommandEmpty>
          {query.trim() === ""
            ? "Try typing a quote phrase"
            : "Quote not found"}
        </CommandEmpty>

        {results.length > 0 && (
          <CommandGroup
            heading={`${results.length} of ${quotes.length} quotes`}
          >
            {results.map((quote, index) => (
              <CommandItem
                key={`${quote.quote}-${index}`}
                value={`${index}-${quote.quote}`}
                onSelect={() => handleSelect(quote)}
                className="group"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="line-clamp-2 text-pretty">{quote.quote}</p>
                  <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                    <span>{authorLabel(quote)}</span>
                    {quote.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CornerDownLeftIcon className="text-muted-foreground mt-1 size-3.5 opacity-0 group-data-[selected=true]:opacity-100" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
