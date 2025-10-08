import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">StudentMezo DApp</h1>
        <p className="hero-subtitle">
          Decentralized Microloans for Education Powered by Bitcoin & Mezo
        </p>
        <p className="hero-description">
          Students deposit Bitcoin, mint MUSD, and access microloans. Peer lenders earn yield by funding education.
        </p>
        <div className="hero-actions">
          <ConnectButton />
        </div>
      </section>

      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>1. Connect Wallet</h3>
            <p>Securely connect your wallet using WalletConnect</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">₿</div>
            <h3>2. Deposit Bitcoin</h3>
            <p>Deposit Bitcoin via Mezo to mint MUSD stablecoins</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>3. Request Loans</h3>
            <p>Students request microloans for education expenses</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>4. Earn Yield</h3>
            <p>Lenders pool MUSD and earn interest from repayments</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎖️</div>
            <h3>5. Earn NFTs</h3>
            <p>Complete milestones and earn achievement NFTs</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>6. Track Progress</h3>
            <p>Monitor loans and reputation on the dashboard</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Get Started Today</h2>
        <div className="cta-buttons">
          <Link to="/student" className="cta-button primary">
            Student Dashboard
          </Link>
          <Link to="/lender" className="cta-button secondary">
            Lender Dashboard
          </Link>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">$0</div>
            <div className="stat-label">Total Loans Funded</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">Active Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">Active Lenders</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0%</div>
            <div className="stat-label">Default Rate</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
