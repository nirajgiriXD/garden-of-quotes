import { QuoteItemProp } from "../../types/quoteProp";

export type QuoteBoxProp = {
  quotes: QuoteItemProp[];
  tags: Set<string>;
  quoteItem: QuoteItemProp;
  setQuoteItem: (quoteItem: QuoteItemProp) => void;
};
