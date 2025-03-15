import type { Metadata } from "next";
import "./globals.css";

/* Components */
import { AuthWrapper } from "@/app/components/index";
import Layout from "./components/Layout/Layout";
import Dashboard from "./page";

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
