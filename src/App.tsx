import logo from "./assets/img/logo.png";
import Navbar from "./components/navbar/navbar";
import QuoteBox from "./components/quoteBox/quoteBox";
import { useEffect, useState } from "react";

const App = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/nirajgiriXD/garden-of-quotes/main/public/quotes.json"
        );
        const data = await response.json();

        setQuotes(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <>
      <Navbar logo={logo} />
      <main className="d-flex align-items-center justify-content-center">
        <QuoteBox quotes={quotes} />
      </main>
    </>
  );
};

export default App;
