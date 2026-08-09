import { repositoryUrl } from "@/components/nav-links";

export function SiteFooter({ quoteCount }: { quoteCount: number }) {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-6 text-sm sm:flex-row sm:justify-between sm:px-6">
        <p>
          {quoteCount > 0
            ? `${quoteCount.toLocaleString()} quotes growing in the garden.`
            : "A serene space for wisdom and inspiration."}
        </p>
        <p>
          Open source on{" "}
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground font-medium underline underline-offset-4 transition-colors"
          >
            GitHub
          </a>
          {" · "}
          <a
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground font-medium underline underline-offset-4 transition-colors"
          >
            CC0 1.0
          </a>
        </p>
      </div>
    </footer>
  );
}
