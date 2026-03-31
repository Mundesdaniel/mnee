import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { MNEESubscriptionAddress, MNEETokenAddress } from '../config.js';
import MNEESubscriptionABI from '../abi/MNEESubscription.json';
import ERC20ABI from '../abi/ERC20.json';
import { maxUint256, formatEther } from 'viem';
import { useEffect } from 'react';

export default function SubscriptionGate({ children }) {
    const { address } = useAccount();

    const isContractDeployed = MNEESubscriptionAddress !== "0x0000000000000000000000000000000000000000";

    // Read subscription data
    const { data: hasAccess, refetch: refetchAccess } = useReadContract({
        address: MNEESubscriptionAddress,
        abi: MNEESubscriptionABI,
        functionName: 'hasAccess',
        args: [address],
        query: { enabled: !!address && isContractDeployed },
    });

    const { data: subscriptionPrice } = useReadContract({
        address: MNEESubscriptionAddress,
        abi: MNEESubscriptionABI,
        functionName: 'price',
        query: { enabled: isContractDeployed },
    });

    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: MNEETokenAddress,
        abi: ERC20ABI,
        functionName: 'allowance',
        args: [address, MNEESubscriptionAddress],
        query: { enabled: !!address && isContractDeployed },
    });

    const { data: tokenBalance } = useReadContract({
        address: MNEETokenAddress,
        abi: ERC20ABI,
        functionName: 'balanceOf',
        args: [address],
        query: { enabled: !!address },
    });

    // Write functions
    const { data: approveHash, writeContract: approve, isPending: isApproving } = useWriteContract();
    const { data: subscribeHash, writeContract: subscribe, isPending: isSubscribing } = useWriteContract();

    const { isLoading: isConfirmingApproval, isSuccess: isConfirmedApproval } = useWaitForTransactionReceipt({ 
        hash: approveHash,
    });
    const { isLoading: isConfirmingSubscribe, isSuccess: isConfirmedSubscribe } = useWaitForTransactionReceipt({ 
        hash: subscribeHash,
    });

    useEffect(() => {
        if (isConfirmedApproval) {
            refetchAllowance();
        }
        if (isConfirmedSubscribe) {
            refetchAccess();
        }
    }, [isConfirmedApproval, isConfirmedSubscribe, refetchAllowance, refetchAccess]);

    const needsApproval = allowance !== undefined && subscriptionPrice && allowance < subscriptionPrice;
    const isProcessing = isApproving || isConfirmingApproval || isSubscribing || isConfirmingSubscribe;

    if (!address) {
        return (
            <div className="p-8 rounded-2xl border border-indigo-500/30 bg-slate-900/50 backdrop-blur-sm text-center">
                <p className="text-lg text-slate-400">👋 Connect your wallet to continue</p>
            </div>
        );
    }

    if (!isContractDeployed) {
        return (
            <div className="p-8 rounded-2xl border border-yellow-500/30 bg-slate-900/50 backdrop-blur-sm">
                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-white">⚙️ Setup Required</h3>
                    <p className="text-slate-400">The subscription contract hasn't been deployed yet.</p>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-left">
                        <p className="text-sm text-slate-300 mb-2">To deploy the contracts:</p>
                        <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                            <li>Set up your <code className="bg-slate-800 px-2 py-1 rounded">.env</code> file</li>
                            <li>Run <code className="bg-slate-800 px-2 py-1 rounded">npm run deploy</code></li>
                            <li>Update <code className="bg-slate-800 px-2 py-1 rounded">src/config.js</code> with deployed addresses</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    if (hasAccess) {
        return <div>{children}</div>;
    }

    const insufficientBalance = tokenBalance !== undefined && subscriptionPrice && tokenBalance < subscriptionPrice;

    return (
        <div className="p-8 rounded-2xl border border-indigo-500/30 bg-slate-900/50 backdrop-blur-sm">
            <div className="text-center space-y-6">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-2">🔐 Subscription Required</h3>
                    <p className="text-slate-400">Unlock access to the MNEE AI Agent and Staking features</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300">Subscription Price:</span>
                        <span className="text-2xl font-bold text-indigo-400">{subscriptionPrice ? formatEther(subscriptionPrice) : '...'} MNEE</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300">Duration:</span>
                        <span className="text-xl font-semibold text-cyan-400">30 Days</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300">Your Balance:</span>
                        <span className={`text-xl font-semibold ${insufficientBalance ? 'text-red-400' : 'text-green-400'}`}>
                            {tokenBalance ? formatEther(tokenBalance) : '0'} MNEE
                        </span>
                    </div>
                </div>

                {insufficientBalance && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <p className="text-red-400 text-sm">⚠️ Insufficient MNEE balance</p>
                        <p className="text-slate-400 text-xs mt-1">
                            You need {subscriptionPrice ? formatEther(subscriptionPrice) : '...'} MNEE to subscribe
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                            MNEE Token: <code className="bg-slate-800 px-2 py-1 rounded text-xs">{MNEETokenAddress}</code>
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    {needsApproval && !insufficientBalance && (
                        <button
                            disabled={isProcessing}
                            onClick={() => approve({ 
                                address: MNEETokenAddress, 
                                abi: ERC20ABI, 
                                functionName: 'approve', 
                                args: [MNEESubscriptionAddress, maxUint256] 
                            })}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isApproving || isConfirmingApproval ? '⏳ Approving...' : '1️⃣ Approve MNEE'}
                        </button>
                    )}
                    <button
                        disabled={isProcessing || needsApproval || insufficientBalance}
                        onClick={() => subscribe({ 
                            address: MNEESubscriptionAddress, 
                            abi: MNEESubscriptionABI, 
                            functionName: 'subscribe' 
                        })}
                        className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-lg transition-all disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                    >
                        {isSubscribing || isConfirmingSubscribe ? '⏳ Processing...' : needsApproval ? '2️⃣ Subscribe with MNEE' : '🚀 Subscribe with MNEE'}
                    </button>
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                    <p>💡 This is a decentralized paywall demonstrating Commerce & Creator Tools</p>
                    <p>🔒 All payments are processed on-chain using MNEE stablecoin</p>
                    <p>🌐 MNEE Contract: <code className="bg-slate-800 px-2 py-1 rounded">{MNEETokenAddress}</code></p>
                </div>
            </div>
        </div>
    );
}
