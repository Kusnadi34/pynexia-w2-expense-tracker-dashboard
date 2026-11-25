import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Expenses from './pages/Expenses.jsx';
import Income from './pages/Income.jsx';
import Budget from './pages/Budget.jsx';
import Weekly from './pages/Weekly.jsx';
import Savings from './pages/Savings.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (wrapped by Layout) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<Income />} />
          <Route path="budget" element={<Budget />} />
          <Route path="weekly" element={<Weekly />} />
          <Route path="savings" element={<Savings />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
