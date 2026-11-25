import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme & Data
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('tx_data')) || []);
  const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('categories')) || [
    { id: '1', name: 'Housing', type: 'Need', budget: 500 },
    { id: '2', name: 'Food', type: 'Need', budget: 300 },
  ]);
  const [paymentMethods, setPaymentMethods] = useState(() => JSON.parse(localStorage.getItem('methods')) || ['BNP Bank', 'Cash', 'Credit Card']);
  const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('settings')) || {
    salary: 5000, warningThreshold: 85, savingsTarget: 15, currency: '$'
  });

  // Auth State
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('current_user')) || null);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => localStorage.setItem('tx_data', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('methods', JSON.stringify(paymentMethods)), [paymentMethods]);
  useEffect(() => localStorage.setItem('settings', JSON.stringify(settings)), [settings]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // --- AUTH FUNCTIONS ---
  // Note: Storing plain text passwords in localStorage is NOT secure.
  // This is purely for demonstration in a frontend-only project.
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('app_users')) || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('current_user', JSON.stringify(found));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('app_users')) || [];
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }
    
    const newUser = { id: Date.now().toString(), name, email, password, avatar: '👦' };
    const updatedUsers = [...users, newUser];
    
    localStorage.setItem('app_users', JSON.stringify(updatedUsers));
    setUser(newUser);
    localStorage.setItem('current_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  const updateProfile = (updatedData) => {
    // Update current user
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('current_user', JSON.stringify(updatedUser));

    // Update in the "database"
    const users = JSON.parse(localStorage.getItem('app_users')) || [];
    const newUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('app_users', JSON.stringify(newUsers));
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      transactions, setTransactions,
      categories, setCategories,
      paymentMethods, setPaymentMethods,
      settings, setSettings,
      user, login, register, logout, updateProfile // Export auth
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);