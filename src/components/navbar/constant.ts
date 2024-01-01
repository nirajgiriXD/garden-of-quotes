import { type NavItemProp } from "./types/navbarProp";

export const navItemsList: NavItemProp[] = [
    {
      name: "Quotes",
      link: "/",
      id: "quotes",
      isButton: false,
      openInNewTab: false,
    },
    {
      name: "About",
      link: "https://github.com/nirajgiriXD/garden-of-quotes/blob/main/README.md",
      id: "about",
      isButton: false,
      openInNewTab: true,
    },
    {
      name: "Contribute",
      link: "https://github.com/nirajgiriXD/garden-of-quotes/fork",
      id: "contribute",
      isButton: false,
      openInNewTab: true,
    },
    {
      name: "Add Quote",
      link: "https://github.com/nirajgiriXD/garden-of-quotes/discussions/new?category=quote",
      id: "add-quote",
      isButton: false,
      openInNewTab: true,
    },
    {
      name: "Search Quote",
      link: "",
      id: "search-quote-btn",
      isButton: true,
      openInNewTab: false,
    },
  ];
  