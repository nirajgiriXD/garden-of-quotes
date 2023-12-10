/**
 * Internal dependencies.
 */
import { useEffect, useState } from "react";
import { QuoteItemProp } from "../types/quoteProp";
import { QuoteBoxProp } from "./types/quoteBoxProp";

const QuoteBox = ({ quotes }: QuoteBoxProp) => {
  const [numOfQuotes, setNumOfQuotes] = useState(0);
  const [quoteItem, setQuoteItem] = useState({
    quote: "",
    author: "",
    tags: [],
  } as QuoteItemProp);

  useEffect(() => {
    setNumOfQuotes(quotes.length);
  }, [quotes]);

  useEffect(() => {
    // Generate a random quote when the component mounts
    if (quotes.length > 0) {
      generateRandomQuote();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfQuotes]);

  const generateRandomQuote = () => {
    let rani = Math.floor(Math.random() * numOfQuotes);
    while (quotes[rani]?.quote === "") {
      rani = Math.floor(Math.random() * numOfQuotes);
    }
    setQuoteItem(quotes[rani]);
  };

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
