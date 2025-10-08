import { Routes, Route } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './App.css';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import LenderDashboard from './pages/LenderDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/lender" element={<LenderDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
