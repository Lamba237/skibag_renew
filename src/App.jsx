import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './page/signup';
import Login from './page/login';
import MainPage from './page/mainPage';
import HomePage from './page/home-page';
import CashPage from './page/cash';
import History from './page/history';
import Referrals from './page/referrals';
import Stats from './page/stats';
import { getCurrentUser } from './services/auth';

function ProtectedRoute({ children }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {/* Main application routes (protected) */}
      <Route path="/app" element={<ProtectedRoute><MainPage /></ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="cash" element={<CashPage />} />
        <Route path="history" element={<History />} />
        <Route path="referrals" element={<Referrals />} />
        <Route path="stats" element={<Stats />} />
      </Route>
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}