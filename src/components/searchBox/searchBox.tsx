/**
 * External dependencies.
 */
import React, { useCallback, useState } from "react";
import Select from "react-select";

/**
 * Internal dependencies.
 */
import { SeachBoxProp } from "./types/searchBoxProp";
import { QuoteItemProp } from "../types/quoteProp";
import { SuggestionProp } from "./types/suggestionProp";

const SearchPage: React.FC<SeachBoxProp> = ({ quotes, setQuoteItem }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [suggestions, setSuggestions] = useState<SuggestionProp[]>([]);

  const maxNumberOfSuggestion = 10;
  const options = quotes.map((quote) => ({
    value: quote,
    label: quote.quote,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (selected: any) => {
    setSelectedOption(selected);
    if (selected) {
      setQuoteItem(selected.value as QuoteItemProp);
    }
  };

  // Filter the suggestion manually as no built-in method was found
  // which allows for limiting the number of suggestions.
  const handleInputChange = useCallback(
    (input: string) => {
      const filteredOptions = options
        .filter((option) => {
          return option.label.includes(input);
        })
        .slice(0, maxNumberOfSuggestion);

      if (input) {
        setSuggestions(filteredOptions);
      } else {
        setSuggestions([]);
      }
    },
    [options]
  );

  // Style for suggestions dropdown.
  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (provided: any) => ({
      ...provided,
      ...{
        "& ::-webkit-scrollbar": {
          height: "100%",
          width: "5px",
          marginLeft: "5px",
        },
        "& ::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--nav-color)",
        },
        "& ::-webkit-scrollbar-track, & ::-webkit-scrollbar-thumb": {
          borderRadius: "21px",
        },
      },
    }),
  };

  return (
    <div className="search-container">
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        className={"search-field"}
        isClearable={true}
        escapeClearsValue={true}
        options={suggestions}
        classNamePrefix="react-select"
        placeholder="Search quote..."
        noOptionsMessage={({ inputValue }) => {
          return inputValue === ""
            ? "Try typing a quote phrase"
            : "Quote not found";
        }}
        styles={customStyles}
        maxMenuHeight={400}
      />
    </div>
  );
};

export default SearchPage;
