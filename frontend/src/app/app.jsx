import { Routes, Route } from 'react-router-dom';
import HomePage from '../views/HomePage';
import StudentDashboard from '../views/StudentDashboard';
import LenderDashboard from '../views/LenderDashboard';
import Navbar from '../components/Navbar';
import FooterMerlin from "../components/mvpblocks/footer-merlin";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className='pt-12'>
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
