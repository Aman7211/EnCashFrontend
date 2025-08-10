import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from './pages/user/Login';
import VerifyOtp from './pages/user/VerifyOtp';
import Onboard from './pages/user/Onboard';
import UserDashboard from './pages/user/Dashboard';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* USER */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
