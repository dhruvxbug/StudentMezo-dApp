import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import FooterMerlin from '@/components/mvpblocks/footer-merlin';

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata = {
  title: 'PeerPledge',
  description: 'Decentralized lending platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <Navbar />
          <main className="pt-0">{children}</main>
          <FooterMerlin />
        </Providers>
      </body>
    </html>
  );
}
