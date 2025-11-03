import { Providers } from './providers';

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata = {
  title: 'PeerPledge',
  description: 'Decentralized lending platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
