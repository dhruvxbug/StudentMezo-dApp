# StudentMezo DApp 🎓₿

> **A decentralized student microloan platform powered by real Bitcoin collateral via Mezo Protocol**

StudentMezo enables students worldwide to access education financing using their Bitcoin holdings as collateral. Lenders earn yield by funding these Bitcoin-backed loans, creating a trustless, transparent, and inclusive financial system for education.

## 🌟 Overview

StudentMezo bridges traditional education financing with Bitcoin's financial sovereignty. Students deposit real Bitcoin (via Mezo bridge) as collateral to mint MUSD stablecoins, which they can use for tuition, books, and living expenses. The platform automatically manages loans, interest, and collateral—no banks, no paperwork, no discrimination.

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

## 🔄 How It Works

### Bitcoin Collateral Flow

```
1. User deposits Bitcoin on L1
        ↓
2. Mezo Bridge verifies (SPV proof)
        ↓
3. Bridge mints mBTC on EVM (1:1 ratio)
        ↓
4. User approves StudentLoanPlatform
        ↓
5. User deposits mBTC as collateral
        ↓
6. Platform mints MUSD (based on BTC price)
        ↓
7. User gets MUSD for education expenses
        ↓
8. After repayment, mBTC returned
        ↓
9. User can withdraw to Bitcoin L1
```

### Smart Contract Architecture

```
┌─────────────────────────────────────────────────────┐
│              FRONTEND (React + Wagmi)               │
├─────────────────────────────────────────────────────┤
│  Student Dashboard    │    Lender Dashboard        │
│  - Deposit Bitcoin    │    - Contribute MUSD       │
│  - Request Loans      │    - Earn Yield            │
│  - Repay Loans        │    - Track ROI             │
│  - View NFTs          │    - View Pool Stats       │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│           BLOCKCHAIN LAYER (EVM)                    │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐│
│  │  mBTC Token  │  │ StudentLoan  │  │   MUSD    ││
│  │  (ERC20)     │  │  Platform    │  │  (ERC20)  ││
│  │  - 8 decimals│  │  - Loans     │  │  - Stable ││
│  │  - Bridge    │  │  - Pool      │  │  - Mint   ││
│  └──────────────┘  └──────────────┘  └───────────┘│
│  ┌──────────────┐  ┌──────────────┐               │
│  │ Mezo Bridge  │  │ StudentNFT   │               │
│  │  - Deposit   │  │  (ERC721)    │               │
│  │  - Withdraw  │  │  - Badges    │               │
│  └──────────────┘  └──────────────┘               │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│          BITCOIN L1 (via Mezo)                      │
├─────────────────────────────────────────────────────┤
│  - Real Bitcoin deposits                            │
│  - SPV proof verification                           │
│  - 6+ block confirmations                           │
└─────────────────────────────────────────────────────┘
```

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Git

### Step 1: Clone and Install (2 minutes)

```bash
git clone https://github.com/dhruvxbug/StudentMezo-dApp.git
cd StudentMezo-dApp

# Install all dependencies
cd contracts && npm install
cd ../frontend && npm install --legacy-peer-deps
cd ..
```

### Step 2: Start Local Blockchain (1 minute)

Open Terminal 1:
```bash
cd contracts
npx hardhat node
```

Keep this running. You'll see 20 test accounts with 10,000 ETH each. Save Account #0's private key.

### Step 3: Deploy Contracts (1 minute)

Open Terminal 2:
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

**Save the contract addresses** from the output!

### Step 4: Configure Frontend (1 minute)

Update `frontend/src/utils/contracts.js` with deployed addresses:

```javascript
export const CONTRACT_ADDRESSES = {
  mBTC: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  MezoBridge: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  MUSD: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  StudentLoanNFT: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  StudentLoanPlatform: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
};
```

### Step 5: Start Frontend

Open Terminal 3:
```bash
cd frontend
npm run dev
```

Visit http://localhost:5173

### Step 6: Setup MetaMask

1. Add Localhost 8545 network in MetaMask
2. Import Account #0 using the private key from Step 2
3. You should see 10,000 ETH

### Step 7: Test the Platform

#### As a Student:
1. Connect your wallet on the homepage
2. Go to Student Dashboard
3. Get test mBTC: Open browser console and run:
   ```javascript
   // This simulates getting Bitcoin from Mezo bridge
   await mBTC.faucet();
   ```
