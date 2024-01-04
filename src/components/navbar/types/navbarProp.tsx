import { QuoteItemProp } from "../../types/quoteProp";

export type NavbarProp = {
  logo: string;
  quotes: QuoteItemProp[];
  setQuoteItem: (quoteItem: QuoteItemProp) => void;
};

export type NavItemProp = {
  name: string;
  link: string;
  id: string;
  isButton: boolean;
  openInNewTab: boolean;
};
