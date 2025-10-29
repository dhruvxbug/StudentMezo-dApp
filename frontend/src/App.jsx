import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import LenderDashboard from './pages/LenderDashboard';
import Navbar from './components/Navbar';
import FooterMerlin from "./components/mvpblocks/footer-merlin";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className='pt-12'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/lender" element={<LenderDashboard />} />
        </Routes>
      </main>
         <FooterMerlin />
    </div>
  );
}

export default App
