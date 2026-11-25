import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Expenses() {
  const { transactions, setTransactions, categories, paymentMethods } = useApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Form state
  const [form, setForm] = useState({ description: '', amount: '', category: '', type: 'expense', method: paymentMethods[0] || 'Cash' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    const newTx = { ...form, id: Date.now().toString(), date: new Date().toISOString().split('T')[0], amount: Number(form.amount) };
    setTransactions([newTx, ...transactions]);
    setForm({ description: '', amount: '', category: '', type: 'expense', method: paymentMethods[0] });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this item?')) setTransactions(transactions.filter(t => t.id !== id));
  };

  // Filter & Search
  let filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' ? true : t.type === filterType;
    return matchSearch && matchType;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // CSV Export
  const exportCSV = () => {
    const headers = 'Date,Description,Category,Type,Amount\n';
    const rows = filtered.map(t => `${t.date},${t.description},${t.category},${t.type},${t.amount}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'expenses.csv'; a.click();
  };

  return (
    <div>
      <h2 className="mb-4">Transactions</h2>
      
      <div className="card mb-4">
        <form onSubmit={handleAdd} className="flex-gap">
          <input className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <input className="input-field" type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
          <select className="input-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select className="input-field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>

      <div className="card">
        <div className="flex-between mb-4">
          <div className="flex-gap">
            <input className="input-field" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ width: '200px' }} />
            <select className="input-field" value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1); }} style={{ width: '120px' }}>
              <option value="all">All Types</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={exportCSV} style={{ background: 'var(--success)' }}>Export CSV</button>
        </div>

        <table className="data-table">
          <thead><tr><th>Date</th><th>Desc</th><th>Category</th><th>Method</th><th>Amount</th><th>Action</th></tr></thead>
          <tbody>
            {paginated.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>{t.method}</td>
                <td className={t.type === 'income' ? 'text-green' : 'text-red'}>
                  {t.type === 'income' ? '+' : '-'}${t.amount}
                </td>
                <td><button onClick={() => handleDelete(t.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination controls */}
        <div className="flex-between mt-4">
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Page {page} of {totalPages || 1}</span>
          <div className="flex-gap">
            <button className="btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
            <button className="btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}