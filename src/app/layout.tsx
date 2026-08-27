import type { Metadata } from "next";
import { upakarmaContent } from "@/content/upakarma";
import "./globals.css";

export const metadata: Metadata = {
  title: upakarmaContent.title,
  description: upakarmaContent.subtitle,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
