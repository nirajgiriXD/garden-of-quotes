export type QuoteItemProp = {
  quote: string;
  author: string;
  tags: string[];
};

export type QuotesProp = {
  data: QuoteItemProp[];
};
