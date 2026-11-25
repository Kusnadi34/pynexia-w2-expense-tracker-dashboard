import { useApp } from '../context/AppContext.jsx';

export default function Weekly() {
  const { transactions } = useApp();
  
  // Calculate expense by week (Days 1-7 = Week 1, etc.)
  const weekTotals = [0, 0, 0, 0, 0]; // Max 5 weeks
  
  transactions.filter(t => t.type === 'expense').forEach(t => {
    const day = new Date(t.date).getDate();
    const weekIdx = Math.ceil(day / 7) - 1;
    if (weekIdx < 5) weekTotals[weekIdx] += Number(t.amount);
  });

  return (
    <div>
      <h2 className="mb-4">Weekly Breakdown</h2>
      <div className="kpi-row">
        {weekTotals.map((total, i) => (
          <div className="card" key={i}>
            <p className="kpi-title">Week {i + 1}</p>
            <h3 className="kpi-value text-red">${total}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}