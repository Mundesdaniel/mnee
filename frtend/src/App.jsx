
import WalletConnect from './components/WalletConnect'
import SubscriptionGate from './components/SubscriptionGate'
import AIAgentPanel from './components/AIAgentPanel'
import StakingPanel from './components/StakingPanel'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            MNEE Smart Access & Staking Paywall
          </h1>
          <p className="text-slate-400 text-lg">
            A programmable-payments platform for the new generation of AI and creators.
          </p>
        </header>

        <div className="flex justify-center">
          <WalletConnect />
        </div>

        <main>
          <SubscriptionGate>
            {/* This content is only visible to subscribers */}
            <div className="space-y-8 mt-8">
              <AIAgentPanel />
              <StakingPanel />
            </div>
          </SubscriptionGate>
        </main>
      </div>
    </div>
  )
}
