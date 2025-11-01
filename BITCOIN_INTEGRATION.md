# Bitcoin Integration Guide

## Overview
The smart contracts have been updated to accept **Wrapped Bitcoin (WBTC)** tokens instead of native ETH as collateral. This change aligns with the project's Bitcoin-focused architecture.

## What Changed

### 1. **New Contract: WrappedBTC.sol**
A mock ERC20 token contract that represents Wrapped Bitcoin for testing purposes.

**Key Features:**
- **8 decimals** (matches real Bitcoin)
- Symbol: WBTC
- Includes a `faucet()` function for easy testing (gives 1 BTC to any address)
- Owner can mint additional tokens

### 2. **Updated: StudentLoanPlatform.sol**

#### **Constructor Changes:**
```solidity
// OLD: constructor(address _musdToken, address _nftContract)
// NEW: constructor(address _musdToken, address _nftContract, address _btcToken)
```
Now requires the WBTC token address during deployment.

#### **Deposit Function Changes:**
```solidity
// OLD: depositCollateralAndMintMUSD() external payable
// NEW: depositCollateralAndMintMUSD(uint256 btcAmount) external
```

**Before (ETH-based):**
- Users sent ETH with `msg.value`
- Contract received native ETH directly

**After (WBTC-based):**
- Users must **approve** WBTC spending first
- Users call function with BTC amount
- Contract transfers WBTC tokens using `transferFrom()`
- Handles 8-decimal BTC → 18-decimal MUSD conversion

### 3. **Updated: deploy.js**
Deployment script now:
1. Deploys **WrappedBTC** contract first
2. Passes WBTC address to StudentLoanPlatform constructor
3. Saves WBTC address to deployment-addresses.json

## How to Test with Bitcoin (WBTC)

### Step 1: Deploy Contracts
\`\`\`bash
cd contracts
npx hardhat node  # Terminal 1 - keep running
npm run deploy:local  # Terminal 2
\`\`\`

### Step 2: Get WBTC from Faucet
In Hardhat console or via frontend:
\`\`\`javascript
const wbtc = await ethers.getContractAt("WrappedBTC", WBTC_ADDRESS);
await wbtc.faucet(); // Get 1 BTC (100,000,000 satoshis)
\`\`\`

### Step 3: Approve WBTC Spending
**IMPORTANT:** Before depositing, users must approve the platform:
\`\`\`javascript
const btcAmount = ethers.parseUnits("0.1", 8); // 0.1 BTC (8 decimals)
await wbtc.approve(PLATFORM_ADDRESS, btcAmount);
\`\`\`

### Step 4: Deposit Bitcoin Collateral
\`\`\`javascript
const platform = await ethers.getContractAt("StudentLoanPlatform", PLATFORM_ADDRESS);
await platform.depositCollateralAndMintMUSD(btcAmount);
\`\`\`

## Decimal Conversion
- **Bitcoin/WBTC:** 8 decimals (1 BTC = 100,000,000)
- **MUSD:** 18 decimals (1 MUSD = 1,000,000,000,000,000,000)
- **Conversion:** Contract multiplies by 10^10 to convert BTC to MUSD

### Examples:
- 0.1 BTC = 10,000,000 (8 decimals)
- 0.1 BTC → 0.1 MUSD = 100,000,000,000,000,000 (18 decimals)

## Frontend Integration Required

### Update wagmi-config.js
Add WBTC contract configuration:
\`\`\`javascript
export const WBTC_ABI = [...]; // Import from artifacts
export const CONTRACT_ADDRESSES = {
  WBTC: "0x...", // From deployment-addresses.json
  MUSD: "0x...",
  // ...
};
\`\`\`

### Update StudentDashboard.jsx

#### Add WBTC Balance Display:
\`\`\`jsx
const { data: wbtcBalance } = useReadContract({
  address: CONTRACT_ADDRESSES.WBTC,
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: [address],
});

// Display with 8 decimals
{formatUnits(wbtcBalance || 0n, 8)} BTC
\`\`\`

#### Add Approve Button:
\`\`\`jsx
const { writeContract: approveWBTC } = useWriteContract();

const handleApprove = async () => {
  const btcAmount = parseUnits(depositAmount, 8);
  await approveWBTC({
    address: CONTRACT_ADDRESSES.WBTC,
    abi: erc20Abi,
    functionName: 'approve',
    args: [CONTRACT_ADDRESSES.StudentLoanPlatform, btcAmount],
  });
};
\`\`\`

#### Update Deposit Function:
\`\`\`jsx
const { writeContract: depositBTC } = useWriteContract();

const handleDeposit = async () => {
  const btcAmount = parseUnits(depositAmount, 8); // 8 decimals for BTC
  await depositBTC({
    address: CONTRACT_ADDRESSES.StudentLoanPlatform,
    abi: PLATFORM_ABI,
    functionName: 'depositCollateralAndMintMUSD',
    args: [btcAmount],
    // NO value parameter - we're not sending ETH!
  });
};
\`\`\`

#### Add WBTC Faucet Button:
\`\`\`jsx
const handleFaucet = async () => {
  await writeContract({
    address: CONTRACT_ADDRESSES.WBTC,
    abi: WBTC_ABI,
    functionName: 'faucet',
  });
};
\`\`\`

## Production Considerations

### For Mezo Mainnet:
1. **Replace Mock WBTC** with real Mezo BTC token address
2. **Remove faucet** functionality
3. **Implement Chainlink Oracle** for accurate BTC/USD pricing
4. **Add slippage protection** for price volatility
5. **Consider time-weighted average pricing** to prevent manipulation

### Security Notes:
- Always check token approval allowances
- Validate BTC token decimals (should be 8)
- Handle decimal conversions carefully
- Add minimum deposit amounts
- Implement emergency pause mechanism

## Testing Checklist

- [ ] Deploy all contracts successfully
- [ ] Call WBTC faucet to get test BTC
- [ ] Approve WBTC spending for platform
- [ ] Deposit WBTC and verify MUSD minted
- [ ] Check WBTC balance decreased
- [ ] Check MUSD balance increased
- [ ] Verify correct decimal conversion (8→18)
- [ ] Request loan with MUSD collateral
- [ ] Test full loan lifecycle

## Common Issues

### "ERC20: insufficient allowance"
**Solution:** Call `wbtc.approve(platformAddress, amount)` before depositing.

### "ERC20: transfer amount exceeds balance"
**Solution:** Call `wbtc.faucet()` to get test BTC first.

### Wrong decimal display
**Solution:** Use `formatUnits(amount, 8)` for BTC, `formatUnits(amount, 18)` for MUSD.

### Transaction reverts with no error
**Solution:** Check that WBTC contract is deployed and address is correct.

## Next Steps

1. ✅ Contracts updated and compiled
2. 🔄 **Deploy contracts** (you're here)
3. ⏳ Update frontend with WBTC integration
4. ⏳ Test complete flow with WBTC
5. ⏳ Deploy to Mezo testnet
6. ⏳ Replace with real Mezo BTC token
7. ⏳ Mainnet deployment
