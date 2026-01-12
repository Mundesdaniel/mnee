import WalletConnect from './components/WalletConnect'
import SubscriptionGate from './components/SubscriptionGate'
import AIAgentPanel from './components/AIAgentPanel'
import StakingPanel from './components/StakingPanel'
import { MNEETokenAddress } from './config'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">💰</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            MNEE Smart Access
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Programmable Money for AI Agents, Commerce, and Automated Finance
          </p>
          <div className="flex justify-center gap-4 text-sm text-slate-500">
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">🤖 AI Payments</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">💳 Creator Tools</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700">⚡ Financial Automation</span>
          </div>
        </header>

        <div className="flex justify-center">
          <WalletConnect />
        </div>

        <main>
          <SubscriptionGate>
            {/* This content is only visible to subscribers */}
            <div className="space-y-8 mt-8">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-green-400 font-semibold">✅ Subscription Active</p>
                <p className="text-slate-400 text-sm mt-1">You have full access to all features</p>
              </div>
              <AIAgentPanel />
              <StakingPanel />
            </div>
          </SubscriptionGate>
        </main>

        <footer className="text-center text-slate-600 text-sm pt-8 border-t border-slate-800">
          <p>Built for MNEE Hackathon 2025</p>
          <p className="text-xs mt-2">MNEE Token: {MNEETokenAddress}</p>
        </footer>
      </div>
    </div>
  )
}
