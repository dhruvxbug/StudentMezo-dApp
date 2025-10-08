import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACT_ADDRESSES, PLATFORM_ABI, MUSD_ABI } from '../utils/contracts';
import './LenderDashboard.css';

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
      <div className="dashboard-container">
        <div className="connect-prompt">
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet to access the lender dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Lender Dashboard</h1>

      {/* Lender Stats */}
      <div className="dashboard-section">
        <h2>Your Portfolio</h2>
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-label">MUSD Balance</div>
            <div className="stat-value">
              {musdBalance ? formatEther(musdBalance) : '0'} MUSD
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Contributed</div>
            <div className="stat-value">
              {lenderStats?.[0] ? formatEther(lenderStats[0]) : '0'} MUSD
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Earned</div>
            <div className="stat-value">
              {lenderStats?.[1] ? formatEther(lenderStats[1]) : '0'} MUSD
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Est. APY</div>
            <div className="stat-value">8.5%</div>
          </div>
        </div>
      </div>

      {/* Contribution Form */}
      <div className="dashboard-section">
        <h2>Contribute to Lending Pool</h2>
        <div className="form-card">
          <p className="form-description">
            Pool your MUSD to fund student loans and earn yield from interest payments.
          </p>
          <div className="form-group">
            <label>Contribution Amount (MUSD)</label>
            <input
              type="number"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
              placeholder="1000"
            />
            <div className="balance-info">
              Available: {musdBalance ? formatEther(musdBalance) : '0'} MUSD
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleContributeToPool}
            disabled={!contributionAmount || parseFloat(contributionAmount) <= 0}
          >
            Contribute to Pool
          </button>
        </div>
      </div>

      {/* Pool Overview */}
      <div className="dashboard-section">
        <h2>Lending Pool Overview</h2>
        <div className="pool-stats">
          <div className="pool-stat-item">
            <div className="pool-stat-label">Total Pool Size</div>
            <div className="pool-stat-value">0 MUSD</div>
          </div>
          <div className="pool-stat-item">
            <div className="pool-stat-label">Total Lent Out</div>
            <div className="pool-stat-value">0 MUSD</div>
          </div>
          <div className="pool-stat-item">
            <div className="pool-stat-label">Available to Lend</div>
            <div className="pool-stat-value">0 MUSD</div>
          </div>
          <div className="pool-stat-item">
            <div className="pool-stat-label">Active Loans</div>
            <div className="pool-stat-value">0</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="dashboard-section">
        <h2>How Lending Works</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">💰</div>
            <h3>Earn Yield</h3>
            <p>
              Contribute MUSD to the lending pool and earn interest from student loan repayments.
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">🔒</div>
            <h3>Collateralized</h3>
            <p>
              All loans are over-collateralized at 150% to protect lender funds.
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">📊</div>
            <h3>Transparent</h3>
            <p>
              Track all loans, repayments, and earnings in real-time on the blockchain.
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">🎯</div>
            <h3>Impact</h3>
            <p>
              Help students access education while earning competitive returns.
            </p>
          </div>
        </div>
      </div>

      {/* Active Loans Being Funded */}
      <div className="dashboard-section">
        <h2>Active Loans</h2>
        <div className="loans-list">
          <p className="empty-state">
            No active loans yet. Loans funded by the pool will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LenderDashboard;
