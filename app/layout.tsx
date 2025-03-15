import type { Metadata } from "next";
import "./globals.css";

/* Components */
import { Layout } from "@Components/index";

export const metadata: Metadata = {
  title: "Eagle Wear",
  description: "Shopping Eagle Wear",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={'bg-white'}>
        <Layout>
          { children }
        </Layout>
      </body>
    </html>
  );
}
