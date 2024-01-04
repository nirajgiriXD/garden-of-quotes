

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
            <div className="row border-bottom border-dark border-2">
                <div className="col-auto d-flex justify-content-start align-items-center">
                    <p>Tags:{" "}
                    {quoteItem.tags.length === 0
                    ? "general"
                    : quoteItem.tags.join(", ")}</p>
                </div>
            </div>

            <div className="row mt-5 message-container">
                <div className="col">
                    <div className="row">
                        <div className="col-auto">
                            <p className="p-1 fs-5 fw-bolder">
                                <i className="fa fa-quote-left"></i>
                                <span className="ms-1 me-1">{quoteItem.quote}</span>
                                <i className="fa fa-quote-right"></i>
                            </p>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-auto d-flex justify-content-end align-items-center">
                            <span className="ms-auto p-1">- {quoteItem.author === "" ? "Someone" : quoteItem.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-between align-items-center mt-5">
                <div className="col-auto">
                        <Dropdown onSelect={handleDropdownChange} drop="up" className="mb-2">
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
                <div className="col-auto">
                    <button className="btn btn-danger  mb-2" onClick={generateRandomQuote}>New quote</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default QuoteBox;
