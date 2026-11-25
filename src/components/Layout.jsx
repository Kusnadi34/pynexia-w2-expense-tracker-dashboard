import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, PieChart, CalendarDays, Target, Settings, Sun, Moon, LogOut, UserCircle } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

const menus = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/expenses', label: 'Expenses', icon: <Receipt size={20} /> },
  { path: '/income', label: 'Income', icon: <Wallet size={20} /> },
  { path: '/budget', label: 'Budget', icon: <PieChart size={20} /> },
  { path: '/weekly', label: 'Weekly', icon: <CalendarDays size={20} /> },
  { path: '/savings', label: 'Savings', icon: <Target size={20} /> },
  { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
];

export default function Layout() {
  const { theme, toggleTheme, user, logout } = useApp();

  // Protect route: if not logged in, redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="user-profile">
          <div className="avatar">{user.avatar || '👦'}</div>
          <div>
            <h4 style={{ fontSize: '1rem' }}>{user.name}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Personal Account</p>
          </div>
        </div>

        <nav className="nav-links">
          {menus.map(m => (
            <NavLink key={m.path} to={m.path} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              {m.icon} {m.label}
            </NavLink>
          ))}
          
          {/* Profile Link */}
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <UserCircle size={20} /> Account Profile
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ cursor: 'pointer' }} className="flex-gap" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          
          <div style={{ cursor: 'pointer', color: 'var(--danger)' }} className="flex-gap" onClick={() => { logout(); }}>
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}