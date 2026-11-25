import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Budget() {
  const { categories, setCategories, settings, setSettings } = useApp();
  const [newCat, setNewCat] = useState('');

  const addCategory = (e) => {
    e.preventDefault();
    if (!newCat) return;
    setCategories([...categories, { id: Date.now().toString(), name: newCat, type: 'Need', budget: 0 }]);
    setNewCat('');
  };

  const updateCat = (id, field, value) => {
    setCategories(categories.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div>
      <h2 className="mb-4">Budget Settings</h2>
      
      <div className="dash-grid">
        <div className="card col-span-2">
          <h4 className="mb-4">Categories</h4>
          <form onSubmit={addCategory} className="flex-gap mb-4">
            <input className="input-field" placeholder="New Category Name" value={newCat} onChange={e => setNewCat(e.target.value)} />
            <button className="btn btn-primary" type="submit">Add</button>
          </form>
          
          <table className="data-table">
            <thead><tr><th>Name</th><th>Type (50/30/20)</th><th>Monthly Budget</th></tr></thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>
                    <select className="input-field" value={c.type} onChange={e => updateCat(c.id, 'type', e.target.value)}>
                      <option value="Need">Need</option>
                      <option value="Want">Want</option>
                      <option value="Savings">Savings</option>
                    </select>
                  </td>
                  <td>
                    <input className="input-field" type="number" value={c.budget} onChange={e => updateCat(c.id, 'budget', Number(e.target.value))} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h4 className="mb-4">Global Settings</h4>
          <div className="mb-4">
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Monthly Salary</label>
            <input className="input-field" type="number" value={settings.salary} onChange={e => setSettings({...settings, salary: Number(e.target.value)})} />
          </div>
          <div className="mb-4">
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Warning Threshold (%)</label>
            <input className="input-field" type="number" value={settings.warningThreshold} onChange={e => setSettings({...settings, warningThreshold: Number(e.target.value)})} />
          </div>
          <div className="mb-4">
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Savings Target (%)</label>
            <input className="input-field" type="number" value={settings.savingsTarget} onChange={e => setSettings({...settings, savingsTarget: Number(e.target.value)})} />
          </div>
        </div>
      </div>
    </div>
  );
}