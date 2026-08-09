import { useCallback, useEffect, useMemo, useState } from "react";

import {
  collectTags,
  countByTag,
  parseQuotesPayload,
  QUOTES_ENDPOINT,
} from "@/lib/quotes";
import type { Quote } from "@/types/quote";

export type QuotesStatus = "loading" | "ready" | "error";

export type UseQuotesResult = {
  quotes: Quote[];
  tags: string[];
  tagCounts: Map<string, number>;
  status: QuotesStatus;
  error: string | null;
  reload: () => void;
};

/**
 * Loads the quote collection and derives the tag index from it. Exposes an
 * explicit status so the UI can render loading, empty and error states rather
 * than an indefinitely blank card.
 */
export function useQuotes(endpoint: string = QUOTES_ENDPOINT): UseQuotesResult {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [status, setStatus] = useState<QuotesStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuotes = async () => {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        setQuotes(parseQuotesPayload(await response.json()));
        setStatus("ready");
      } catch (cause) {
        if (controller.signal.aborted) return;

        console.error("Error fetching data:", cause);
        setError(
          cause instanceof Error
            ? cause.message
            : "An unexpected error occurred.",
        );
        setStatus("error");
      }
    };

    void fetchQuotes();

    return () => controller.abort();
  }, [endpoint, attempt]);

  const tags = useMemo(() => collectTags(quotes), [quotes]);
  const tagCounts = useMemo(() => countByTag(quotes), [quotes]);

  return { quotes, tags, tagCounts, status, error, reload };
}
