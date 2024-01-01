/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import { QuoteItemProp } from "../types/quoteProp";
import { QuoteBoxProp } from "./types/quoteBoxProp";

const QuoteBox: React.FC<QuoteBoxProp> = ({ quotes }) => {
  const [numOfQuotes, setNumOfQuotes] = useState(0);
  const [quoteItem, setQuoteItem] = useState({
    quote: "",
    author: "",
    tags: [],
  } as QuoteItemProp);

  const generateRandomQuote = useCallback(() => {
    let randomIndex = Math.floor(Math.random() * numOfQuotes);
    while (quotes[randomIndex]?.quote === "") {
      randomIndex = Math.floor(Math.random() * numOfQuotes);
    }
    setQuoteItem(quotes[randomIndex]);
  }, [numOfQuotes, quotes]);

  useEffect(() => {
    setNumOfQuotes(quotes.length);

    // Generate a random quote when the component mounts or when new quotes are received
    if (quotes.length > 0) {
      generateRandomQuote();
    }
  }, [generateRandomQuote, numOfQuotes, quotes]);

  return (
    <div id="quote-box">
      <div className="scrollable-quote-box-container">
        <div className="quote-text">
          <i className="fa fa-quote-left"></i>
          <span>{quoteItem.quote}</span>
          <i className="fa fa-quote-right"></i>
        </div>
        <div className="quote-author pt-3">
          <span>
            - {quoteItem.author === "" ? "Someone" : quoteItem.author}
          </span>
        </div>
      </div>
      <div className="quote-box-footer">
        <hr />
        <div className="buttons">
          <span className="quote-tags">
            Tags:{" "}
            {quoteItem.tags.length === 0
              ? "general"
              : quoteItem.tags.join(", ")}
          </span>
          <button className="button" onClick={generateRandomQuote}>
            New quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteBox;
