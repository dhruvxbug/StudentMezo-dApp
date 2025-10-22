import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, mainnet, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'PeerPledge',
  projectId: "",
  chains: [hardhat, sepolia, mainnet],
  ssr: false,
});
