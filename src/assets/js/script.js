// "use strict";

// document.addEventListener("DOMContentLoaded", () => {
//   // const url =
//   //   "https://raw.githubusercontent.com/nirajgiriXD/quotes/main/data/quotes.json";

//   const url = "../../data/quotes.json";

//   fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       return data.data;
//     })
//     .then((quotes) => {
//       const max = quotes.length;
//       const quoteBox = document.getElementById("quote-box");
//       const quoteElement = document.getElementById("quote");
//       const quoteTagsElement = document.getElementById("quote-tags");
//       const quoteAuthorElement = document.getElementById("quote-author");
//       const nextQuoteButton = document.getElementById("new-quote");
//       const searchQuoteButton = document.getElementById("search-quote-btn");

//       const tagsList = [
//         "relationship",
//         "leadership",
//         "motivation",
//         "friendship",
//         "finance",
//         "wisdom",
//         "funny",
//         "love",
//       ];

//       // alpha, economics

//       const getRandomNumber = () => {
//         // return Math.floor(Math.random() * max);
//         return 0;
//       };

//       const getNewQuote = () => {
//         let rani = getRandomNumber();
//         while (quotes[rani].quote === "") {
//           rani = getRandomNumber();
//         }
//         return quotes[rani];
//       };

//       const displayQuote = (quoteObj) => {
//         const quote = quoteObj.quote;
//         const author = quoteObj.author;
//         const tags = quoteObj.tag;
//         quoteElement.innerText = quote;
//         quoteAuthorElement.innerText = author === "" ? "Someone" : author;
//         quoteTagsElement.innerText =
//           tags.length === 0 ? "general" : tags.join(", ");
//       };

//       nextQuoteButton.addEventListener("click", () => {
//         displayQuote(getNewQuote());
//       });

//       searchQuoteButton.addEventListener("click", () => {
//         quoteBox.hidden = true;
//       });

//       // Display the first quote.
//       displayQuote(getNewQuote());
//     });
// });