4. Deposit Bitcoin collateral (0.01 BTC minimum)
5. Request a loan (amount, duration, purpose)

#### As a Lender:
1. Switch to Account #1 in MetaMask
2. Connect wallet
3. Get MUSD from depositing collateral or using faucet
4. Go to Lender Dashboard
5. Contribute MUSD to the lending pool
6. Watch your earnings grow!

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

## 📖 User Guide

### For Students

**Step 1: Get Bitcoin Collateral (mBTC)**
- In production: Deposit real Bitcoin to Mezo bridge
- For testing: Use the faucet function to get 0.1 mBTC

**Step 2: Deposit Collateral & Mint MUSD**
1. Connect your wallet to the platform
2. Navigate to Student Dashboard
3. Enter Bitcoin amount (minimum 0.001 BTC)
4. Approve the platform to spend your mBTC
5. Click "Deposit Bitcoin & Mint MUSD"
6. Receive MUSD based on BTC/USD price (demo: 1 BTC = 50,000 MUSD)

**Step 3: Request a Loan**
1. Fill out the loan request form:
   - **Amount**: How much MUSD you need
   - **Duration**: Loan period in days
   - **Purpose**: What you're funding (tuition, books, etc.)
2. Submit request
3. Wait for lenders to fund your loan

**Step 4: Receive & Use MUSD**
- Once funded, MUSD is transferred to your wallet
- Use it for education expenses
- Convert to fiat or stablecoins as needed

**Step 5: Repay Your Loan**
1. Navigate to "Active Loans" section
2. Enter repayment amount
3. Approve MUSD spending
4. Complete repayment
5. Build your reputation score!

**Earn NFT Achievements:**
- 🏆 **First Loan** - Your first loan request
- 💰 **First Repayment** - Your first loan repayment
- ✅ **Loan Complete** - Fully repaid loan
- ⭐ **Perfect Repayment** - On-time, complete repayment

### For Lenders

**Step 1: Get MUSD Tokens**
- Deposit Bitcoin collateral like students do
- Or receive MUSD from other lenders

**Step 2: Contribute to Lending Pool**
1. Connect wallet and go to Lender Dashboard
2. Enter MUSD amount to contribute
3. Approve platform to spend MUSD
4. Click "Contribute to Pool"
5. Your funds are now earning interest!

**Step 3: Monitor Your Investments**
- **Pool Stats**: Total pooled, lent, and returned
- **Your Contribution**: Amount you've invested
- **Earnings**: Interest earned from repayments
- **Active Loans**: See which loans are funded

**Step 4: Withdraw Earnings**
- Track your yield in real-time
- Withdraw principal + interest anytime
- Reinvest to compound returns

**Benefits:**
- ✅ 150% over-collateralized (low risk)
- ✅ Bitcoin-backed security
- ✅ Transparent on-chain records
- ✅ Social impact (education financing)

## 🏗️ Smart Contracts

### 1. mBTC (WrappedBTC.sol)
**Mezo Bitcoin Token - ERC20 representation of bridged Bitcoin**

- **Decimals**: 8 (matches Bitcoin satoshi precision)
- **Supply**: Dynamic, minted 1:1 with Bitcoin deposits
- **Key Functions**:
  - `mint(address to, uint256 amount)` - Mint when Bitcoin is bridged
  - `burn(address from, uint256 amount)` - Burn when withdrawing to L1
  - `addBridge(address bridge)` - Authorize bridge contracts
  - `faucet()` - Get 0.1 mBTC for testing

### 2. MezoBridge.sol
**Bitcoin L1 to EVM Bridge Interface**

- **Purpose**: Process Bitcoin deposits and withdrawals
- **Key Functions**:
  - `processDeposit()` - Verify BTC deposit and mint mBTC
  - `requestWithdrawal()` - Burn mBTC and withdraw to Bitcoin L1
  - `getBridgedBalance()` - Check user's bridged amount

**Production Features** (to implement):
- SPV proof verification
- Validator signatures
- 6+ block confirmation requirement
- Withdrawal queue management

### 3. MUSD.sol
**Stablecoin for Loans - ERC20**

