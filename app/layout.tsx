import "./globals.css";
import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import Header from "./_components/Header";

const bodyFont = Inconsolata({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Kanban Board",
  description:
    "A Kanban board is a visual project management tool that organizes tasks and work items into a visual workflow, providing real-time visibility and control over the progress of projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          bodyFont.className +
          " container mx-auto bg-gray-100 dark:bg-gray-800 dark:text-white"
        }
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
