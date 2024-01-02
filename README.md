# Garden of Quotes

Welcome to the `Garden of Quotes`, a serene space where wisdom, inspiration, and creativity blossom through an array of quotes from diverse perspectives around the globe.

## Overview

`Garden of Quotes` is a React project built with TypeScript, designed to provide users with a platform to discover new quotes and contribute their own. Immerse yourself in the wisdom shared by various authors, and add your unique perspective to the garden by submitting your favorite quotes.

## Features

- **Explore Quotes:** Browse a collection of quotes from different authors covering a wide range of topics and themes.

- **Submit Your Quote:** Contribute to the garden by submitting your favorite quotes, adding your voice to the diverse collection.

- **Tagged Quotes:** Quotes are categorized with tags, making it easy to find and explore specific themes or topics.

- **Responsive Design:** The user-friendly interface is built with React and TypeScript, ensuring a seamless experience across devices.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nirajgiriXD/garden-of-quotes.git
   cd garden-of-quotes

2. **Install Dependencies:** 
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm run dev
   ```

## Data Format

- The quotes data is stored in `public/quotes.json`.
- Each data entry consists of three key-value pairs:
  - `"quote"`: The text of the quote.
  - `"author"`: The author of the quote.
  - `"tag"`: An array of tags associated with the quote.

## Format Example

```JSON
{
  "data": [
    {
      "quote": "Your quote text here.",
      "author": "Author Name",
      "tag": ["inspiration", "motivation", "wisdom", "love", "leadership"]
    }
  ]
}
```

## Contributing

Contributions are encouraged! Whether it's fixing a bug, enhancing features, or adding new quotes, check out the contribution guidelines to get started.

## License

This project is licensed under the [CC0 1.0 Universal](https://creativecommons.org/).
