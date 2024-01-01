/**
 * External dependencies.
 */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";

/**
 * Internal dependencies.
 */
import { QuoteItemProp } from "../types/quoteProp";
import { SeachBoxProp } from "./types/searchBoxProp";

const SearchPage: React.FC<SeachBoxProp> = ({ quotes }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const maxNumberOfSuggestions = 10;
  const quotesArray = useRef<string[]>([]);

  const handleSuggestionClick = useCallback((quote: string) => {
    setSearchQuery(quote);
  }, []);

  const handleSearchInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputQuery = e.target.value ?? "";
      setSearchQuery(inputQuery);

      const filteredQuotes = quotesArray.current.filter((quote) =>
        quote.includes(inputQuery)
      );

      setSearchResult(filteredQuotes.slice(0, maxNumberOfSuggestions));
    },
    []
  );

  useEffect(() => {
    const allQuotes = quotes.map((quote: QuoteItemProp) => quote.quote);
    quotesArray.current = allQuotes;
  }, [quotes]);

  return (
    <div className="search-container">
      <div className="form-group">
        <input
          list="quote-list-suggestions"
          type="text"
          className="form-control"
          placeholder="Search quote..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />

        {searchQuery !== "" && (
          <datalist id="quote-list-suggestions">
            {searchResult.length > 0 ? (
              searchResult.map((quote: string, index: number) => {
                return (
                  <option
                    key={index}
                    value={quote}
                    onClick={() => handleSuggestionClick(quote)}
                  >
                    {quote}
                  </option>
                );
              })
            ) : (
              <option>Quote not found</option>
            )}
          </datalist>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
