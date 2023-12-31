/**
 * Internal dependencies.
 */
import { QuoteItemProp } from "../../types/quoteProp";

export type SeachBoxProp = {
  quotes: QuoteItemProp[];
  setQuoteItem: (quoteItem: QuoteItemProp) => void;
};
