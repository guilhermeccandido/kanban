import AppLayout from "@/components/AppLayout";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Todo",
  description: "A simple todo site",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
