import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import './SearchBox.css';

interface Saying {
  quote: string;
  author?: string;
}

interface HighlightedSuggestion extends Saying {
  highlighted: React.ReactNode;
}

import sayingData from '../../../public/quotes.json';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Saying[]>([]);
  const [suggestedQueries, setSuggestedQueries] = useState<HighlightedSuggestion[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      handleInputChange(searchInputRef.current.value);
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const filteredResults = sayingData.data.filter(item => {
        const queryWords = searchQuery.toLowerCase().split(/\s+/);
        return queryWords.every(word => item.quote.toLowerCase().includes(word));
      });
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const highlightSearchTerms = (text: string, terms: string) => {
    const lowerTerms = terms.toLowerCase();

    let currentTermIndex = 0;
    let startHighlight = false;

    return (
      <span>
        {text.split('').map((char, index) => {
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
            <span key={index} className={startHighlight ? 'highlight' : ''}>
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);

    if (value.trim() === '') {
      setSuggestedQueries([]);
      return;
    }

    const suggestions = sayingData.data
      .filter(item => item.quote.toLowerCase().startsWith(value.toLowerCase()))
      .slice(0, calculateMaxSuggestions())
      .map(item => ({
        quote: item.quote,
        author: item.author,
        highlighted: highlightSearchTerms(item.quote, value),
      }));

    setSuggestedQueries(suggestions);
  };

  const calculateMaxSuggestions = () => {
    if (searchInputRef.current) {
      const searchInputWidth = searchInputRef.current.clientWidth;
      const averageSuggestionWidth = 1; // Adjust as needed based on your styling
      return Math.floor(searchInputWidth / averageSuggestionWidth);
    }
    return 0;
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

  return (
    <div className="search-container">
      <div className="search-box">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search sayings..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
            ref={searchInputRef}
          />
          <button type="submit" className="search-button">
            Search
          </button>
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
        searchQuery.trim() !== '' && <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
