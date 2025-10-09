import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACT_ADDRESSES, PLATFORM_ABI, MUSD_ABI } from '../utils/contracts';

function LenderDashboard() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  
  const [contributionAmount, setContributionAmount] = useState('');

  // Read MUSD balance
  const { data: musdBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.MUSD,
    abi: MUSD_ABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: isConnected && !!address,
  });

  // Read lender stats
  const { data: lenderStats } = useReadContract({
    address: CONTRACT_ADDRESSES.StudentLoanPlatform,
    abi: PLATFORM_ABI,
    functionName: 'getLenderStats',
    args: [address],
    enabled: isConnected && !!address,
  });

  const handleContributeToPool = async () => {
    try {
      // First approve MUSD
      await writeContract({
        address: CONTRACT_ADDRESSES.MUSD,
        abi: MUSD_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.StudentLoanPlatform, parseEther(contributionAmount)],
      });

      // Wait a bit for approval
      setTimeout(async () => {
        await writeContract({
          address: CONTRACT_ADDRESSES.StudentLoanPlatform,
          abi: PLATFORM_ABI,
          functionName: 'contributeToPool',
          args: [parseEther(contributionAmount)],
        });
        alert('Contribution successful!');
        setContributionAmount('');
      }, 2000);
    } catch (error) {
      console.error('Error contributing to pool:', error);
      alert('Failed to contribute. Check console for details.');
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to access the lender dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Lender Dashboard</h1>

        {/* Lender Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-sm text-gray-600 mb-2">MUSD Balance</div>
              <div className="text-xl font-bold text-purple-600">
                {musdBalance ? formatEther(musdBalance) : '0'} MUSD
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Total Contributed</div>
              <div className="text-xl font-bold text-gray-800">
                {lenderStats?.[0] ? formatEther(lenderStats[0]) : '0'} MUSD
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Total Earned</div>
              <div className="text-xl font-bold text-green-600">
                {lenderStats?.[1] ? formatEther(lenderStats[1]) : '0'} MUSD
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Est. APY</div>
              <div className="text-xl font-bold text-gray-800">8.5%</div>
            </div>
          </div>
        </div>

        {/* Contribution Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contribute to Lending Pool</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-6">
              Pool your MUSD to fund student loans and earn yield from interest payments.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contribution Amount (MUSD)
              </label>
              <input
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                placeholder="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <div className="text-sm text-gray-600 mt-2">
                Available: {musdBalance ? formatEther(musdBalance) : '0'} MUSD
              </div>
            </div>
            <button
              onClick={handleContributeToPool}
              disabled={!contributionAmount || parseFloat(contributionAmount) <= 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Contribute to Pool
            </button>
          </div>
        </div>

        {/* Pool Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lending Pool Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Total Pool Size</div>
              <div className="text-xl font-bold text-gray-800">0 MUSD</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Total Lent Out</div>
              <div className="text-xl font-bold text-gray-800">0 MUSD</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Available to Lend</div>
              <div className="text-xl font-bold text-gray-800">0 MUSD</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-sm text-gray-600 mb-2">Active Loans</div>
              <div className="text-xl font-bold text-gray-800">0</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How Lending Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Earn Yield</h3>
              <p className="text-sm text-gray-600">
                Contribute MUSD to the lending pool and earn interest from student loan repayments.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Collateralized</h3>
              <p className="text-sm text-gray-600">
                All loans are over-collateralized at 150% to protect lender funds.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Transparent</h3>
              <p className="text-sm text-gray-600">
                Track all loans, repayments, and earnings in real-time on the blockchain.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Impact</h3>
              <p className="text-sm text-gray-600">
                Help students access education while earning competitive returns.
              </p>
            </div>
          </div>
        </div>

        {/* Active Loans Being Funded */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Loans</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-center py-8">
              No active loans yet. Loans funded by the pool will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LenderDashboard;
