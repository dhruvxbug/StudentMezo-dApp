# StudentMezo Frontend

React-based frontend for the StudentMezo DApp.

## Features

- 🔐 Wallet connection via RainbowKit
- 📊 Student dashboard for managing loans
- 💰 Lender dashboard for pool contributions
- 🎨 Responsive design
- ⚡ Fast development with Vite

## Technology Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Wagmi** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **React Router** - Client-side routing
- **Ethers.js/Viem** - Blockchain interaction

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update contract addresses in `src/utils/contracts.js`

3. Update WalletConnect Project ID in `src/utils/wagmi-config.js`

## Development

```bash
npm run dev
```

## Building

```bash
npm run build
```

See main project README for full documentation.
