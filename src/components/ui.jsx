export function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function Badge({ children, tone = 'default' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Stat({ label, value, sub, tone }) {
  return (
    <Card className="stat-card">
      <p className="stat-label">{label}</p>
      <h3 className={`stat-value ${tone || ''}`}>{value}</h3>
      {sub && <p className="stat-sub">{sub}</p>}
    </Card>
  );
}

export function Progress({ value, max = 100 }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${percentage}%` }} />
    </div>
  );
}

export function Loading() {
  return <p className="loading-text">Loading data...</p>;
}

export function ErrorBox({ message }) {
  return <div className="error-box">{message}</div>;
}