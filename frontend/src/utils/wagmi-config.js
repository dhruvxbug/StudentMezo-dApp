import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, mainnet, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'StudentMezo DApp',
  projectId: 'YOUR_PROJECT_ID', // Get from WalletConnect Cloud
  chains: [hardhat, sepolia, mainnet],
  ssr: false,
});
