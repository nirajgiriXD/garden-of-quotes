# Garden of Quotes

Welcome to the `Garden of Quotes`, a serene space where wisdom, inspiration, and creativity blossom through an array of quotes from diverse perspectives around the globe.

## Overview

`Garden of Quotes` is a React project built with TypeScript, designed to provide users with a platform to discover new quotes and contribute their own. Immerse yourself in the wisdom shared by various authors, and add your unique perspective to the garden by submitting your favorite quotes.

## Features

- **Explore Quotes:** Browse a collection of quotes from different authors covering a wide range of topics and themes.

- **Submit Your Quote:** Contribute to the garden by submitting your favorite quotes, adding your voice to the diverse collection.

- **Tagged Quotes:** Quotes are categorized with tags, and the tag filter shows how many quotes sit behind each one.

- **Instant Search:** Press <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> (or <kbd>/</kbd>) to search the whole collection by words, author or tag.

- **Keyboard First:** <kbd>Space</kbd> or <kbd>N</kbd> draws another quote, and every control is reachable by keyboard.

- **Light & Dark:** The theme follows your system by default and can be pinned either way.

- **Responsive Design:** A single layout that reads well from small phones through to large desktop displays.

## Tech Stack

- [React](https://react.dev) 19 with TypeScript
- [Vite](https://vite.dev) for development and bundling
- [Tailwind CSS](https://tailwindcss.com) v4 for styling
- [shadcn/ui](https://ui.shadcn.com) primitives (Radix UI + `cva`) in `src/components/ui`
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com) for tests

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/nirajgiriXD/garden-of-quotes.git
   cd garden-of-quotes
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Application:**

   ```bash
   npm run dev
   ```

Requires Node.js 20.19+ or 22.12+.

## Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the development server                 |
| `npm run build`     | Typecheck and build for production           |
| `npm run preview`   | Serve the production build locally           |
| `npm run lint`      | Lint with ESLint                             |
| `npm run typecheck` | Run the TypeScript compiler                  |
| `npm test`          | Run the test suite once                      |
| `npm run test:watch`| Run the test suite in watch mode             |

## Project Structure

```
src/
├── components/       Feature components (header, quote card, search, filters)
│   └── ui/           shadcn/ui primitives
├── hooks/            Data loading and theme hooks
├── lib/              Framework-free quote logic and helpers
└── types/            Shared type definitions
```

Quote selection, tag indexing and search live in `src/lib/quotes.ts` with no UI
dependencies, which keeps them directly unit-testable.

## Data Format

- The quotes data is stored in `public/quotes.json`.
- Each data entry consists of three key-value pairs:
  - `"quote"`: The text of the quote.
  - `"author"`: The author of the quote (an empty string shows as `Unknown`).
  - `"tags"`: An array of tags associated with the quote (an empty array shows as `general`).

## Format Example

```JSON
{
  "data": [
    {
      "quote": "Your quote text here.",
      "author": "Author Name",
      "tags": ["inspiration", "motivation", "wisdom", "love", "leadership"]
    }
  ]
}
```

## Contributing

Contributions are encouraged! Whether it's fixing a bug, enhancing features, or adding new quotes, check out the contribution guidelines to get started.

## License

This project is licensed under the [CC0 1.0 Universal](https://creativecommons.org/).
