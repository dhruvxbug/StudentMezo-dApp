# Mezo Bitcoin Integration Guide

## Overview

StudentMezo DApp now uses **real Bitcoin** as collateral through the Mezo Protocol bridge, instead of synthetic wrapped tokens (WBTC). This enables students to use their actual Bitcoin holdings for education loans while maintaining full security and decentralization.

## Architecture

### Smart Contracts

1. **mBTC (Mezo Bitcoin Token)** - `WrappedBTC.sol`
   - ERC20 token representing bridged Bitcoin (1:1 ratio)
   - 8 decimals to match Bitcoin's satoshi precision
   - Mintable only by authorized bridge contracts
   - Burnable for withdrawals back to Bitcoin L1

2. **MezoBridge** - `MezoBridge.sol`
   - Interfaces with Mezo Protocol's Bitcoin bridge
   - Processes Bitcoin deposits from L1
   - Mints mBTC tokens on EVM layer
   - Handles withdrawal requests back to Bitcoin L1

3. **StudentLoanPlatform** - `StudentLoanPlatform.sol`
   - Accepts mBTC as collateral
   - Mints MUSD stablecoin against Bitcoin collateral
   - 150% collateralization ratio for lender protection
   - Returns collateral upon loan repayment

## How It Works

### For Students (Borrowers)

#### Step 1: Bridge Bitcoin to EVM Layer
```
Bitcoin L1 → Mezo Bridge → mBTC tokens (EVM)
```

1. User sends Bitcoin to Mezo bridge address on Bitcoin L1
2. Mezo validators verify the transaction (6+ confirmations)
3. Bridge mints equivalent mBTC tokens on EVM layer (1:1 ratio)
4. User receives mBTC in their EVM wallet

#### Step 2: Deposit Collateral and Get MUSD
```
mBTC → StudentLoanPlatform → MUSD stablecoin
```

1. User approves StudentLoanPlatform to spend mBTC
2. User calls `depositCollateralAndMintMUSD(amount)`
3. Platform holds mBTC as collateral
4. Platform mints MUSD stablecoin (based on BTC/USD price)
5. User receives MUSD for education expenses

#### Step 3: Repay Loan and Retrieve Collateral
```
Repay MUSD → Get mBTC back → Withdraw to Bitcoin L1
```

1. User repays loan in MUSD
2. Platform returns mBTC collateral
3. User can hold mBTC or bridge back to Bitcoin L1
4. Bridge burns mBTC and sends Bitcoin on L1

### For Lenders

1. Lenders contribute MUSD to the lending pool
2. MUSD is backed by Bitcoin collateral (150% ratio)
3. Earn yield from loan interest
4. Protected by over-collateralization

## Technical Details

### Token Specifications

| Token | Symbol | Decimals | Purpose |
|-------|--------|----------|---------|
| Mezo Bitcoin | mBTC | 8 | Bridged Bitcoin collateral |
| Mezo USD | MUSD | 18 | Stablecoin for loans |
| Student Loan NFT | SLNFT | - | Achievement badges |

### Collateral Calculation

```solidity
// Example: Deposit 0.1 BTC (~$5,000 at $50,000/BTC)
mBtcAmount = 0.1 * 10^8 = 10,000,000 satoshis

// Calculate MUSD with price oracle (production)
btcPrice = 50000 * 10^18  // $50,000 in USD (18 decimals)
musdAmount = (mBtcAmount * btcPrice) / (1 * 10^8)
musdAmount = 5000 * 10^18  // 5,000 MUSD

// For testing (simplified 1:1 ratio in code):
musdAmount = (mBtcAmount * 50000 * 10^18) / (1 * 10^8)
```

### Smart Contract Functions

#### MezoBridge

```solidity
// Process Bitcoin deposit (called by validators)
function processDeposit(
    address user,
    uint256 amount,
    bytes32 btcTxHash,
    string calldata btcAddress
) external

// Request withdrawal to Bitcoin L1
function requestWithdrawal(
    uint256 amount,
    string calldata btcAddress
) external returns (bytes32)
```

#### StudentLoanPlatform

```solidity
// Deposit mBTC collateral and mint MUSD
function depositCollateralAndMintMUSD(uint256 mBtcAmount) external

// Request loan
function requestLoan(
    uint256 amount,
    uint256 duration,
    string memory purpose
) external returns (uint256)

// Repay loan
function repayLoan(uint256 loanId, uint256 amount) external
```

## Development Setup

### 1. Compile Contracts

```bash
cd contracts
npx hardhat compile
```

### 2. Deploy Locally

```bash
# Terminal 1: Start Hardhat node
npx hardhat node

# Terminal 2: Deploy contracts
npm run deploy:local
```

### 3. Test with Mock Bitcoin

For local testing, use the faucet function:

