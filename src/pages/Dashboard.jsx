import { useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Dashboard() {
  const { transactions, categories, settings } = useApp();

  // Simple calculation for totals
  const stats = useMemo(() => {
    let inc = 0, exp = 0;
    transactions.forEach(t => {
      if (t.type === 'income') inc += Number(t.amount);
      else exp += Number(t.amount);
    });
    return { inc, exp, bal: inc - exp };
  }, [transactions]);

  // Data for Category Pie Chart
  const catData = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + Number(t.amount);
    });
    return Object.keys(map).map(k => ({ name: k, value: map[k] }));
  }, [transactions]);

  // Data for Weekly Bar Chart (mocked for current month)
  const weeklyData = [
    { name: 'Week 1', exp: 400, inc: 1000 },
    { name: 'Week 2', exp: 300, inc: 200 },
    { name: 'Week 3', exp: 550, inc: 0 },
    { name: 'Week 4', exp: 200, inc: 500 },
  ];

  const COLORS = ['#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

  return (
    <div>
      <div className="flex-between mb-4">
        <h2>My Dashboard</h2>
        <div className="flex-gap">
          <select className="input-field" style={{ width: 'auto' }}><option>March</option></select>
          <select className="input-field" style={{ width: 'auto' }}><option>2024</option></select>
        </div>
      </div>

      <div className="kpi-row">
        <div className="card">
          <p className="kpi-title">Balance</p>
          <h3 className="kpi-value">{settings.currency}{stats.bal.toFixed(2)}</h3>
        </div>
        <div className="card">
          <p className="kpi-title">Expense</p>
          <h3 className="kpi-value text-red">{settings.currency}{stats.exp.toFixed(2)}</h3>
        </div>
        <div className="card">
          <p className="kpi-title">Income</p>
          <h3 className="kpi-value text-green">{settings.currency}{stats.inc.toFixed(2)}</h3>
        </div>
      </div>

      <div className="dash-grid">
        {/* Categories Chart */}
        <div className="card">
          <h4 className="mb-4">Categories</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={catData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {catData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Bar Chart */}
        <div className="card">
          <h4 className="mb-4">Statistics</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip />
              <Bar dataKey="exp" fill="var(--danger)" radius={[4,4,0,0]} />
              <Bar dataKey="inc" fill="var(--success)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="card col-span-2">
          <div className="flex-between mb-4">
            <h4>Recent Transactions</h4>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Description</th><th>Category</th><th>Amount</th></tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map(t => (
                <tr key={t.id}>
                  <td>{t.description}</td>
                  <td>{t.category}</td>
                  <td className={t.type === 'income' ? 'text-green' : 'text-red'}>
                    {t.type === 'income' ? '+' : '-'}{settings.currency}{t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Placeholder for Upcoming */}
        <div className="card">
          <h4 className="mb-4">Upcoming</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No upcoming bills tracked.</p>
        </div>
      </div>
    </div>
  );
}