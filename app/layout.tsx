import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { getDarkMode } from "./_components/DarkModeToggle";

const bodyFont = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Kanban Board",
  description:
    "A Kanban board is a visual project management tool that organizes tasks and work items into a visual workflow, providing real-time visibility and control over the progress of projects.",
};

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={(await getDarkMode()) == "true" ? "dark" : ""} lang="en">
      <body
        className={`${bodyFont.className} p-4 container mx-auto bg-gray-100 dark:bg-gray-800 dark:text-white scrollbar-thin scrollbar-thumb-teal-700 scrollbar-track-gray-200 dark:scrollbar-track-gray-700`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
