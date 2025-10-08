# StudentMezo DApp - Quick Start Guide

Get up and running with StudentMezo DApp in 5 minutes!

## Prerequisites

- Node.js 18+ and npm
- MetaMask or another Web3 wallet
- Basic understanding of blockchain/DeFi

## Quick Setup

### 1. Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/dhruvxbug/StudentMezo-dApp.git
cd StudentMezo-dApp

# Install all dependencies
npm install
cd contracts && npm install
cd ../frontend && npm install
cd ..
```

### 2. Start Local Blockchain (1 minute)

Open a new terminal and run:

```bash
cd contracts
npx hardhat node
```

Keep this terminal running. You'll see 20 test accounts with 10,000 ETH each.

### 3. Deploy Smart Contracts (1 minute)

In a new terminal:

```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

**Important**: Copy the deployed contract addresses from the output!

Example output:
```
MUSD deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
StudentLoanNFT deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
StudentLoanPlatform deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

### 4. Configure Frontend (30 seconds)

Update `frontend/src/utils/contracts.js` with your deployed addresses:

```javascript
export const CONTRACT_ADDRESSES = {
  MUSD: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  StudentLoanNFT: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  StudentLoanPlatform: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
};
```

### 5. Start Frontend (30 seconds)

```bash
cd frontend
npm run dev
```

Visit: http://localhost:5173

### 6. Connect MetaMask

1. Open MetaMask
2. Add Localhost 8545 network:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 1337
   - Currency Symbol: ETH

3. Import a test account from Hardhat:
   - Copy a private key from the Hardhat terminal
   - Import into MetaMask

4. Click "Connect Wallet" in the app

## Test the DApp

### As a Student

1. **Get Verified** (for testing, you'll need to verify yourself using the platform owner account):
   ```javascript
   // In Hardhat console or script
   await platform.verifyStudent("YOUR_ADDRESS");
   ```

2. **Deposit Collateral**:
   - Go to Student Dashboard
   - Enter amount (e.g., 1 ETH)
   - Click "Deposit Collateral & Mint MUSD"
   - Confirm transaction in MetaMask

3. **Request a Loan**:
   - Fill in loan amount (e.g., 1000 MUSD)
   - Select duration (30 days)
   - Add purpose (e.g., "Laptop for coding")
   - Click "Request Loan"

### As a Lender

1. **Get MUSD**:
   - First, mint some MUSD to your address (use owner account or deposit collateral as student)

2. **Contribute to Pool**:
   - Go to Lender Dashboard
   - Enter contribution amount
   - Click "Contribute to Pool"
   - Approve MUSD spending (first transaction)
   - Confirm contribution (second transaction)

## Troubleshooting

### "Nonce too high" error
Reset your MetaMask account:
Settings → Advanced → Reset Account

### Transaction fails
- Make sure you have enough ETH for gas
- Check you're on the correct network (Localhost 8545)
- Verify contract addresses are correct

### Can't see transactions
- Check you're connected to the right account
- Refresh the page
- Check Hardhat console for errors

### Contract address not found
- Make sure Hardhat node is running
- Re-deploy contracts if you restarted Hardhat
- Update frontend with new addresses

## Next Steps

1. **Explore Features**:
   - Create multiple test accounts
   - Test the full loan lifecycle
   - Try different scenarios

2. **Read Documentation**:
   - Check README.md for detailed features
   - Read DEPLOYMENT.md for production deployment
   - Review contracts/README.md for contract details

3. **Customize**:
   - Modify UI/UX
   - Adjust interest rates
   - Add new features

4. **Deploy to Testnet**:
   - Follow DEPLOYMENT.md guide
   - Test with real testnet ETH
   - Share with others

## Common Tasks

### Verify a Student
```javascript
// Using Hardhat console
npx hardhat console --network localhost
const platform = await ethers.getContractAt("StudentLoanPlatform", "PLATFORM_ADDRESS");
await platform.verifyStudent("STUDENT_ADDRESS");
```

### Mint MUSD to Lender
```javascript
const musd = await ethers.getContractAt("MUSD", "MUSD_ADDRESS");
await musd.mint("LENDER_ADDRESS", ethers.parseEther("10000"));
```

### Fund a Pending Loan
```javascript
const platform = await ethers.getContractAt("StudentLoanPlatform", "PLATFORM_ADDRESS");
await platform.fundLoan(1); // Loan ID
```

### Check Loan Details
```javascript
const loan = await platform.getLoan(1);
console.log(loan);
```

## Development Workflow

1. **Make changes** to contracts or frontend
2. **Test locally** with Hardhat network
3. **Verify** everything works as expected
4. **Commit** your changes
5. **Deploy to testnet** for broader testing
6. **Get feedback** from the community

## Resources

- **Documentation**: See README.md
- **Deployment**: See DEPLOYMENT.md
- **Contributing**: See CONTRIBUTING.md
- **Smart Contracts**: contracts/README.md
- **Frontend**: frontend/README.md

## Need Help?

- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation
- Join our community (Discord/Telegram)

## Success! 🎉

You now have a fully functional StudentMezo DApp running locally!

Start exploring the platform, test different scenarios, and contribute to making education financing more accessible through DeFi.

---

**Happy Building!** 🎓
