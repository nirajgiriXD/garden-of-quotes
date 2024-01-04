/**
 * External dependencies.
 */
import React, { useState } from "react";
import Select from "react-select";

/**
 * Internal dependencies.
 */
import { SeachBoxProp } from "./types/searchBoxProp";
import { QuoteItemProp } from "../types/quoteProp";

const SearchPage: React.FC<SeachBoxProp> = ({ quotes, setQuoteItem }) => {
  const [selectedOption, setSelectedOption] = useState(null);

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

  return (
    <div className="search-container">
      <div className="form-group">
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          className={"search-field"}
          isClearable={true}
          escapeClearsValue={true}
          options={options}
          placeholder="Search quote..."
          noOptionsMessage={() => "Quote not found"}
        />
      </div>
    </div>
  );
};

export default SearchPage;
