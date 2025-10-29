import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, mainnet, sepolia } from 'wagmi/chains';

const projectIdUrl = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const config = getDefaultConfig({
  appName: 'PeerPledge',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "",
  chains: [hardhat, sepolia, mainnet],
  ssr: false,
});
