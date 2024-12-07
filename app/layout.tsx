import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ThemeProvider from "./ThemeProvider";

const bodyFont = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Kanbanxt",
  description:
    "A Kanban board is a visual project management tool that organizes tasks and work items into a visual workflow, providing real-time visibility and control over the progress of projects.",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.className} p-4 xl:container mx-auto bg-gray-100 dark:bg-gray-800 dark:text-white scrollbar-thin scrollbar-thumb-teal-700 scrollbar-track-gray-200 dark:scrollbar-track-gray-700`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
