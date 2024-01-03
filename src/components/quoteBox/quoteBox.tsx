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
    <div className="main-container">
      <div className="display-container p-5">
        <div className="row filter-container  mb-2 gx-0">
          <div className="col-12 d-flex justify-content-end align-items-center ">
            <div className="row ">
              <div className="col-12 h-100 d-flex justify-content-end align-items-center">
                <Dropdown onSelect={handleDropdownChange}>
                  <Dropdown.Toggle variant="light">
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
            </div>
          </div>
        </div>

        <div className="row message-container mb-2 gx-0">
          <div className="col-12">
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
        </div>
        <div className="row footer-container mb-2 gx-0">
          <div className="col-12 d-flex align-items-center">
            <div className="row w-100">
              <hr />
              <div className="col-6">
                <span className="quote-tags">
                  Tags:{" "}
                  {quoteItem.tags.length === 0
                    ? "general"
                    : quoteItem.tags.join(", ")}
                </span>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button
                  className="btn btn-danger"
                  onClick={generateRandomQuote}
                >
                  New quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteBox;
