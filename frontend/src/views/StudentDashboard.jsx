import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACT_ADDRESSES, PLATFORM_ABI, MUSD_ABI, NFT_ABI } from '../utils/contracts';
import FooterMerlin from "../components/mvpblocks/footer-merlin";

function StudentDashboard() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('30');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [collateralAmount, setCollateralAmount] = useState('');

  // Read student data
  const { data: studentData } = useReadContract({
    address: CONTRACT_ADDRESSES.StudentLoanPlatform,
    abi: PLATFORM_ABI,
    functionName: 'students',
    args: [address],
    enabled: isConnected && !!address,
  });

  // Read MUSD balance
  const { data: musdBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.MUSD,
    abi: MUSD_ABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: isConnected && !!address,
  });

  // Read student loans
  const { data: studentLoans } = useReadContract({
    address: CONTRACT_ADDRESSES.StudentLoanPlatform,
    abi: PLATFORM_ABI,
    functionName: 'getStudentLoans',
    args: [address],
    enabled: isConnected && !!address,
  });

  // Read NFT achievements
  const { data: achievements } = useReadContract({
    address: CONTRACT_ADDRESSES.StudentLoanNFT,
    abi: NFT_ABI,
    functionName: 'getUserAchievements',
    args: [address],
    enabled: isConnected && !!address,
  });

  const handleDepositCollateral = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.StudentLoanPlatform,
        abi: PLATFORM_ABI,
        functionName: 'depositCollateralAndMintMUSD',
        value: parseEther(collateralAmount),
      });
      alert('Collateral deposited and MUSD minted successfully!');
      setCollateralAmount('');
    } catch (error) {
      console.error('Error depositing collateral:', error);
      alert('Failed to deposit collateral. Check console for details.');
    }
  };

  const handleRequestLoan = async () => {
    try {
      const durationInSeconds = parseInt(loanDuration) * 24 * 60 * 60;
      await writeContract({
        address: CONTRACT_ADDRESSES.StudentLoanPlatform,
        abi: PLATFORM_ABI,
        functionName: 'requestLoan',
        args: [parseEther(loanAmount), BigInt(durationInSeconds), loanPurpose],
      });
      alert('Loan requested successfully!');
      setLoanAmount('');
      setLoanPurpose('');
    } catch (error) {
      console.error('Error requesting loan:', error);
      alert('Failed to request loan. Check console for details.');
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-gradient-to-r from-indigo-800 via-black to-indigo-800 rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-gray-200">Please connect your wallet to access the student dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 to-black bg-clip-text text-transparent mb-8">Student Dashboard</h1>

        {/* Student Status */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Your Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-6">
              <div className="text-sm text-gray-600 mb-2">MUSD Balance</div>
              <div className="text-xl font-bold text-indigo-700">
                {musdBalance ? formatEther(musdBalance) : '0'} MUSD
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Reputation Score</div>
              <div className="text-xl font-bold text-black">
                {studentData?.[3]?.toString() || '0'} / 200
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-6">
              <div className="text-sm text-gray-600 mb-2">Total Borrowed</div>
              <div className="text-xl font-bold text-black">
                {studentData?.[1] ? formatEther(studentData[1]) : '0'} MUSD
              </div>
            </div>
          </div>
        </div>

        {/* Collateral Deposit */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Deposit Bitcoin & Mint MUSD</h2>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-6">
            <p className="text-gray-600 mb-6">
              Deposit Bitcoin as collateral via Mezo to mint MUSD stablecoins for your education loans.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bitcoin Amount (BTC)
              </label>
              <input
                type="number"
                step="0.001"
                value={collateralAmount}
                onChange={(e) => setCollateralAmount(e.target.value)}
                placeholder="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleDepositCollateral}
              disabled={!collateralAmount || parseFloat(collateralAmount) <= 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-800 via-black to-indigo-800 text-white font-medium rounded-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Deposit Bitcoin & Mint MUSD
            </button>
          </div>
        </div>

        {/* Loan Request */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Request a Loan</h2>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount (MUSD)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Days)
              </label>
              <select
                value={loanDuration}
                onChange={(e) => setLoanDuration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose
              </label>
              <textarea
                value={loanPurpose}
                onChange={(e) => setLoanPurpose(e.target.value)}
                placeholder="e.g., Tuition fees, textbooks, laptop..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleRequestLoan}
              disabled={!loanAmount || !loanPurpose}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-800 via-black to-indigo-800 text-white font-medium rounded-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Request Loan
            </button>
          </div>
        </div>

        {/* Active Loans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Your Loans</h2>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-6">
            {studentLoans && studentLoans.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Loan ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentLoans.map((loanId) => (
                      <tr key={loanId.toString()} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">#{loanId.toString()}</td>
                        <td className="py-3 px-4">Loading...</td>
                        <td className="py-3 px-4">Loading...</td>
                        <td className="py-3 px-4">
                          <button className="px-4 py-2 bg-gradient-to-r from-indigo-700 to-black text-white text-sm rounded-lg hover:shadow-lg transition-all">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No loans yet. Request your first loan above!</p>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">🎖️ Your Achievements</h2>
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-6">
            {achievements && achievements.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {achievements.map((achievementId) => (
                  <div key={achievementId.toString()} className="text-center p-4 bg-gradient-to-br from-indigo-50 to-gray-50 border border-indigo-100 rounded-lg">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-sm font-medium text-gray-700">Achievement #{achievementId.toString()}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No achievements yet. Complete your first loan to earn NFTs!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