- **Decimals**: 18 (standard ERC20)
- **Minting**: Only by authorized minters (StudentLoanPlatform)
- **Key Functions**:
  - `mint(address to, uint256 amount)` - Mint against collateral
  - `burn(uint256 amount)` - Burn on collateral redemption
  - `addMinter(address minter)` - Authorize minter

### 4. StudentLoanPlatform.sol
**Main Lending Logic**

**Core Features**:
- Bitcoin collateral management (150% ratio)
- Loan lifecycle management
- Lender pool operations
- Reputation scoring system
- Interest rate calculations

**Key Functions**:

*For Students:*
- `depositCollateralAndMintMUSD(uint256 mBtcAmount)` - Deposit Bitcoin collateral
- `requestLoan(uint256 amount, uint256 duration, string purpose)` - Request loan
- `repayLoan(uint256 loanId, uint256 amount)` - Make repayment

*For Lenders:*
- `contributeToPool(uint256 amount)` - Add MUSD to lending pool
- `getLenderStats(address lender)` - View contributions and earnings

*View Functions:*
- `getStudentLoans(address student)` - Get all loans for a student
- `calculateTotalOwed(uint256 loanId)` - Calculate total owed with interest
- `getLoan(uint256 loanId)` - Get loan details

**Interest Rate Logic**:
```solidity
// Base rate: 10% (1000 basis points)
// Adjusted by reputation score (0-100)
// Higher score = lower rate
interestRate = 1000 - (reputationScore * 5);
// Range: 5% (perfect score) to 10% (new user)
```

### 5. StudentLoanNFT.sol
**Achievement NFTs - ERC721**

**Achievement Types**:
- `FIRST_LOAN` - First loan requested
- `FIRST_REPAYMENT` - First loan repayment made
- `LOAN_COMPLETE` - Loan fully repaid
- `PERFECT_REPAYMENT` - Perfect repayment record

**Key Functions**:
- `mintAchievement()` - Mint achievement NFT (platform only)
- `getUserAchievements(address user)` - Get all user NFTs
- `getAchievement(uint256 tokenId)` - Get achievement metadata

## 💡 Key Concepts

### Collateral Ratio
- **Requirement**: 150% collateralization
- **Example**: 
  - Deposit: 0.1 BTC ($5,000)
  - Can borrow: Up to $3,333 MUSD
  - Buffer: $1,667 protects lenders

### Reputation System
- **Starting Score**: 100 (neutral)
- **Increases**: On-time repayments, loan completion
- **Decreases**: Late payments, defaults
- **Benefits**: Lower interest rates, higher borrow limits

### Price Oracle (Production)
- **Current**: Simplified 1 BTC = 50,000 MUSD
- **Production**: Chainlink BTC/USD price feed
- **Update Frequency**: Real-time on-chain pricing

### Liquidation (Future Feature)
- **Trigger**: Collateral ratio drops below 120%
- **Process**: Automated auction of collateral
- **Protection**: Prevents undercollateralized loans

## 🔒 Security

### Smart Contract Security

**OpenZeppelin Libraries**:
- `Ownable` - Access control for admin functions
- `ReentrancyGuard` - Prevents reentrancy attacks
- `ERC20` / `ERC721` - Battle-tested token standards

**Security Measures**:
- ✅ 150% over-collateralization
- ✅ ReentrancyGuard on all state-changing functions
- ✅ Access control (onlyOwner, onlyVerifier)
- ✅ Input validation (amount > 0, valid addresses)
- ✅ Safe math operations (Solidity 0.8+)
- ✅ No direct ETH handling (uses ERC20 tokens)

### Bridge Security (Production)

**Bitcoin Deposit Verification**:
- SPV (Simplified Payment Verification) proofs
- Multiple validator signatures
- 6+ block confirmations required
- Double-spend protection

**Withdrawal Security**:
- Time-lock on large withdrawals
- Multi-sig for bridge operations
- Rate limiting on withdrawals

### Frontend Security

**Wallet Connection**:
- RainbowKit secure wallet integration
- Users control private keys
- No custodial wallets

**Best Practices**:
- Always verify contract addresses
- Check transaction details before signing
- Use hardware wallets for large amounts
- Keep seed phrases secure

### Audit Status

⚠️ **Pre-audit**: This project is in development
- **Recommended**: Full security audit before mainnet
- **Testnet**: Safe for testing with test tokens
- **Mainnet**: Deploy only after professional audit

