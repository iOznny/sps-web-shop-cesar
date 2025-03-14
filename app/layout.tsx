import type { Metadata } from "next";
import "./globals.css";

import AuthWrapper from "./components/Wrapper/AuthWrapper";

export const metadata: Metadata = {
  title: "Eagle Wear",
  description: "Shopping Eagle Wear",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={'antialiased'}>
        <AuthWrapper>  
          <main>{ children }</main>
        </AuthWrapper>
      </body>
    </html>
  );
}
