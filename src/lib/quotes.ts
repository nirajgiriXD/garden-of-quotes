import type { Quote } from "@/types/quote";

/** The tag that means "don't filter at all". */
export const ANY_TAG = "any";

/** Quotes are served straight from the repository's `main` branch. */
export const QUOTES_ENDPOINT =
  "https://raw.githubusercontent.com/nirajgiriXD/garden-of-quotes/main/public/quotes.json";

/** Shown when a quote carries no attribution. */
export const UNKNOWN_AUTHOR = "Unknown";

/** Shown when a quote carries no tags of its own. */
export const DEFAULT_TAG_LABEL = "general";

function isQuote(value: unknown): value is Quote {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.quote === "string" &&
    typeof candidate.author === "string" &&
    Array.isArray(candidate.tags) &&
    candidate.tags.every((tag) => typeof tag === "string")
  );
}

/**
 * Narrows an unknown JSON payload to the quotes it contains, dropping any
 * entry that does not match the documented shape rather than failing outright.
 */
export function parseQuotesPayload(payload: unknown): Quote[] {
  if (typeof payload !== "object" || payload === null) return [];

  const { data } = payload as { data?: unknown };

  if (!Array.isArray(data)) return [];

  return data.filter(isQuote);
}

/**
 * Every tag in the collection, sorted alphabetically, with `any` first so the
 * unfiltered option always leads the list.
 */
export function collectTags(quotes: Quote[]): string[] {
  const tags = new Set<string>();

  for (const quote of quotes) {
    for (const tag of quote.tags) tags.add(tag);
  }

  return [ANY_TAG, ...Array.from(tags).sort()];
}

/** How many quotes carry each tag, keyed by tag (`any` counts everything). */
export function countByTag(quotes: Quote[]): Map<string, number> {
  const counts = new Map<string, number>([[ANY_TAG, quotes.length]]);

  for (const quote of quotes) {
    for (const tag of quote.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return counts;
}

/** The quotes eligible for a tag; `any` matches the whole collection. */
export function quotesForTag(quotes: Quote[], tag: string): Quote[] {
  if (tag === ANY_TAG) return quotes;

  return quotes.filter((quote) => quote.tags.includes(tag));
}

/**
 * Picks a random quote matching `tag`, avoiding `current` when the pool is big
 * enough to offer an alternative. Returns `undefined` when nothing matches.
 */
export function pickRandomQuote(
  quotes: Quote[],
  tag: string = ANY_TAG,
  current?: Quote,
): Quote | undefined {
  const pool = quotesForTag(quotes, tag);

  if (pool.length === 0) return undefined;

  const candidates =
    pool.length > 1 && current
      ? pool.filter((quote) => quote !== current)
      : pool;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * Case-insensitive search across quote text, author and tags, capped at
 * `limit` results so the palette stays responsive over the full collection.
 */
export function searchQuotes(quotes: Quote[], query: string, limit = 10) {
  const needle = query.trim().toLowerCase();

  if (needle === "") return [];

  const results: Quote[] = [];

  for (const quote of quotes) {
    const haystack =
      `${quote.quote} ${quote.author} ${quote.tags.join(" ")}`.toLowerCase();

    if (haystack.includes(needle)) {
      results.push(quote);
      if (results.length === limit) break;
    }
  }

  return results;
}

/** The author to display, falling back to `Unknown` for unattributed quotes. */
export function authorLabel(quote: Quote | undefined): string {
  if (!quote) return "";

  return quote.author.trim() === "" ? UNKNOWN_AUTHOR : quote.author;
}

/** The tags to display, falling back to `general` for untagged quotes. */
export function tagLabels(quote: Quote | undefined): string[] {
  if (!quote || quote.tags.length === 0) return [DEFAULT_TAG_LABEL];

  return quote.tags;
}

/** Title-cases a tag for display without mutating the underlying value. */
export function formatTag(tag: string): string {
  if (tag === "") return tag;

  return tag[0].toUpperCase() + tag.slice(1);
}

/** The quote rendered as shareable plain text. */
export function toShareText(quote: Quote): string {
  return `"${quote.quote}" — ${authorLabel(quote)}`;
}
