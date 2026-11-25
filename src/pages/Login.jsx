import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, register } = useApp();
  const navigate = useNavigate();
  
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!form.name || !form.email || !form.password) return setError('All fields are required.');
      const res = register(form.name, form.email, form.password);
      if (res.success) navigate('/');
      else setError(res.message);
    } else {
      const res = login(form.email, form.password);
      if (res.success) navigate('/');
      else setError(res.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-main)' }}>
      <div className="card" style={{ width: '400px', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
          {isRegister ? 'Create an Account' : 'Welcome Back'}
        </h2>

        {error && <div style={{ background: 'var(--danger)', color: 'white', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full Name</label>
              <input className="input-field" type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
            </div>
          )}
          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</label>
            <input className="input-field" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
          </div>
          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password</label>
            <input className="input-field" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} 
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
          >
            {isRegister ? 'Login here' : 'Register here'}
          </span>
        </p>
      </div>
    </div>
  );
}