# StudentMezo DApp 🎓

A decentralized student microloan platform powered by Bitcoin (via Mezo) and smart contracts. Students deposit Bitcoin as collateral, mint MUSD stablecoins, and request microloans for education. Peer lenders fund loans by pooling MUSD to earn yield.

## Features ✨

### For Students
- 🔐 **Secure Wallet Connect**: Connect via WalletConnect/RainbowKit
- ₿ **Bitcoin Collateral**: Deposit Bitcoin via Mezo to mint MUSD
- 📚 **Microloan Requests**: Request education loans with transparent terms
- 🎖️ **NFT Achievements**: Earn achievement NFTs for milestones
- 📊 **Reputation System**: Build credit score through timely repayments
- 💳 **Dashboard**: Track loans, repayments, and achievements

### For Lenders
- 💰 **Yield Earning**: Pool MUSD and earn interest from repayments
- 🔒 **Collateralized Loans**: All loans are 150% over-collateralized
- 📈 **Transparent Tracking**: Monitor pool performance in real-time
- 🎯 **Social Impact**: Help students access education

### Smart Contract Features
- ⚡ **Automated Lending**: Smart contracts manage the entire loan lifecycle
- 🛡️ **Secure Collateral**: Bitcoin collateral locked on-chain
- 🎮 **Gamification**: NFT rewards and leaderboards
- 📊 **Interest Rates**: Dynamic rates based on reputation scores

### Tech Stack 🛠️

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Wagmi** - Web3 React hooks
- **RainbowKit** - Wallet connection
- **Mezo SDK** - Bitcoin integration layer
- **React Router** - Navigation
- **Recharts** - Data visualization

### Smart Contracts
- **Solidity 0.8.20** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Security-audited contract libraries
- **Mezo Protocol** - Bitcoin to EVM bridge
- **Ethers.js** - Blockchain interaction

### Contracts
1. **WrappedBTC.sol (mBTC)** - Mezo Bitcoin token (ERC20, 8 decimals)
2. **MezoBridge.sol** - Bitcoin L1 to EVM bridge interface
3. **MUSD.sol** - ERC20 stablecoin for loans
4. **StudentLoanPlatform.sol** - Main lending platform with Bitcoin collateral
5. **StudentLoanNFT.sol** - Achievement NFTs (ERC721)

📖 **[Read the Mezo Bitcoin Integration Guide](./MEZO_BITCOIN_INTEGRATION.md)** for detailed documentation on how real Bitcoin is used as collateral.

## Project Structure 📁

```
StudentMezo-dApp/
├── contracts/                # Smart contracts
│   ├── contracts/           # Solidity contracts
│   │   ├── MUSD.sol
│   │   ├── StudentLoanPlatform.sol
│   │   └── StudentLoanNFT.sol
│   ├── scripts/             # Deployment scripts
│   ├── test/                # Contract tests
│   └── hardhat.config.js
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utilities and configs
│   │   └── hooks/           # Custom hooks
│   └── package.json
└── package.json             # Workspace config
```

## Getting Started 🚀

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dhruvxbug/StudentMezo-dApp.git
cd StudentMezo-dApp
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install contract dependencies
cd contracts
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Smart Contract Development

1. **Compile contracts**
```bash
cd contracts
npm run compile
```

2. **Run tests**
```bash
npm test
```

3. **Start local blockchain**
```bash
npx hardhat node
```

4. **Deploy contracts locally**
```bash
npm run deploy:local
```

5. **Deploy to testnet**
```bash
# Set environment variables
export TESTNET_RPC_URL="your_rpc_url"
export PRIVATE_KEY="your_private_key"

npm run deploy:testnet
```

### Frontend Development

1. **Update contract addresses**
   - After deploying contracts, update addresses in `frontend/src/utils/contracts.js`

2. **Start development server**
```bash
cd frontend
npm run dev
```

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## Usage 📖

### For Students

1. **Connect Wallet**: Click "Connect Wallet" and select your wallet
2. **Get Verified**: Wait for verification from platform admin
3. **Deposit Collateral**: Deposit ETH (simulating Bitcoin via Mezo) to mint MUSD
4. **Request Loan**: Fill out loan request form with amount, duration, and purpose
5. **Receive Funds**: Once approved, MUSD is transferred to your wallet
6. **Repay Loan**: Make repayments to build reputation and earn NFTs

### For Lenders

1. **Connect Wallet**: Connect your Web3 wallet
2. **Get MUSD**: Obtain MUSD tokens (mint or swap)
3. **Contribute**: Add MUSD to the lending pool
4. **Earn Yield**: Receive interest from student loan repayments
5. **Track Returns**: Monitor your earnings on the dashboard

## Smart Contract Architecture 🏗️

### MUSD Token
- ERC20 stablecoin for loans
- Minted against Bitcoin collateral
- Burnable for redemption

### StudentLoanPlatform
- Manages student verification
- Handles collateral deposits
- Processes loan requests and funding
- Tracks repayments and reputation
- Distributes yield to lenders

### StudentLoanNFT
- ERC721 achievement tokens
- Minted for milestones:
  - First loan
  - First repayment
  - Loan completion
  - Perfect repayment record

## Security Considerations 🔒

- All loans are over-collateralized at 150%
- Smart contracts use OpenZeppelin libraries
- ReentrancyGuard protection on critical functions
- Access control for admin functions
- Student verification system

## Roadmap 🗺️

- [x] Core smart contracts (MUSD, Platform, NFT)
- [x] Frontend with wallet connection
- [x] Student dashboard
- [x] Lender dashboard
- [x] Basic loan lifecycle
- [ ] Mezo SDK integration for real Bitcoin deposits
- [ ] Advanced reputation system
- [ ] Leaderboard implementation
- [ ] Oracle integration for BTC/USD pricing
- [ ] Governance token
- [ ] DAO for platform decisions
- [ ] Mobile app

## Testing 🧪

Run the test suite:

```bash
cd contracts
npx hardhat test
```

Test coverage:
- Student verification
- Collateral deposits and MUSD minting
- Loan requests
- Lender pool contributions
- Loan funding
- Loan repayments
- Interest calculations
- NFT minting

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License.

## Support 💬

For questions and support, please open an issue on GitHub.

## Acknowledgments 🙏

- Mezo for Bitcoin integration
- OpenZeppelin for secure contract libraries
- RainbowKit for wallet connectivity
- The Ethereum community

---

Built with ❤️ for students worldwide
