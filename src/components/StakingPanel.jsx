import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { MNEEStakingAddress, MNEETokenAddress } from '../config.js';
import MNEEStakingABI from '../abi/MNEEStaking.json';
import ERC20ABI from '../abi/ERC20.json';
import { parseEther, formatEther, maxUint256 } from 'viem';

export default function StakingPanel() {
    const { address } = useAccount();
    const [stakeAmount, setStakeAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    // --- Contract Reads ---
    const { data: stakedBalance, refetch: refetchStakedBalance } = useReadContract({
        address: MNEEStakingAddress,
        abi: MNEEStakingABI,
        functionName: 'staked',
        args: [address],
        enabled: !!address && MNEEStakingAddress !== "0x0000000000000000000000000000000000000000",
    });

    const { data: earnedRewards, refetch: refetchEarned } = useReadContract({
        address: MNEEStakingAddress,
        abi: MNEEStakingABI,
        functionName: 'earned',
        args: [address],
        enabled: !!address && MNEEStakingAddress !== "0x0000000000000000000000000000000000000000",
    });

    const { data: tokenBalance, refetch: refetchTokenBalance } = useReadContract({
        address: MNEETokenAddress,
        abi: ERC20ABI,
        functionName: 'balanceOf',
        args: [address],
        enabled: !!address,
    });

    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: MNEETokenAddress,
        abi: ERC20ABI,
        functionName: 'allowance',
        args: [address, MNEEStakingAddress],
        enabled: !!address && MNEEStakingAddress !== "0x0000000000000000000000000000000000000000",
    });
    
    // --- Contract Writes ---
    const { data: approveHash, writeContract: approve, isPending: isApproving } = useWriteContract();
    const { data: stakeHash, writeContract: stake, isPending: isStaking } = useWriteContract();
    const { data: withdrawHash, writeContract: withdraw, isPending: isWithdrawing } = useWriteContract();
    const { data: claimHash, writeContract: claimReward, isPending: isClaiming } = useWriteContract();

    const { isLoading: isConfirmingApproval, isSuccess: isConfirmedApproval } = useWaitForTransactionReceipt({ 
        hash: approveHash,
    });
    const { isLoading: isConfirmingStake, isSuccess: isConfirmedStake } = useWaitForTransactionReceipt({ 
        hash: stakeHash,
    });
    const { isLoading: isConfirmingWithdraw, isSuccess: isConfirmedWithdraw } = useWaitForTransactionReceipt({ 
        hash: withdrawHash,
    });
    const { isLoading: isConfirmingClaim, isSuccess: isConfirmedClaim } = useWaitForTransactionReceipt({ 
        hash: claimHash,
    });

    useEffect(() => {
        if (isConfirmedApproval) {
            refetchAllowance();
        }
        if (isConfirmedStake) {
            refetchStakedBalance();
            refetchEarned();
            refetchTokenBalance();
            setStakeAmount('');
        }
        if (isConfirmedWithdraw) {
            refetchStakedBalance();
            refetchEarned();
            refetchTokenBalance();
            setWithdrawAmount('');
        }
        if (isConfirmedClaim) {
            refetchEarned();
            refetchTokenBalance();
        }
    }, [isConfirmedApproval, isConfirmedStake, isConfirmedWithdraw, isConfirmedClaim]);

    const needsApproval = allowance !== undefined && stakeAmount && allowance < parseEther(stakeAmount || '0');
    const isProcessing = isApproving || isConfirmingApproval || isStaking || isConfirmingStake || isWithdrawing || isConfirmingWithdraw || isClaiming || isConfirmingClaim;

    const isContractDeployed = MNEEStakingAddress !== "0x0000000000000000000000000000000000000000";

    if (!isContractDeployed) {
        return (
            <div className="p-6 rounded-2xl border border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-cyan-900/10">
                <h2 className="text-2xl font-bold text-white mb-4">MNEE Staking</h2>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                    <p className="text-yellow-400">⚠️ Staking contract not deployed yet</p>
                    <p className="text-slate-400 text-sm mt-2">Run <code className="bg-slate-800 px-2 py-1 rounded">npm run deploy</code> to deploy the contracts</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-cyan-900/10">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">MNEE Staking</h2>
                    <p className="text-slate-400 text-sm">Financial Automation with Rewards</p>
                </div>
                <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-mono">
                    LIVE
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="text-sm text-slate-400">Wallet Balance</p>
                    <p className="text-xl font-bold text-cyan-400">{tokenBalance ? formatEther(tokenBalance) : '0.0'} MNEE</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="text-sm text-slate-400">Staked Balance</p>
                    <p className="text-xl font-bold text-cyan-400">{stakedBalance ? formatEther(stakedBalance) : '0.0'} MNEE</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="text-sm text-slate-400">Rewards Earned</p>
                    <p className="text-xl font-bold text-green-400">{earnedRewards ? formatEther(earnedRewards) : '0.0'} MNEE</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Stake Section */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-300">Stake MNEE Tokens</label>
                    <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="Amount to stake"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    />
                    <div className="flex justify-end gap-3">
                        {needsApproval && (
                             <button
                                disabled={isProcessing}
                                onClick={() => approve({ address: MNEETokenAddress, abi: ERC20ABI, functionName: 'approve', args: [MNEEStakingAddress, maxUint256] })}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                {isApproving || isConfirmingApproval ? 'Approving...' : 'Approve'}
                            </button>
                        )}
                        <button
                            disabled={isProcessing || !stakeAmount || needsApproval}
                            onClick={() => stake({ address: MNEEStakingAddress, abi: MNEEStakingABI, functionName: 'stake', args: [parseEther(stakeAmount)] })}
                            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                        >
                            {isStaking || isConfirmingStake ? 'Staking...' : 'Stake MNEE'}
                        </button>
                    </div>
                </div>

                {/* Withdraw Section */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-300">Withdraw Staked Tokens</label>
                    <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="Amount to withdraw"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    />
                    <div className="flex justify-end">
                        <button
                            disabled={isProcessing || !withdrawAmount}
                            onClick={() => withdraw({ address: MNEEStakingAddress, abi: MNEEStakingABI, functionName: 'withdraw', args: [parseEther(withdrawAmount)] })}
                            className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg transition-all disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                        >
                            {isWithdrawing || isConfirmingWithdraw ? 'Withdrawing...' : 'Withdraw'}
                        </button>
                    </div>
                </div>

                {/* Claim Rewards */}
                <div className="flex justify-center pt-2">
                    <button
                        disabled={isProcessing || !earnedRewards || earnedRewards === 0n}
                        onClick={() => claimReward({ address: MNEEStakingAddress, abi: MNEEStakingABI, functionName: 'getReward' })}
                        className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                    >
                        {isClaiming || isConfirmingClaim ? 'Claiming...' : '🎁 Claim Rewards'}
                    </button>
                </div>
            </div>
        </div>
    );
}