```javascript
// Get test mBTC
await mBTC.faucet();  // Mints 0.1 BTC to your address

// Approve platform
await mBTC.approve(platformAddress, amount);

// Deposit collateral
await platform.depositCollateralAndMintMUSD(amount);
```

## Production Deployment

### Prerequisites

1. **Mezo Protocol Access**
   - Obtain Mezo Bridge contract addresses
   - Set up validator access (if running own bridge)
   - Configure Bitcoin node for SPV proofs

2. **Price Oracle**
   - Integrate Chainlink BTC/USD price feed
   - Update `depositCollateralAndMintMUSD()` with real pricing

3. **Security Audit**
   - Audit bridge integration
   - Test withdrawal mechanisms
   - Verify collateral calculations

### Mainnet Integration

1. **Use Official Mezo Contracts**
   ```solidity
   // Replace with actual Mezo mBTC token address
   address mBtcAddress = 0x...;  // Official Mezo mBTC
   
   // Replace with actual Mezo Bridge address
   address bridgeAddress = 0x...; // Official Mezo Bridge
   ```

2. **Integrate Chainlink Oracle**
   ```solidity
   import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
   
   AggregatorV3Interface priceFeed = AggregatorV3Interface(
       0x...  // Chainlink BTC/USD feed
   );
   ```

3. **Configure Bridge Validators**
   - Register with Mezo validator network
   - Set up SPV proof verification
   - Configure minimum confirmation depth (6+ blocks)

## Security Considerations

### Bridge Security

1. **Bitcoin Transaction Verification**
   - Minimum 6 confirmations required
   - SPV proof validation
   - Multiple validator signatures

2. **Collateral Protection**
   - 150% over-collateralization
   - Real-time price monitoring
   - Liquidation mechanisms (future feature)

3. **Smart Contract Security**
   - ReentrancyGuard on all critical functions
   - Owner-only bridge authorization
   - Validated address checks

### Best Practices

1. **For Students**
   - Only deposit Bitcoin you can afford to lock
   - Monitor BTC price to avoid liquidation (future)
   - Repay loans on time to retrieve collateral

2. **For Lenders**
   - Verify collateral ratios before contributing
   - Diversify across multiple loans
   - Monitor platform health metrics

3. **For Developers**
   - Use official Mezo contracts in production
   - Implement price oracle monitoring
   - Set up automated alerts for collateral ratios

## Testing Guide

### Local Testing Flow

1. **Setup**
   ```bash
   npm install
   npx hardhat compile
   npx hardhat node
   ```

2. **Deploy**
   ```bash
   npm run deploy:local
   ```

3. **Get Test Bitcoin**
   ```javascript
   await mBTC.faucet();  // Get 0.1 mBTC
   ```

4. **Deposit Collateral**
   ```javascript
   await mBTC.approve(platformAddress, ethers.parseUnits("0.01", 8));
   await platform.depositCollateralAndMintMUSD(ethers.parseUnits("0.01", 8));
   ```

5. **Request Loan**
   ```javascript
   await platform.requestLoan(
       ethers.parseEther("100"),  // 100 MUSD
       30 * 24 * 60 * 60,         // 30 days
       "Tuition fees"
   );
   ```

### Testnet Testing

1. **Get Testnet Bitcoin**
   - Use Bitcoin testnet faucet
   - Deposit to Mezo testnet bridge

2. **Bridge to EVM**
   - Wait for confirmations
   - Receive mBTC on testnet

3. **Test Full Flow**
   - Deposit collateral
   - Request loan
   - Repay loan
   - Withdraw to Bitcoin L1

## Future Enhancements

1. **Lightning Network Integration**
   - Instant Bitcoin deposits via Lightning
   - Lower transaction fees
   - Better UX for small amounts

2. **Dynamic Pricing**
   - Real-time Chainlink oracles
   - Multiple price feed sources
   - TWAP (Time-Weighted Average Price)

3. **Liquidation Mechanism**
   - Automated liquidation at 120% ratio
   - Dutch auction for collateral
   - Keeper rewards

4. **Multi-Collateral Support**
   - Accept other assets alongside Bitcoin
   - Weighted collateral ratios
   - Portfolio-based risk assessment

## Resources

- [Mezo Protocol Documentation](https://docs.mezo.org)
- [Bitcoin Bridge Guide](https://docs.mezo.org/bridge)
- [Chainlink Price Feeds](https://docs.chain.link/data-feeds/price-feeds)
- [EIP-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)

## Support

For issues or questions:
- GitHub Issues: [StudentMezo-dApp/issues](https://github.com/dhruvxbug/StudentMezo-dApp/issues)
- Mezo Discord: [discord.gg/mezo](https://discord.gg/mezo)
- Documentation: [docs.studentmezo.io](https://docs.studentmezo.io)

---

**Built with ₿ by the StudentMezo Team**
