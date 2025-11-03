'use client';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { RainbowKitProvider, Chain } from "@rainbow-me/rainbowkit";

const projectIdUrl = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const config = getDefaultConfig({
  appName: 'PeerPledge',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "",
  chains: [mezoTestnet],
  ssr: false,
});

const mezoTestnet = {
  id: 31611,
  name: "Mezo Testnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.test.mezo.org"] },
  },
  blockExplorers: {
    default: { name: "Mezo Explorer", url: "https://explorer.test.mezo.org" },
  },
}