### Known Limitations

1. **Price Oracle**: Currently using simplified pricing (1 BTC = 50,000 MUSD)
   - **Production**: Integrate Chainlink BTC/USD oracle
   
2. **Liquidation**: Not yet implemented
   - **Risk**: Undercollateralized loans if BTC price crashes
   - **Mitigation**: Monitor collateral ratios

3. **Governance**: Centralized admin controls
   - **Future**: Transition to DAO governance

### Reporting Security Issues

Found a vulnerability? Please report responsibly:
- **Email**: security@studentmezo.io
- **GitHub**: Create a private security advisory
- **Bug Bounty**: Coming soon after mainnet launch

## 🗺️ Roadmap

### Phase 1: MVP (Completed ✅)
- [x] Core smart contracts (mBTC, Bridge, MUSD, Platform, NFT)
- [x] Bitcoin integration architecture
- [x] Frontend with wallet connection (RainbowKit)
- [x] Student dashboard
- [x] Lender dashboard
- [x] Basic loan lifecycle
- [x] NFT achievement system
- [x] Local testing environment

### Phase 2: Testnet (In Progress 🚧)
- [ ] Mezo testnet integration
- [ ] Real Bitcoin deposits via Mezo bridge
- [ ] Chainlink BTC/USD price oracle
- [ ] Advanced reputation algorithm
- [ ] Liquidation mechanism
- [ ] Gas optimization
- [ ] Comprehensive testing

### Phase 3: Mainnet (Planned 📅)
- [ ] Professional security audit
- [ ] Mainnet deployment
- [ ] Real Bitcoin collateral
- [ ] Fiat on/off ramps
- [ ] Mobile app (iOS/Android)
- [ ] Multi-language support
- [ ] Community governance token

### Phase 4: Scale (Future 🚀)
- [ ] DAO governance
- [ ] Cross-chain support (other L2s)
- [ ] Lightning Network integration
- [ ] Institutional lender onboarding
- [ ] Credit scoring partnerships
- [ ] University partnerships
- [ ] Global expansion

## 🛠️ Development

### Smart Contracts

**Compile**:
```bash
cd contracts
npx hardhat compile
```

**Test**:
```bash
npx hardhat test
npm run test:coverage  # With coverage report
```

**Deploy Locally**:
```bash
# Terminal 1
npx hardhat node

# Terminal 2
npx hardhat run scripts/deploy.js --network localhost
```

**Deploy to Testnet**:
```bash
# Set env variables in contracts/.env
SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key

npx hardhat run scripts/deploy.js --network sepolia
```

### Frontend

**Development**:
```bash
cd frontend
npm run dev  # Start dev server
npm run build  # Production build
npm run preview  # Preview production build
```

**Environment Variables** (`frontend/.env`):
```
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
VITE_CHAIN_ID=31337  # 31337 for localhost, 11155111 for Sepolia
```

## 🧪 Testing

### Smart Contract Tests

```bash
cd contracts
npx hardhat test
```

**Test Coverage**:
- Student registration and verification
- mBTC minting and burning
- Bridge deposit and withdrawal
- Collateral deposit and MUSD minting
- Loan request, funding, and repayment
- Lender pool contributions
- Interest calculations
- NFT achievement minting
- Reputation score updates

### Frontend Testing

**Manual Testing Checklist**:
- [ ] Wallet connection (MetaMask, WalletConnect)
- [ ] Network switching
- [ ] Student dashboard loads correctly
- [ ] Lender dashboard displays pool stats
- [ ] Deposit Bitcoin collateral flow
- [ ] Request loan flow
- [ ] Loan repayment flow
- [ ] Lender contribution flow
- [ ] NFT display
- [ ] Responsive design (mobile/desktop)

### Integration Testing

Test the full user journey:

1. **Setup**: Deploy contracts, start frontend
2. **Student Journey**: 
   - Connect wallet → Deposit collateral → Request loan → Repay
3. **Lender Journey**:
   - Connect wallet → Get MUSD → Contribute to pool → Withdraw
4. **Verify**: Check balances, NFTs, reputation scores

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

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Code Contributions**
   - Bug fixes
   - New features
   - Performance improvements
   - Test coverage

