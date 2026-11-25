import { useApp } from '../context/AppContext.jsx';

export default function Savings() {
  const { settings, transactions } = useApp();
  
  // Mock savings goal calculation
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((a, b) => a + Number(b.amount), 0);
  const targetAmount = totalIncome * (settings.savingsTarget / 100);

  return (
    <div>
      <h2 className="mb-4">Savings Goals</h2>
      <div className="card mb-4">
        <h4>Target vs Actual</h4>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Based on your {settings.savingsTarget}% target, you should save: <strong>${targetAmount.toFixed(2)}</strong>
        </p>
      </div>
      <div className="card">
        <h4>Goals</h4>
        <ul style={{ listStyle: 'none', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li className="flex-between"><span>Health Emergency Fund</span> <span className="text-green">On Track</span></li>
          <li className="flex-between"><span>New Laptop</span> <span style={{ color: 'var(--warning)' }}>Needs Attention</span></li>
        </ul>
      </div>
    </div>
  );
}