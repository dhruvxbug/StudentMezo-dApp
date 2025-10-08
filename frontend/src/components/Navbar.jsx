import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎓 StudentMezo
        </Link>
        <div className="navbar-menu">
          <Link to="/student" className="navbar-link">
            Student Dashboard
          </Link>
          <Link to="/lender" className="navbar-link">
            Lender Dashboard
          </Link>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