2. **Documentation**
   - Improve README
   - Add code comments
   - Write tutorials
   - Translate docs

3. **Design**
   - UI/UX improvements
   - Logo and branding
   - Marketing materials

4. **Testing**
   - Report bugs
   - Test on different browsers/devices
   - Testnet testing

### Contribution Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/StudentMezo-dApp.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features

4. **Test your changes**
   ```bash
   cd contracts && npx hardhat test
   cd frontend && npm run build
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m 'Add: New reputation scoring algorithm'
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Wait for review

### Code Style Guidelines

**Solidity**:
- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use NatSpec comments for functions
- Keep functions small and focused

**JavaScript/React**:
- Use ES6+ syntax
- Functional components with hooks
- Meaningful variable names
- Comment complex logic

### Development Setup

See "Getting Started" and "Development" sections above for detailed setup instructions.

## 📚 Additional Resources

### Documentation
- [Mezo Protocol Docs](https://docs.mezo.org)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Docs](https://rainbowkit.com)

### Learning Resources
- [Solidity by Example](https://solidity-by-example.org/)
- [Ethereum.org Developers](https://ethereum.org/developers)
- [CryptoZombies](https://cryptozombies.io/)

### Community
- **Discord**: [Join our community](https://discord.gg/studentmezo)
- **Twitter**: [@StudentMezo](https://twitter.com/studentmezo)
- **Telegram**: [StudentMezo Discussion](https://t.me/studentmezo)

## ❓ FAQ

**Q: Is this using real Bitcoin?**
A: Yes! Via Mezo Protocol's bridge, real Bitcoin is locked on L1 and represented as mBTC tokens on the EVM layer.

**Q: How are loans collateralized?**
A: All loans require 150% collateralization in Bitcoin. For example, to borrow $1000 MUSD, you need $1500 worth of Bitcoin.

**Q: What happens if I can't repay?**
A: Your reputation score decreases, affecting future interest rates. In production, there will be a liquidation mechanism to protect lenders.

**Q: How do lenders earn money?**
A: Lenders earn interest from loan repayments, distributed proportionally to their pool contributions.

**Q: Are there fees?**
A: Currently no platform fees. Future: Small fee to sustain development and security.

**Q: Is this audited?**
A: Not yet. This is a development version. Professional audit planned before mainnet launch.

**Q: Can I use this on mainnet?**
A: Not yet. Currently for testnet/localhost testing only. Mainnet launch after audit.

**Q: What's the minimum loan amount?**
A: Minimum deposit is 0.001 BTC. Loan amounts depend on your collateral.

**Q: How long do loans last?**
A: Borrowers specify duration when requesting loans (in days/months).

**Q: What are NFT achievements for?**
A: They're proof of milestones (first loan, good repayment) and may unlock future benefits.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**MIT License Summary**:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ⚠️ No warranty
- ⚠️ No liability

## � Support

Need help? We're here for you:

- **GitHub Issues**: [Report bugs or request features](https://github.com/dhruvxbug/StudentMezo-dApp/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/dhruvxbug/StudentMezo-dApp/discussions)
- **Email**: support@studentmezo.io
- **Discord**: Join our community server

## 🙏 Acknowledgments

This project builds on amazing open-source work:

- **[Mezo Protocol](https://mezo.org)** - Bitcoin to EVM bridge
- **[OpenZeppelin](https://openzeppelin.com)** - Secure smart contract libraries
- **[Hardhat](https://hardhat.org)** - Ethereum development environment
- **[RainbowKit](https://rainbowkit.com)** - Beautiful wallet connection
- **[Wagmi](https://wagmi.sh)** - React hooks for Ethereum
- **[Vite](https://vitejs.dev)** - Lightning-fast frontend tooling
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework

Special thanks to all contributors and the Web3 community!

---

<div align="center">

**Built with ₿ by [@dhruvxbug](https://github.com/dhruvxbug)**

**⭐ Star this repo if you find it useful!**

[Website](https://studentmezo.io) • [Documentation](./MEZO_BITCOIN_INTEGRATION.md) • [Twitter](https://twitter.com/studentmezo) • [Discord](https://discord.gg/studentmezo)

*Empowering students worldwide through Bitcoin-backed education financing*

</div>
- The Ethereum community

---

Built with ❤️ for students worldwide
