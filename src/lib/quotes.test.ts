import { describe, expect, it, vi } from "vitest";

import {
  ANY_TAG,
  authorLabel,
  collectTags,
  countByTag,
  formatTag,
  parseQuotesPayload,
  pickRandomQuote,
  quotesForTag,
  searchQuotes,
  tagLabels,
  toShareText,
} from "@/lib/quotes";
import type { Quote } from "@/types/quote";

const quotes: Quote[] = [
  { quote: "I am always the exception.", author: "", tags: ["motivation"] },
  {
    quote: "What poisons them only strengthens you.",
    author: "Ada",
    tags: ["motivation", "wisdom"],
  },
  { quote: "Stay curious.", author: "Bo", tags: [] },
];

describe("parseQuotesPayload", () => {
  it("returns the quotes from a well-formed payload", () => {
    expect(parseQuotesPayload({ data: quotes })).toEqual(quotes);
  });

  it("drops entries that do not match the documented shape", () => {
    const payload = {
      data: [quotes[0], { quote: "no author" }, { nope: true }, null],
    };

    expect(parseQuotesPayload(payload)).toEqual([quotes[0]]);
  });

  it("returns an empty list for unusable payloads", () => {
    expect(parseQuotesPayload(null)).toEqual([]);
    expect(parseQuotesPayload({})).toEqual([]);
    expect(parseQuotesPayload({ data: "nope" })).toEqual([]);
  });
});

describe("collectTags", () => {
  it("lists every tag alphabetically with `any` first", () => {
    expect(collectTags(quotes)).toEqual([ANY_TAG, "motivation", "wisdom"]);
  });

  it("still offers `any` for an empty collection", () => {
    expect(collectTags([])).toEqual([ANY_TAG]);
  });
});

describe("countByTag", () => {
  it("counts quotes per tag and the whole collection under `any`", () => {
    const counts = countByTag(quotes);

    expect(counts.get(ANY_TAG)).toBe(3);
    expect(counts.get("motivation")).toBe(2);
    expect(counts.get("wisdom")).toBe(1);
  });
});

describe("quotesForTag", () => {
  it("returns everything for `any`", () => {
    expect(quotesForTag(quotes, ANY_TAG)).toHaveLength(3);
  });

  it("returns only quotes carrying the tag", () => {
    expect(quotesForTag(quotes, "wisdom")).toEqual([quotes[1]]);
  });

  it("returns nothing for an unknown tag", () => {
    expect(quotesForTag(quotes, "nope")).toEqual([]);
  });
});

describe("pickRandomQuote", () => {
  it("only ever returns a quote carrying the selected tag", () => {
    for (let i = 0; i < 50; i += 1) {
      expect(pickRandomQuote(quotes, "motivation")?.tags).toContain(
        "motivation",
      );
    }
  });

  it("returns undefined when no quote matches, instead of looping forever", () => {
    expect(pickRandomQuote(quotes, "nope")).toBeUndefined();
    expect(pickRandomQuote([], ANY_TAG)).toBeUndefined();
  });

  it("avoids repeating the current quote when an alternative exists", () => {
    for (let i = 0; i < 50; i += 1) {
      expect(pickRandomQuote(quotes, ANY_TAG, quotes[0])).not.toBe(quotes[0]);
    }
  });

  it("repeats the only match rather than returning nothing", () => {
    expect(pickRandomQuote(quotes, "wisdom", quotes[1])).toBe(quotes[1]);
  });

  it("covers the whole pool", () => {
    const random = vi.spyOn(Math, "random");

    random.mockReturnValue(0);
    expect(pickRandomQuote(quotes, ANY_TAG)).toBe(quotes[0]);

    random.mockReturnValue(0.99);
    expect(pickRandomQuote(quotes, ANY_TAG)).toBe(quotes[2]);
  });
});

describe("searchQuotes", () => {
  it("matches quote text regardless of case", () => {
    expect(searchQuotes(quotes, "POISONS")).toEqual([quotes[1]]);
  });

  it("matches on author and tag as well", () => {
    expect(searchQuotes(quotes, "ada")).toEqual([quotes[1]]);
    expect(searchQuotes(quotes, "motivation")).toEqual([quotes[0], quotes[1]]);
  });

  it("returns nothing for a blank query", () => {
    expect(searchQuotes(quotes, "   ")).toEqual([]);
  });

  it("caps the number of results", () => {
    const many = Array.from({ length: 30 }, (_, index) => ({
      quote: `curious thought ${index}`,
      author: "",
      tags: [],
    }));

    expect(searchQuotes(many, "curious")).toHaveLength(10);
    expect(searchQuotes(many, "curious", 3)).toHaveLength(3);
  });
});

describe("display helpers", () => {
  it("falls back to Unknown for unattributed quotes", () => {
    expect(authorLabel(quotes[0])).toBe("Unknown");
    expect(authorLabel(quotes[1])).toBe("Ada");
    expect(authorLabel(undefined)).toBe("");
  });

  it("falls back to general for untagged quotes", () => {
    expect(tagLabels(quotes[2])).toEqual(["general"]);
    expect(tagLabels(quotes[1])).toEqual(["motivation", "wisdom"]);
  });

  it("title-cases tags for display", () => {
    expect(formatTag("wisdom")).toBe("Wisdom");
    expect(formatTag("")).toBe("");
  });

  it("renders shareable text", () => {
    expect(toShareText(quotes[1])).toBe(
      '"What poisons them only strengthens you." — Ada',
    );
  });
});
