'use client';

/* Components */
import { Navbar } from '@Components/index';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='bg-white'>{children}</main>
    </>
  );
}