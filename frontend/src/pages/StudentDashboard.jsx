import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACT_ADDRESSES, PLATFORM_ABI, MUSD_ABI, NFT_ABI } from '../utils/contracts';
import './StudentDashboard.css';

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
      <div className="dashboard-container">
        <div className="connect-prompt">
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet to access the student dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>

      {/* Student Status */}
      <div className="dashboard-section">
        <h2>Your Status</h2>
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-label">Verification Status</div>
            <div className="stat-value">
              {studentData?.[0] ? '✅ Verified' : '❌ Not Verified'}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">MUSD Balance</div>
            <div className="stat-value">
              {musdBalance ? formatEther(musdBalance) : '0'} MUSD
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Reputation Score</div>
            <div className="stat-value">
              {studentData?.[3]?.toString() || '0'} / 200
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Borrowed</div>
            <div className="stat-value">
              {studentData?.[1] ? formatEther(studentData[1]) : '0'} MUSD
            </div>
          </div>
        </div>
      </div>

      {/* Collateral Deposit */}
      <div className="dashboard-section">
        <h2>Deposit Collateral & Mint MUSD</h2>
        <div className="form-card">
          <p className="form-description">
            Deposit ETH as collateral (simulating Bitcoin via Mezo) to mint MUSD stablecoins.
          </p>
          <div className="form-group">
            <label>Collateral Amount (ETH)</label>
            <input
              type="number"
              step="0.01"
              value={collateralAmount}
              onChange={(e) => setCollateralAmount(e.target.value)}
              placeholder="0.1"
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleDepositCollateral}
            disabled={!collateralAmount || parseFloat(collateralAmount) <= 0}
          >
            Deposit Collateral & Mint MUSD
          </button>
        </div>
      </div>

      {/* Loan Request */}
      <div className="dashboard-section">
        <h2>Request a Loan</h2>
        <div className="form-card">
          <div className="form-group">
            <label>Loan Amount (MUSD)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="1000"
            />
          </div>
          <div className="form-group">
            <label>Duration (Days)</label>
            <select value={loanDuration} onChange={(e) => setLoanDuration(e.target.value)}>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
            </select>
          </div>
          <div className="form-group">
            <label>Purpose</label>
            <textarea
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              placeholder="e.g., Tuition fees, textbooks, laptop..."
              rows="3"
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleRequestLoan}
            disabled={!loanAmount || !loanPurpose || !studentData?.[0]}
          >
            Request Loan
          </button>
          {!studentData?.[0] && (
            <p className="warning-text">⚠️ You need to be verified first to request loans.</p>
          )}
        </div>
      </div>

      {/* Active Loans */}
      <div className="dashboard-section">
        <h2>Your Loans</h2>
        <div className="loans-list">
          {studentLoans && studentLoans.length > 0 ? (
            <div className="table-container">
              <table className="loans-table">
                <thead>
                  <tr>
                    <th>Loan ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studentLoans.map((loanId) => (
                    <tr key={loanId.toString()}>
                      <td>#{loanId.toString()}</td>
                      <td>Loading...</td>
                      <td>Loading...</td>
                      <td>
                        <button className="btn btn-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-state">No loans yet. Request your first loan above!</p>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="dashboard-section">
        <h2>🎖️ Your Achievements</h2>
        <div className="achievements-grid">
          {achievements && achievements.length > 0 ? (
            achievements.map((achievementId) => (
              <div key={achievementId.toString()} className="achievement-card">
                <div className="achievement-icon">🏆</div>
                <div className="achievement-title">Achievement #{achievementId.toString()}</div>
              </div>
            ))
          ) : (
            <p className="empty-state">No achievements yet. Complete your first loan to earn NFTs!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
