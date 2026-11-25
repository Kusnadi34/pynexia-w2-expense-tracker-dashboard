export default function TransactionList({ data, onDelete, formatIDR }) {
  if (data.length === 0) {
    return <p className="empty-state">No transactions found.</p>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div>
      {data.map((tx) => (
        <div key={tx.id} className="t-item">
          <div className="t-info">
            <h4>{tx.desc}</h4>
            <div className="t-meta">
              <span className="t-category">{tx.category}</span>
              <span>•</span>
              <span>{tx.date ? formatDate(tx.date) : 'Just now'}</span>
            </div>
          </div>
          <div className="t-actions">
            <p className={`t-amount ${tx.type}`}>
              {tx.type === 'income' ? '+' : '-'} {formatIDR(tx.amount)}
            </p>
            <button className="btn-delete" onClick={() => onDelete(tx.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}