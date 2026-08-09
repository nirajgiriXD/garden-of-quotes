import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { ThemeProvider } from "@/components/theme-provider";
import { QUOTES_ENDPOINT } from "@/lib/quotes";
import type { Quote } from "@/types/quote";

function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );
}

const quotes: Quote[] = [
  { quote: "I am always the exception.", author: "", tags: ["motivation"] },
  { quote: "Stay curious about everything.", author: "Ada", tags: ["wisdom"] },
  { quote: "Small steps still move you.", author: "Bo", tags: ["motivation"] },
];

function mockFetchSuccess(data: Quote[] = quotes) {
  return vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ data }),
  });
}

async function findQuoteText() {
  const quoteEl = await screen.findByRole("blockquote");

  return quoteEl.textContent ?? "";
}

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetchSuccess());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("loads quotes from the published collection and shows one", async () => {
    renderApp();

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      QUOTES_ENDPOINT,
      expect.anything(),
    ));

    const text = await findQuoteText();

    expect(quotes.some((quote) => text.includes(quote.quote))).toBe(true);
  });

  it("shows Unknown for a quote without an author", async () => {
    vi.stubGlobal("fetch", mockFetchSuccess([quotes[0]]));

    renderApp();

    expect(await screen.findByText("Unknown")).toBeInTheDocument();
  });

  it("shows general for a quote without tags", async () => {
    vi.stubGlobal(
      "fetch",
      mockFetchSuccess([{ quote: "Untagged.", author: "Cy", tags: [] }]),
    );

    renderApp();

    expect(await screen.findByText("general")).toBeInTheDocument();
  });

  it("serves a different quote when asked for a new one", async () => {
    const user = userEvent.setup();

    renderApp();

    const before = await findQuoteText();

    await user.click(screen.getByRole("button", { name: /new quote/i }));

    await waitFor(async () =>
      expect(await findQuoteText()).not.toEqual(before),
    );
  });

  it("restricts quotes to the selected tag", async () => {
    const user = userEvent.setup();

    renderApp();
    await findQuoteText();

    await user.click(screen.getByRole("combobox", { name: /filter by tag/i }));
    await user.click(await screen.findByRole("option", { name: /wisdom/i }));

    expect(await findQuoteText()).toContain(quotes[1].quote);
  });

  it("finds a quote through the search palette", async () => {
    const user = userEvent.setup();

    renderApp();
    await findQuoteText();

    // "/" opens the search palette from anywhere on the page.
    await user.keyboard("/");

    const dialog = await screen.findByRole("dialog");

    await user.type(
      within(dialog).getByPlaceholderText(/search by words/i),
      "curious",
    );
    await user.click(await within(dialog).findByRole("option"));

    await waitFor(async () =>
      expect(await findQuoteText()).toContain(quotes[1].quote),
    );
  });

  it("reports a failed load and recovers on retry", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockRejectedValueOnce(new Error("Network down"))
        .mockResolvedValue({ ok: true, status: 200, json: async () => ({ data: quotes }) }),
    );
    vi.spyOn(console, "error").mockImplementation(() => {});

    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByRole("alert")).toHaveTextContent(/Network down/);

    await user.click(screen.getByRole("button", { name: /try again/i }));

    expect(await findQuoteText()).not.toBe("");
  });
});
