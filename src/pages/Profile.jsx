import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Profile() {
  const { user, updateProfile } = useApp();
  const [form, setForm] = useState({ name: user.name, email: user.email, password: user.password, avatar: user.avatar });
  const [msg, setMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert('Name and Email cannot be empty');
    
    updateProfile(form);
    setMsg('Profile updated successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const avatars = ['👦', '👧', '🧑', '👨‍💼', '👩‍💼', '🦸‍♂️', '🦸‍♀️', '🐱', '🐶'];

  return (
    <div>
      <h2 className="mb-4">Account Settings</h2>
      
      <div className="dash-grid">
        <div className="card col-span-2">
          <h4 className="mb-4">Edit Profile</h4>
          
          {msg && <div style={{ background: 'var(--success)', color: 'white', padding: '10px', borderRadius: '6px', marginBottom: '16px' }}>{msg}</div>}
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Display Name</label>
              <input className="input-field" type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
              <input className="input-field" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password</label>
              <input className="input-field" type="text" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              <small style={{ color: 'var(--text-muted)' }}>Note: In a real app, never display passwords like this.</small>
            </div>
            
            <div>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Choose Avatar</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {avatars.map(av => (
                  <button 
                    key={av} 
                    type="button"
                    onClick={() => setForm({...form, avatar: av})}
                    style={{ 
                      fontSize: '24px', background: form.avatar === av ? 'var(--primary)' : 'var(--bg-main)', 
                      border: '1px solid var(--border)', borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer'
                    }}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '150px', marginTop: '10px' }}>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}