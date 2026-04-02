# MNEE Hackathon Submission

## Project Name
**MNEE Smart Access Platform**

## Tagline
Programmable Money for AI Agents, Commerce, and Automated Finance

## Description
A comprehensive Web3 platform demonstrating three use cases of programmable money with MNEE stablecoin:
1. AI Agent with automated blockchain payments
2. Decentralized subscription paywall for creators
3. Automated staking and rewards distribution

## MNEE Token Integration
✅ **Contract Address Used**: `0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`

All payments, staking, and subscriptions use MNEE stablecoin exclusively.

## Hackathon Tracks Covered

### 🤖 AI & Agent Payments
- **Feature**: AI Agent Panel
- **Description**: Natural language interface for blockchain operations
- **Programmable Money Use**: AI agent can execute transactions, check balances, and automate payments using MNEE
- **Demo**: Users can interact with an AI that processes commands like "Check gas price" or "Send ETH" while understanding MNEE payment context

### 💳 Commerce & Creator Tools
- **Feature**: Subscription Paywall
- **Description**: Decentralized content monetization
- **Programmable Money Use**: Users pay MNEE tokens for 30-day access to premium features
- **Demo**: Token-gated access to AI agent and staking features, payment processing without intermediaries

### ⚡ Financial Automation
- **Feature**: Staking Platform
- **Description**: Automated reward distribution system
- **Programmable Money Use**: Smart contracts automatically calculate and distribute MNEE rewards to stakers
- **Demo**: Stake MNEE tokens, earn rewards automatically, withdraw anytime

## Technical Implementation

### Smart Contracts (Solidity)
1. **MNEESubscription.sol**
   - Implements time-based access control
   - Processes MNEE token payments
   - Manages subscription state

2. **MNEEStaking.sol**
   - Handles token staking and withdrawal
   - Calculates rewards automatically
   - Implements secure reward distribution

### Frontend (React + Web3)
- Modern React application with Vite
- wagmi + viem for Ethereum interactions
- RainbowKit for wallet connections
- TailwindCSS for responsive UI
- TypeScript for type safety

### Key Features
- ✅ Full MNEE token integration
- ✅ Automated payment processing
- ✅ AI-powered interface
- ✅ Staking with rewards
- ✅ Decentralized paywall
- ✅ Mobile-responsive design

## Installation & Demo

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# (Add your API keys)

# 3. Deploy contracts
npm run deploy

# 4. Update config with deployed addresses
# Edit src/config.js

# 5. Run the app
npm run dev
```

### Live Demo
[Add your deployed URL here]

### Video Demo
[Add your video URL here]

## Screenshots

1. **Landing Page**: Modern UI with wallet connection
2. **Subscription Gate**: MNEE payment interface
3. **AI Agent**: Interactive blockchain assistant
4. **Staking Dashboard**: Real-time rewards tracking

## Innovation

### What Makes This Unique
1. **Multi-Track Coverage**: One cohesive platform covering all three hackathon tracks
2. **Real MNEE Integration**: Uses actual MNEE stablecoin (0x8cce...D6cF)
3. **Production Ready**: Fully functional, deployable smart contracts
4. **User Experience**: Intuitive interface for complex Web3 operations
5. **Programmable Workflows**: Demonstrates true automated financial flows

### Technical Highlights
- Secure smart contracts using OpenZeppelin standards
- Real-time blockchain interaction
- Gas-efficient contract design
- Comprehensive error handling
- Automated reward calculations

## Future Enhancements
- AI agent integration with more blockchain operations
- Multi-token support alongside MNEE
- Advanced analytics dashboard
- Mobile app version
- Integration with more DeFi protocols

## Team
[Your name/team name]

## Repository
[Your GitHub repo URL]

## Contract Addresses

### MNEE Token (Official)
`0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF`

### Deployed Contracts
- **MNEESubscription**: [Add deployed address]
- **MNEEStaking**: [Add deployed address]
- **Network**: Ethereum Mainnet / Sepolia Testnet

## Resources
- Documentation: README.md
- Setup Guide: SETUP_GUIDE.md
- Smart Contracts: /contracts directory
- Frontend Code: /src directory

---

**Built with ❤️ for the MNEE Hackathon 2025**

This project demonstrates the full potential of programmable money through MNEE stablecoin, enabling AI agents, creators, and automated financial systems to transact seamlessly on Ethereum.
