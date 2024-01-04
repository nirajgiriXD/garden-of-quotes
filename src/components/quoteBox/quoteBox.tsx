/**
 * External dependencies.
 */
import React, { useCallback, useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import { QuoteItemProp } from "../types/quoteProp";
import { QuoteBoxProp } from "./types/quoteBoxProp";
import { Dropdown } from "react-bootstrap";

const QuoteBox: React.FC<QuoteBoxProp> = ({ quotes, tags }) => {
  const [selectedTag, setSelectedTag] = useState<string>("any");
  const [numOfQuotes, setNumOfQuotes] = useState(0);
  const [quoteItem, setQuoteItem] = useState({
    quote: "",
    author: "",
    tags: [],
  } as QuoteItemProp);

  const handleDropdownChange = useCallback((eventKey: string | null) => {
    if (eventKey !== null) {
      setSelectedTag(eventKey);
    }
  }, []);

  const generateRandomQuote = useCallback(() => {
    let randomIndex = Math.floor(Math.random() * numOfQuotes);

    if (selectedTag !== "any") {
      while (!quotes[randomIndex]?.tags.includes(selectedTag)) {
        randomIndex = Math.floor(Math.random() * quotes.length);
      }
    }

    setQuoteItem(quotes[randomIndex]);
  }, [numOfQuotes, quotes, selectedTag]);

  useEffect(() => {
    setNumOfQuotes(quotes.length);

    if (numOfQuotes > 0) {
      generateRandomQuote();
    }
  }, [generateRandomQuote, numOfQuotes, quotes]);

  return (
    <div className="display-container">
      <div className="border-bottom w-100">
        <div className="pb-4">
          Tags:{" "}
          {quoteItem.tags.length === 0 ? "general" : quoteItem.tags.join(", ")}
        </div>
      </div>

      <div className="my-4 quote-and-arthur-container">
        {/* Quote */}
        <div className="quote-text">
          <i className="fa fa-quote-left"></i>
          <span className="px-2">{quoteItem.quote}</span>
          <i className="fa fa-quote-right"></i>
        </div>

        {/* Author */}
        <div className="quote-author">
          - {quoteItem.author === "" ? "Unknown" : quoteItem.author}
        </div>
      </div>

      <div className="row border-top pt-4 w-100">
        {/* Tags */}
        <div className="col-6">
          <Dropdown onSelect={handleDropdownChange} drop="down">
            <Dropdown.Toggle variant="light" className="w-100">
              {selectedTag[0].toUpperCase() + selectedTag.substring(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Array.from(tags).map((tag) => {
                return (
                  <Dropdown.Item eventKey={tag} key={tag}>
                    {tag[0].toUpperCase() + tag.substring(1)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* New Quote */}
        <div className="col-6">
          <button
            className="btn btn-danger w-100"
            onClick={generateRandomQuote}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteBox;
