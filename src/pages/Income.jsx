import { useApp } from '../context/AppContext.jsx';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Income() {
  const { settings, transactions, setTransactions } = useApp();

  // Hardcode income sources for demo (in real app, fetch from state)
  const sources = ['Salary', 'Freelance', 'Investments'];

  // Helper to get amount for a specific source and month index
  const getAmount = (source, monthIdx) => {
    const tx = transactions.find(t => t.type === 'income' && t.category === source && new Date(t.date).getMonth() === monthIdx);
    return tx ? tx.amount : 0;
  };

  const fillSalary = () => {
    const newTx = [...transactions];
    for (let i = 0; i < 12; i++) {
      const exists = newTx.find(t => t.category === 'Salary' && new Date(t.date).getMonth() === i);
      if (!exists) {
        newTx.push({
          id: Date.now().toString() + i,
          description: 'Monthly Salary',
          amount: settings.salary,
          category: 'Salary',
          type: 'income',
          date: `2024-${String(i+1).padStart(2, '0')}-01`
        });
      }
    }
    setTransactions(newTx);
  };

  return (
    <div>
      <div className="flex-between mb-4">
        <h2>Income Grid</h2>
        <button className="btn btn-primary" onClick={fillSalary}>Fill Salary to All Months</button>
      </div>
      
      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Source</th>
              {MONTHS.map(m => <th key={m}>{m}</th>)}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sources.map(source => {
              let total = 0;
              return (
                <tr key={source}>
                  <td><strong>{source}</strong></td>
                  {MONTHS.map((_, i) => {
                    const amt = getAmount(source, i);
                    total += amt;
                    return <td key={i}>${amt > 0 ? amt : '-'}</td>;
                  })}
                  <td className="text-green"><strong>${total}</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}