# StudentMezo DApp Deployment Guide

This guide walks you through deploying the StudentMezo DApp to a testnet or mainnet.

## Prerequisites

- Node.js 18+ installed
- Wallet with test ETH (for testnet) or real ETH (for mainnet)
- RPC endpoint (Infura, Alchemy, or your own node)
- WalletConnect Project ID (get from https://cloud.walletconnect.com/)

## Step 1: Clone and Install

```bash
git clone https://github.com/dhruvxbug/StudentMezo-dApp.git
cd StudentMezo-dApp
```

## Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install contract dependencies
cd contracts
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

## Step 3: Configure Environment

### For Smart Contracts

Create `contracts/.env`:

```env
# RPC Endpoint (get from Infura, Alchemy, etc.)
TESTNET_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Private key of deployer wallet (DO NOT share or commit this!)
PRIVATE_KEY=your_private_key_here

# Optional: Etherscan API key for verification
ETHERSCAN_API_KEY=your_etherscan_key
```

### For Frontend

Create `frontend/.env`:

```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com/)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## Step 4: Deploy Smart Contracts

### Deploy to Local Hardhat Network (for testing)

Terminal 1 - Start local node:
```bash
cd contracts
npx hardhat node
```

Terminal 2 - Deploy contracts:
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Sepolia Testnet

1. Get Sepolia ETH from a faucet:
   - https://sepoliafaucet.com/
   - https://www.alchemy.com/faucets/ethereum-sepolia

2. Update `contracts/hardhat.config.js` with Sepolia configuration:

```javascript
networks: {
  sepolia: {
    url: process.env.TESTNET_RPC_URL,
    accounts: [process.env.PRIVATE_KEY],
    chainId: 11155111
  }
}
```

3. Deploy:
```bash
cd contracts
npx hardhat run scripts/deploy.js --network sepolia
```

4. Save the deployed contract addresses from the output

## Step 5: Configure Frontend

1. Update `frontend/src/utils/contracts.js` with your deployed contract addresses:

```javascript
export const CONTRACT_ADDRESSES = {
  MUSD: '0xYourMUSDAddress',
  StudentLoanNFT: '0xYourNFTAddress',
  StudentLoanPlatform: '0xYourPlatformAddress',
};
```

2. Update `frontend/src/utils/wagmi-config.js` with your WalletConnect Project ID:

```javascript
export const config = getDefaultConfig({
  appName: 'StudentMezo DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Update this
  chains: [sepolia], // Update based on your deployment
  ssr: false,
});
```

## Step 6: Test Locally

Start the frontend development server:

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` and test:

1. Connect your wallet
2. Make sure you're on the correct network (Sepolia)
3. Test basic functionality

## Step 7: Build for Production

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`

## Step 8: Deploy Frontend

### Option A: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

### Option B: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
cd frontend
netlify deploy --prod
```

### Option C: IPFS (Decentralized)

1. Install IPFS:
```bash
npm i -g ipfs
```

2. Add to IPFS:
```bash
cd frontend/dist
ipfs add -r .
```

3. Pin the CID to keep it available

## Step 9: Verify Smart Contracts (Optional)

Verify your contracts on Etherscan for transparency:

```bash
cd contracts
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS "CONSTRUCTOR_ARGS"
```

Example:
```bash
npx hardhat verify --network sepolia 0xYourMUSDAddress
npx hardhat verify --network sepolia 0xYourNFTAddress
npx hardhat verify --network sepolia 0xYourPlatformAddress 0xMUSDAddress 0xNFTAddress
```

## Step 10: Initial Configuration

After deployment, perform these initial setup steps:

1. **Add Verifier**:
```javascript
// Call from owner account
await platform.addVerifier(verifierAddress);
```

2. **Verify First Students** (for testing):
```javascript
// Call from verifier account
await platform.connect(verifier).verifyStudent(studentAddress);
```

3. **Mint Initial MUSD** (for lenders to test):
```javascript
// Call from owner account
await musd.mint(lenderAddress, amount);
```

## Troubleshooting

### "Insufficient funds for gas"
- Make sure your wallet has enough ETH for gas fees
- On testnets, get more ETH from faucets

### "Contract not found"
- Ensure you've deployed to the correct network
- Verify the contract address in `contracts.js`
- Check you're connected to the right network in MetaMask

### "Transaction failed"
- Check that you have the required permissions
- For students: ensure you're verified
- For lenders: ensure you have MUSD tokens

### RPC errors
- Check your RPC URL is correct
- Consider using multiple RPC providers as fallback
- Rate limits: use a paid plan for production

## Production Considerations

### Security
- [ ] Audit smart contracts before mainnet deployment
- [ ] Use a hardware wallet for owner keys
- [ ] Set up multi-sig for admin functions
- [ ] Implement time-locks for critical changes

### Monitoring
- [ ] Set up alerts for contract events
- [ ] Monitor gas prices
- [ ] Track contract balance
- [ ] Monitor for unusual activity

### Maintenance
- [ ] Have a contract upgrade plan
- [ ] Document emergency procedures
- [ ] Set up a status page
- [ ] Create a community feedback channel

## Support

For deployment issues:
1. Check the GitHub Issues
2. Review the documentation
3. Join our Discord/Telegram community
4. Open a new issue with detailed information

## Mainnet Deployment Checklist

Before deploying to mainnet:

- [ ] Smart contracts audited by professional firm
- [ ] Comprehensive test coverage (>95%)
- [ ] Thorough testnet testing completed
- [ ] Security review completed
- [ ] Gas optimization performed
- [ ] Documentation complete
- [ ] Legal review completed (if applicable)
- [ ] Insurance considered
- [ ] Emergency response plan ready
- [ ] Multi-sig setup for admin functions
- [ ] Monitoring and alerts configured
- [ ] Community ready (Discord, Telegram, etc.)

## Next Steps

After successful deployment:

1. Announce your deployment on social media
2. Create tutorial videos
3. Build a community
4. Gather feedback
5. Plan future improvements
6. Consider governance token distribution
