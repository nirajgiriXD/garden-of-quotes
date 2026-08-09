export type Quote = {
  quote: string;
  author: string;
  tags: string[];
};

export type QuotesPayload = {
  data: Quote[];
};
