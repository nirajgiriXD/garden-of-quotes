import { ArrowUpRightIcon, MenuIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { homeUrl, navLinks } from "@/components/nav-links";
import { QuoteSearch } from "@/components/quote-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Quote } from "@/types/quote";

type SiteHeaderProps = {
  quotes: Quote[];
  onSelectQuote: (quote: Quote) => void;
};

export function SiteHeader({ quotes, onSelectQuote }: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Cmd/Ctrl+K and "/" open search from anywhere, as long as the user is not
  // already typing into a field.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable === true;

      const isShortcut =
        (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" && !isTyping);

      if (!isShortcut) return;

      event.preventDefault();
      setSearchOpen((open) => !open);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a
          href={homeUrl}
          className="flex min-w-0 items-center gap-2.5 rounded-md"
          aria-label="Garden of Quotes, home"
        >
          <BrandMark className="shrink-0" />
          <span className="truncate font-serif text-base font-semibold tracking-tight sm:text-lg">
            Garden of Quotes
          </span>
        </a>

        <nav aria-label="Main" className="ml-4 hidden items-center lg:flex">
          {navLinks.map((link) => (
            <Button
              key={link.id}
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <a
                id={link.id}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.name}
              </a>
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Desktop: a search affordance that reads like a field. */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-muted-foreground bg-card hover:bg-secondary hidden h-9 w-64 items-center gap-2 rounded-md border px-3 text-sm transition-colors md:flex"
          >
            <SearchIcon className="size-4 shrink-0" />
            <span className="flex-1 text-left">Search quotes…</span>
            <kbd className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-sans text-[0.6875rem] font-medium">
              ⌘K
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setSearchOpen(true)}
            aria-label="Search quotes"
          >
            <SearchIcon />
          </Button>

          <ThemeToggle />

          {/* Mobile navigation. */}
          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="top-20 max-w-sm translate-y-0 gap-2">
              <DialogHeader>
                <DialogTitle className="font-serif text-base">Menu</DialogTitle>
                <DialogDescription className="sr-only">
                  Site navigation links
                </DialogDescription>
              </DialogHeader>
              <Separator />
              <nav aria-label="Mobile" className="grid gap-1">
                {navLinks.map((link) => (
                  <Button
                    key={link.id}
                    asChild
                    variant="ghost"
                    className="justify-between"
                    onClick={() => setMenuOpen(false)}
                  >
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {link.name}
                      {link.external && (
                        <ArrowUpRightIcon className="text-muted-foreground" />
                      )}
                    </a>
                  </Button>
                ))}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <QuoteSearch
        quotes={quotes}
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelect={onSelectQuote}
      />
    </header>
  );
}
