# StudentMezo Smart Contracts

This directory contains the Solidity smart contracts for the StudentMezo DApp.

## Contracts

### MUSD.sol
ERC20 stablecoin token used for loans.

**Key Features:**
- Mintable by authorized addresses
- Burnable by token holders
- Owner can add/remove minters
- Used as the primary currency for loans

**Functions:**
- `mint(address to, uint256 amount)` - Mint new MUSD tokens
- `burn(uint256 amount)` - Burn MUSD tokens
- `addMinter(address minter)` - Add authorized minter (owner only)
- `removeMinter(address minter)` - Remove minter authorization (owner only)

### StudentLoanPlatform.sol
Main contract managing the loan platform.

**Key Features:**
- Student verification system
- Collateral management
- Loan creation and funding
- Repayment tracking
- Lender pool management
- Reputation scoring
- Interest rate calculation

**Functions:**

*Admin Functions:*
- `addVerifier(address verifier)` - Add student verifier
- `verifyStudent(address student)` - Verify a student
- `fundLoan(uint256 loanId)` - Fund a pending loan from pool

*Student Functions:*
- `depositCollateralAndMintMUSD()` - Deposit ETH collateral and mint MUSD
- `requestLoan(uint256 amount, uint256 duration, string purpose)` - Request a new loan
- `repayLoan(uint256 loanId, uint256 amount)` - Make loan repayment

*Lender Functions:*
- `contributeToPool(uint256 amount)` - Add MUSD to lending pool

*View Functions:*
- `getStudentLoans(address student)` - Get all loans for a student
- `getLoan(uint256 loanId)` - Get loan details
- `getLenderStats(address lender)` - Get lender contribution and earnings
- `calculateTotalOwed(uint256 loanId)` - Calculate total amount owed

**Events:**
- `StudentVerified(address indexed student)`
- `CollateralDeposited(address indexed student, uint256 amount)`
- `MUSDMinted(address indexed student, uint256 amount)`
- `LoanRequested(uint256 indexed loanId, address indexed student, uint256 amount)`
- `LoanFunded(uint256 indexed loanId, uint256 amount)`
- `LoanRepaid(uint256 indexed loanId, uint256 amount)`
- `LenderContribution(address indexed lender, uint256 amount)`

### StudentLoanNFT.sol
ERC721 NFT contract for student achievements.

**Achievement Types:**
- `FIRST_LOAN` - First loan requested
- `FIRST_REPAYMENT` - First repayment made
- `LOAN_COMPLETED` - Loan fully repaid
- `PERFECT_RECORD` - Perfect repayment history
- `TOP_BORROWER` - Top reputation score

**Functions:**
- `mintAchievement(address student, AchievementType type, string metadata)` - Mint achievement NFT
- `getUserAchievements(address user)` - Get all NFTs for a user
- `getAchievement(uint256 tokenId)` - Get achievement details

## Deployment

### Local Deployment

1. Start local Hardhat network:
```bash
npx hardhat node
```

2. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet Deployment

1. Set environment variables in `.env`:
```
TESTNET_RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key
```

2. Deploy:
```bash
npx hardhat run scripts/deploy.js --network testnet
```

## Testing

Run all tests:
```bash
npx hardhat test
```

Run tests with coverage:
```bash
npx hardhat coverage
```

## Security

- Uses OpenZeppelin contracts for security best practices
- ReentrancyGuard on all state-changing functions involving transfers
- Access control for admin functions
- Over-collateralization requirement (150%)

## Constants

- `COLLATERAL_RATIO`: 150% (150)
- `MAX_INTEREST_RATE`: 20% (2000 basis points)

## Interest Rate Calculation

Interest rates are dynamic based on student reputation:
- Reputation ≥ 150: 3%
- Reputation ≥ 120: 5%
- Reputation ≥ 100: 8%
- Default: 10%

Students start with a reputation score of 100, which increases with successful repayments.
