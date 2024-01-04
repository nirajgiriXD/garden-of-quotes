/**
 * External dependencies.
 */
import { useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import logo from "./assets/img/logo.png";
import Navbar from "./components/navbar/navbar";
import QuoteBox from "./components/quoteBox/quoteBox";
import { QuoteItemProp } from "./components/types/quoteProp";

const App = () => {
  const [quoteItem, setQuoteItem] = useState<QuoteItemProp>(
    {} as QuoteItemProp
  );
  const [quotes, setQuotes] = useState<QuoteItemProp[]>([]);
  const [tags, setTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/nirajgiriXD/garden-of-quotes/main/public/quotes.json"
        );
        const data = await response.json();
        let setOfTags = new Set<string>(
          data.data.flatMap((quote: QuoteItemProp) => quote.tags)
        );

        setOfTags.add("any");
        setOfTags = new Set<string>(Array.from(setOfTags).sort());

        setQuotes(data.data);
        setTags(setOfTags);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <>
      <Navbar logo={logo} quotes={quotes} setQuoteItem={setQuoteItem} />
      <main className="d-flex align-items-center justify-content-center">
        <QuoteBox
          quotes={quotes}
          quoteItem={quoteItem}
          setQuoteItem={setQuoteItem}
          tags={tags}
        />
      </main>
    </>
  );
};

export default App;
