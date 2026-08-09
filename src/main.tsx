import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element #root was not found in the document.");
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
);
