import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TanStack Query",
  description: "Learning TanStack Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
