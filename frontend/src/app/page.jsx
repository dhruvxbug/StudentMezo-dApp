"use client";

import dynamic from 'next/dynamic';

const AppWithRouter = dynamic(() => import('./AppWithRouter'), {
  ssr: false,
});

export default function Page() {
  return <AppWithRouter />;
}
