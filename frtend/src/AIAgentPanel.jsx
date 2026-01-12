import { useState } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { formatEther, parseEther, formatGwei } from 'viem';

// Simple mock database for local testing
const MOCK_RESPONSES = [
  { keywords: ['hello', 'hi', 'hey'], response: "Hello! I am the MNEE AI Agent. I can help you manage your wallet, check gas prices, or automate transactions." },
  { keywords: ['help', 'what can you do', 'commands'], response: "Try these commands:\n• 'Check balance'\n• 'Gas price'\n• 'Monitor status'\n• 'My address'\n• 'Sign message'\n• 'Send 0.01 ETH to 0x...'" },
  { keywords: ['subscription', 'paywall', 'cost'], response: "This is a decentralized paywall. You sign a message (or pay tokens) to unlock this AI interface. Currently running in Demo Mode (Free)." },
  { keywords: ['security', 'safe', 'private'], response: "I run entirely in your browser. I cannot access your private keys. You must approve all transactions manually in your wallet." },
  { keywords: ['mnee', 'token'], response: "MNEE is the native utility token of this ecosystem." }
]

const getMockResponse = (input) => {
  const lowerInput = input.toLowerCase()
  const match = MOCK_RESPONSES.find(item =>
    item.keywords.some(keyword => lowerInput.includes(keyword))
  )
  return match ? match.response : `I didn't understand that. Try asking for "help" to see what I can do.`
}

export default function AIAgentPanel() {
  const [prompt, setPrompt] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const runAI = async () => {
    if (!prompt) return
    const currentPrompt = prompt
    setPrompt('')
    setHistory(prev => [...prev, { role: 'user', content: currentPrompt }])
    setLoading(true)

    try {
      const lowerInput = currentPrompt.toLowerCase()

      // 1. Check Balance
      if (lowerInput.includes('balance') || lowerInput.includes('how much money')) {
        const balance = await publicClient.getBalance({ address })
        const text = `💰 Wallet Balance: ${formatEther(balance)} ETH`
        setHistory(prev => [...prev, { role: 'ai', content: text }])
      } 
      // 2. Monitor / Status
      else if (lowerInput.includes('monitor') || lowerInput.includes('status') || lowerInput.includes('activity')) {
        const blockNumber = await publicClient.getBlockNumber()
        const nonce = await publicClient.getTransactionCount({ address })
        const text = `📊 Monitoring Active:\n• Current Block: ${blockNumber}\n• Total Transactions Sent: ${nonce}\n• Network Status: Online`
        setHistory(prev => [...prev, { role: 'ai', content: text }])
      }
      // 3. Gas Price
      else if (lowerInput.includes('gas') || lowerInput.includes('fee')) {
        const gasPrice = await publicClient.getGasPrice()
        const text = `⛽ Current Gas Price: ${formatGwei(gasPrice)} Gwei`
        setHistory(prev => [...prev, { role: 'ai', content: text }])
      }
      // 4. Network Info
      else if (lowerInput.includes('network') || lowerInput.includes('chain')) {
        const chainId = await publicClient.getChainId()
        const text = `🌐 Connected to Chain ID: ${chainId} (Sepolia Testnet)`
        setHistory(prev => [...prev, { role: 'ai', content: text }])
      }
      // 5. Check Address
      else if (lowerInput.includes('address') || lowerInput.includes('who am i')) {
        const text = `📍 Connected Address: ${address}`
        setHistory(prev => [...prev, { role: 'ai', content: text }])
      }
      // 6. Sign Message
      else if (lowerInput.includes('sign') || lowerInput.includes('verify')) {
        if (!walletClient) throw new Error("Wallet signer not available.")
        setHistory(prev => [...prev, { role: 'ai', content: `✍️ Requesting signature... Please check your wallet.` }])
        const signature = await walletClient.signMessage({ message: "Verifying ownership for MNEE AI Agent" })
        setHistory(prev => [...prev, { role: 'ai', content: `✅ Signature received:\n${signature.slice(0, 20)}...${signature.slice(-20)}` }])
      }
      // 3. Automate Payment (Send)
      // Regex: "send 0.01 to 0x..."
      else if (/(?:send|pay|transfer)\s+(\d+(?:\.\d+)?)\s*(?:eth)?\s*(?:to)?\s+(0x[a-fA-F0-9]{40})/i.test(lowerInput)) {
        const match = lowerInput.match(/(?:send|pay|transfer)\s+(\d+(?:\.\d+)?)\s*(?:eth)?\s*(?:to)?\s+(0x[a-fA-F0-9]{40})/i)
        const amount = match[1]
        const toAddress = match[2]

        if (!walletClient) throw new Error("Wallet signer not available.")

        setHistory(prev => [...prev, { role: 'ai', content: `🔄 Initiating transfer of ${amount} ETH to ${toAddress}...\nPlease confirm the transaction in your wallet.` }])

        const hash = await walletClient.sendTransaction({
          account: address,
          to: toAddress,
          value: parseEther(amount)
        })

        setHistory(prev => [...prev, { role: 'ai', content: `✅ Payment Automated Successfully!\nTransaction Hash: ${hash}` }])
      }
      // 4. Fallback to Mock Data
      else {
        // Simulate API delay for natural feel
        await new Promise(resolve => setTimeout(resolve, 1000))
        const text = getMockResponse(currentPrompt)
        setHistory(prev => [...prev, { role: 'ai', content: text }])
      }
    } catch (error) {
      setHistory(prev => [...prev, { role: 'ai', content: `Error: ${error.message}` }])
    } finally {
      setLoading(false)
    }
  }

  const containerClass = "p-6 rounded-2xl border bg-slate-900/50 backdrop-blur-sm transition-all duration-300"

  return (
    <div className={`${containerClass} border-indigo-500/30 shadow-2xl shadow-indigo-900/10`}>
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">✦</span> AI Agent
            </h2>
            <p className="text-slate-400 text-sm">Powered by Local Data (Mock)</p>
        </div>
        <div className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-mono">
            UNLOCKED
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-4 max-h-96 overflow-y-auto mb-4 p-2 bg-slate-950/30 rounded-xl border border-slate-800/50">
          {history.length === 0 && !loading && (
            <div className="text-center text-slate-600 py-8 italic">
              No messages yet. Start the conversation!
            </div>
          )}
          {history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                {msg.role === 'ai' && <strong className="text-indigo-400 text-xs uppercase tracking-wider mb-1 block">AI Agent</strong>}
                <div className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-4 rounded-xl rounded-bl-none border border-slate-700 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                runAI()
            }
            }}
            placeholder="Try: 'Check gas price', 'Send 0.001 ETH to 0x...', or 'Help'"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all h-32"
        />

        <div className="flex justify-end">
            <button 
                onClick={runAI} 
                disabled={loading || !prompt}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center gap-2"
            >
                Send Message
            </button>
        </div>
      </div>
    </div>
  )
}
