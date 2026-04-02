<<<<<<< HEAD
**Edit a file, create a new file, and clone from Bitbucket in under 2 minutes**

When you're done, you can delete the content in this README and update the file with details for others getting started with your repository.

*We recommend that you open this README in another tab as you perform the tasks below. You can [watch our video](https://youtu.be/0ocf7u76WSo) for a full demo of all the steps in this tutorial. Open the video in a new tab to avoid leaving Bitbucket.*

---

## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: *Delete this line to make a change to the README from Bitbucket.*
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---

## Create a file

Next, you’ll add a new file to this repository.

1. Click the **New file** button at the top of the **Source** page.
2. Give the file a filename of **contributors.txt**.
3. Enter your name in the empty file space.
4. Click **Commit** and then **Commit** again in the dialog.
5. Go back to the **Source** page.

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---

## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).
=======
# MNEE Smart Access Platform

**Programmable Money for AI Agents, Commerce, and Automated Finance**

A comprehensive Web3 application built for the MNEE Hackathon that demonstrates three core tracks:
- 🤖 **AI & Agent Payments** - AI agent interface with automated payment capabilities
- 💳 **Commerce & Creator Tools** - Decentralized paywall for content monetization
- ⚡ **Financial Automation** - Staking system with automated rewards distribution

## 🎯 Project Overview

This project showcases how MNEE stablecoin enables programmable money use cases:

1. **Subscription Paywall**: Users pay MNEE tokens to unlock premium features
2. **AI Agent Interface**: Automated assistant that can execute blockchain operations
3. **Staking Platform**: Financial automation with automatic reward distribution

**MNEE Token Address**: `0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`

## 🚀 Features

### Subscription Gate
- Pay MNEE tokens for 30-day access
- Decentralized payment processing
- No intermediaries or traditional payment processors

### AI Agent Panel
- Check wallet balances and gas prices
- Monitor blockchain activity
- Execute transactions via natural language
- Sign messages for verification
- Automated payment capabilities

### Staking System
- Stake MNEE tokens to earn rewards
- Automated reward calculation
- Withdraw staked tokens anytime
- Claim accumulated rewards

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MetaMask** or compatible Web3 wallet
- **Git**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mnee-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Your wallet private key (NEVER share this!)
PRIVATE_KEY=your_private_key_here

# RPC URLs (get from Alchemy, Infura, etc.)
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Etherscan API Key (for contract verification)
ETHERSCAN_API_KEY=your_etherscan_api_key

# WalletConnect Project ID (get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### 4. Get Required API Keys

#### Alchemy (RPC Provider)
1. Go to [Alchemy](https://www.alchemy.com/)
2. Create an account
3. Create a new app for Ethereum (Mainnet and/or Sepolia)
4. Copy the API key

#### Etherscan (Contract Verification)
1. Go to [Etherscan](https://etherscan.io/)
2. Create an account
3. Generate an API key in your profile

#### WalletConnect (Wallet Integration)
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a project
3. Copy the Project ID

## 📝 Smart Contract Deployment

### Deploy to Sepolia Testnet

1. Ensure you have Sepolia ETH in your wallet (get from [Sepolia Faucet](https://sepoliafaucet.com/))

2. Compile the contracts:
```bash
npm run compile
```

3. Deploy to Sepolia:
```bash
npm run deploy
```

4. After deployment, copy the contract addresses from the console output

5. Update `src/config.js` with the deployed addresses:
```javascript
export const MNEETokenAddress = "0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF";
export const MNEESubscriptionAddress = "0xYOUR_SUBSCRIPTION_ADDRESS";
export const MNEEStakingAddress = "0xYOUR_STAKING_ADDRESS";
```

### Deploy to Mainnet

**⚠️ WARNING: Deploying to mainnet costs real money. Only do this when ready!**

```bash
npm run deploy:mainnet
```

## 🏃 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 💻 Usage Guide

### Getting MNEE Tokens

Before using the platform, you need MNEE tokens:

1. **On Sepolia Testnet**: You'll need to deploy a test MNEE token or get test MNEE from a faucet
2. **On Mainnet**: Acquire MNEE tokens at `0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`

### Using the Platform

1. **Connect Wallet**
   - Click "Connect Wallet"
   - Select your preferred wallet (MetaMask, WalletConnect, etc.)
   - Approve the connection

2. **Subscribe to Access**
   - Click "Approve MNEE" to allow the subscription contract to use your tokens
   - Click "Subscribe with MNEE" to pay for access
   - Confirm the transaction in your wallet

3. **Interact with AI Agent**
   - Try commands like "Check gas price", "What is MNEE?", "Help"
   - The agent can execute blockchain operations
   - Sign messages and verify ownership

4. **Stake MNEE Tokens**
   - Enter the amount you want to stake
   - Approve and stake your tokens
   - Earn automatic rewards
   - Withdraw or claim rewards anytime

## 🏗️ Project Structure

```
mnee-project/
├── contracts/              # Smart contracts
│   ├── MNEESubscription.sol
│   └── MNEEStaking.sol
├── scripts/               # Deployment scripts
│   └── deploy.js
├── src/
│   ├── abi/              # Contract ABIs
│   ├── components/       # React components
│   │   ├── AIAgentPanel.jsx
│   │   ├── StakingPanel.jsx
│   │   ├── SubscriptionGate.jsx
│   │   └── WalletConnect.jsx
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   ├── config.js         # Contract addresses
│   └── index.css         # Styles
├── hardhat.config.js     # Hardhat configuration
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## 🔧 Technology Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **wagmi** - React hooks for Ethereum
- **viem** - TypeScript library for Ethereum
- **RainbowKit** - Wallet connection UI

### Smart Contracts
- **Solidity** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries

### Blockchain
- **Ethereum** - Primary blockchain
- **MNEE Stablecoin** - USD-backed payment token

## 🎓 Hackathon Categories Covered

### 1. AI & Agent Payments ✅
- AI agent that can execute blockchain transactions
- Natural language interface for Web3 operations
- Automated payment processing

### 2. Commerce & Creator Tools ✅
- Decentralized subscription paywall
- MNEE token-gated content
- Creator monetization without intermediaries

### 3. Financial Automation ✅
- Automated staking rewards
- Programmable token distribution
- Smart contract-based financial workflows

## 🔐 Security Considerations

- Never commit your `.env` file
- Never share your private keys
- Always verify contract addresses
- Test thoroughly on testnet before mainnet deployment
- Audit smart contracts before production use

## 📜 Smart Contract Functions

### MNEESubscription
- `subscribe()` - Pay MNEE to get access
- `hasAccess(address)` - Check if user has active subscription
- `setPrice(uint256)` - Update subscription price (owner only)
- `withdraw()` - Withdraw collected MNEE (owner only)

### MNEEStaking
- `stake(uint256)` - Stake MNEE tokens
- `withdraw(uint256)` - Withdraw staked tokens
- `getReward()` - Claim earned rewards
- `earned(address)` - View pending rewards
- `exit()` - Withdraw all and claim rewards

## 🐛 Troubleshooting

### "Contract not deployed" error
- Ensure you've run `npm run deploy`
- Update `src/config.js` with deployed addresses
- Check you're connected to the correct network

### Transaction failing
- Ensure you have enough MNEE tokens
- Check you have enough ETH for gas fees
- Verify you've approved the contract to spend your tokens

### Can't connect wallet
- Update your WalletConnect Project ID in `.env`
- Try a different wallet provider
- Clear browser cache and reconnect

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the [MNEE documentation](https://mnee.io)
3. Open an issue in the repository

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Built for the MNEE Hackathon 2025
- MNEE Token: [https://mnee.io](https://mnee.io)
- Ethereum community and tooling providers

---

**Built with ❤️ for the MNEE Hackathon**
>>>>>>> dff43aa (Initial commit: MNEE Smart Access Platform)
