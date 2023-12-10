import { type NavItemProp } from "./types/navbarProp";

export const navItemsList: NavItemProp[] = [
    {
      name: "Quotes",
      link: "/",
      id: "",
      isButton: false,
      openInNewTab: false,
    },
    {
      name: "About",
      link: "https://github.com/nirajgiriXD/garden-of-quotes/blob/main/README.md",
      id: "",
      isButton: false,
      openInNewTab: true,
    },
    {
      name: "Contribute",
      link: "https://github.com/nirajgiriXD/garden-of-quotes/fork",
      id: "",
      isButton: false,
      openInNewTab: true,
    },
    {
      name: "Add Quote",
      link: "https://github.com/nirajgiriXD/garden-of-quotes/discussions/new?category=quote",
      id: "",
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
  