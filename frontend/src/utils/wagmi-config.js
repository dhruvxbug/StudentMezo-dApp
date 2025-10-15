import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, mainnet, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'PeerPledge',
  projectId: 'da82adaa55c7e1ef57617ea0bdf7c8bf', // Get from WalletConnect Cloud
  chains: [hardhat, sepolia, mainnet],
  ssr: false,
});
