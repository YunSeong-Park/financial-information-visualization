"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import style from "./layout.module.scss";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Redirection from "@/business-components/redirection/redirection";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 신선하다고 간주
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary errorComponent={() => <Redirection />}>
            <Theme className={style.root}>{children}</Theme>
          </ErrorBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
}
