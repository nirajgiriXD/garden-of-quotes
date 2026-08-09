export type NavLink = {
  name: string;
  href: string;
  id: string;
  external: boolean;
};

/** Respects the deployment sub-path (GitHub Pages serves under /garden-of-quotes/). */
export const homeUrl = import.meta.env.BASE_URL;

export const navLinks: NavLink[] = [
  {
    name: "Quotes",
    href: homeUrl,
    id: "quotes",
    external: false,
  },
  {
    name: "About",
    href: "https://github.com/nirajgiriXD/garden-of-quotes/blob/main/README.md",
    id: "about",
    external: true,
  },
  {
    name: "Contribute",
    href: "https://github.com/nirajgiriXD/garden-of-quotes/fork",
    id: "contribute",
    external: true,
  },
  {
    name: "Add Quote",
    href: "https://github.com/nirajgiriXD/garden-of-quotes/discussions/new?category=quote",
    id: "add-quote",
    external: true,
  },
];

export const repositoryUrl = "https://github.com/nirajgiriXD/garden-of-quotes";
