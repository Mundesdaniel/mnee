# Quick Setup Guide

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Configure Environment (2 min)
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add:
# - Your wallet PRIVATE_KEY
# - SEPOLIA_RPC_URL from Alchemy/Infura
# - ETHERSCAN_API_KEY
# - VITE_WALLETCONNECT_PROJECT_ID
```

### Step 3: Deploy Contracts (1 min)
```bash
# Compile contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy
```

### Step 4: Update Configuration (30 sec)
After deployment, copy the contract addresses from the console and update `src/config.js`:

```javascript
export const MNEETokenAddress = "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF";
export const MNEESubscriptionAddress = "YOUR_DEPLOYED_ADDRESS";
export const MNEEStakingAddress = "YOUR_DEPLOYED_ADDRESS";
```

### Step 5: Run the App (30 sec)
```bash
npm run dev
```

Visit `http://localhost:5173` and connect your wallet!

## 📝 Required API Keys

### 1. Alchemy (Free)
- Go to https://www.alchemy.com/
- Create app → Get API key
- Use in `SEPOLIA_RPC_URL`

### 2. Etherscan (Free)
- Go to https://etherscan.io/
- My Account → API Keys → Add
- Use in `ETHERSCAN_API_KEY`

### 3. WalletConnect (Free)
- Go to https://cloud.walletconnect.com
- Create Project → Get Project ID
- Use in `VITE_WALLETCONNECT_PROJECT_ID`

## 💡 Tips

1. **Need Sepolia ETH?**
   - Get free testnet ETH: https://sepoliafaucet.com/

2. **Need MNEE tokens?**
   - Mainnet: `0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`
   - Testnet: Deploy your own or use mock tokens

3. **Testing locally?**
   ```bash
   # Start local hardhat node
   npx hardhat node
   
   # Deploy to local network
   npx hardhat run scripts/deploy.js --network localhost
   ```

## ⚠️ Common Issues

**"Cannot find module"**
→ Run `npm install` again

**"Invalid private key"**
→ Make sure `.env` has valid PRIVATE_KEY without quotes

**"Insufficient funds"**
→ Need ETH for gas on Sepolia testnet

**Contracts not deployed**
→ Run `npm run deploy` and update `config.js`

## 🎯 What to Demo

1. Connect wallet
2. Subscribe with MNEE (shows paywall)
3. Interact with AI Agent
4. Stake MNEE tokens
5. Show automated rewards

---

Ready to build? Start with `npm install`! 🚀
