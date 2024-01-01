/**
 * External dependencies.
 */
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";

/**
 * Internal dependencies.
 */
import { QuoteItemProp } from "../types/quoteProp";
import { SeachBoxProp } from "./types/searchBoxProp";
import "../../assets/css/search-box.css";

interface HighlightedSuggestion extends QuoteItemProp {
  highlighted: React.ReactNode;
}

const SearchPage: React.FC<SeachBoxProp> = ({ quotes }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<QuoteItemProp[]>([]);
  const [suggestedQueries, setSuggestedQueries] = useState<
    HighlightedSuggestion[]
  >([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const calculateMaxSuggestions = () => {
    if (searchInputRef.current) {
      const searchInputWidth = searchInputRef.current.clientWidth;
      const averageSuggestionWidth = 1; // Adjust as needed based on your styling
      return Math.floor(searchInputWidth / averageSuggestionWidth);
    }
    return 0;
  };

  const highlightSearchTerms = (text: string, terms: string) => {
    const lowerTerms = terms.toLowerCase();

    let currentTermIndex = 0;
    let startHighlight = false;

    return (
      <span>
        {text.split("").map((char, index) => {
          const isMatch = char.toLowerCase() === lowerTerms[currentTermIndex];

          if (isMatch) {
            if (!startHighlight) {
              startHighlight = true;
            }
            currentTermIndex += 1;
          } else if (startHighlight) {
            startHighlight = false;
            currentTermIndex = 0;
          }

          return (
            <span key={index} className={startHighlight ? "highlight" : ""}>
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);

    if (value.trim() === "") {
      setSuggestedQueries([]);
      return;
    }

    const suggestions = quotes
      .filter((item: QuoteItemProp) =>
        item.quote.toLowerCase().startsWith(value.toLowerCase())
      )
      .slice(0, calculateMaxSuggestions())
      .map((item: QuoteItemProp) => ({
        quote: item.quote,
        author: item.author,
        tags: item.tags,
        highlighted: highlightSearchTerms(item.quote, value),
      }));

    setSuggestedQueries(suggestions);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const filteredResults = quotes.filter((item: QuoteItemProp) => {
        const queryWords = searchQuery.toLowerCase().split(/\s+/);
        return queryWords.every((word) =>
          item.quote.toLowerCase().includes(word)
        );
      });
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSuggestionClick = (suggestion: HighlightedSuggestion) => {
    setSearchQuery(suggestion.quote);
    setSearchResults([suggestion]);
    setSuggestedQueries([]);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSearch();
    setSuggestedQueries([]);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      handleInputChange(searchInputRef.current.value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search-container">
      <div className="search-box">
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search quotes..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.value)
            }
            ref={searchInputRef}
          />
        </form>
      </div>

      {suggestedQueries.length > 0 && (
        <div className="suggestions-list">
          {suggestedQueries.map((suggestion, index) => (
            <div
              key={index}
              className="suggestions-list-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.highlighted}
            </div>
          ))}
        </div>
      )}

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result, index) => (
            <div key={index}>
              <p>{result.quote}</p>
              {result.author && <p>Author: {result.author}</p>}
            </div>
          ))}
        </ul>
      ) : (
        searchQuery.trim() !== "" && <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
