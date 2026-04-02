import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { MNEEStakingAddress, MNEETokenAddress } from '../config.js';
import MNEEStakingABI from '../abi/MNEEStaking.json';
import ERC20ABI from '../abi/ERC20.json';
import { parseEther, formatEther, MaxUint256 } from 'viem';

export default function StakingPanel() {
    const { address } = useAccount();
    const [stakeAmount, setStakeAmount] = useState('');

    // --- Contract Reads ---
    const { data: stakedBalance, refetch: refetchStakedBalance } = useReadContract({
        address: MNEEStakingAddress,
        abi: MNEEStakingABI,
        functionName: 'staked',
        args: [address],
        enabled: !!address,
    });

    const { data: earnedRewards, refetch: refetchEarned } = useReadContract({
        address: MNEEStakingAddress,
        abi: MNEEStakingABI,
        functionName: 'earned',
        args: [address],
        enabled: !!address,
    });

    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: MNEETokenAddress,
        abi: ERC20ABI,
        functionName: 'allowance',
        args: [address, MNEEStakingAddress],
        enabled: !!address,
    });
    
    // --- Contract Writes ---
    const { data: approveHash, writeContract: approve, isPending: isApproving } = useWriteContract();
    const { data: stakeHash, writeContract: stake, isPending: isStaking } = useWriteContract();

    const { isLoading: isConfirmingApproval, isSuccess: isConfirmedApproval } = useWaitForTransactionReceipt({ 
        hash: approveHash,
    });
    const { isLoading: isConfirmingStake, isSuccess: isConfirmedStake } = useWaitForTransactionReceipt({ 
        hash: stakeHash,
    });

    useEffect(() => {
        if (isConfirmedApproval) {
            refetchAllowance();
        }
        if (isConfirmedStake) {
            refetchStakedBalance();
            refetchEarned();
            setStakeAmount('');
        }
    }, [isConfirmedApproval, isConfirmedStake, refetchAllowance, refetchStakedBalance, refetchEarned, setStakeAmount]);

    const needsApproval = allowance !== undefined && stakeAmount && allowance < parseEther(stakeAmount || '0');
    const isProcessing = isApproving || isConfirmingApproval || isStaking || isConfirmingStake;

    return (
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-cyan-900/10">
            <h2 className="text-2xl font-bold text-white mb-4">MNEE Staking</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6 text-center">
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="text-sm text-slate-400">Staked Balance</p>
                    <p className="text-xl font-bold text-cyan-400">{stakedBalance ? formatEther(stakedBalance) : '0.0'} MNEE</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="text-sm text-slate-400">Rewards Earned</p>
                    <p className="text-xl font-bold text-cyan-400">{earnedRewards ? formatEther(earnedRewards) : '0.0'} MNEE</p>
                </div>
            </div>

            <div className="space-y-4">
                <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Amount to stake"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                />
                <div className="flex justify-end gap-4">
                    {needsApproval && (
                         <button
                            disabled={isProcessing}
                            onClick={() => approve({ address: MNEETokenAddress, abi: ERC20ABI, functionName: 'approve', args: [MNEEStakingAddress, MaxUint256] })}
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
        </div>
    );
}