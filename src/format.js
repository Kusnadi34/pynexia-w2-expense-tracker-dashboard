export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const MONTHS_SHORT = MONTHS.map(m => m.slice(0, 3));

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

export const num = (n) => nf.format(Number(n) || 0);
export const money = (n) => `$${nf.format(Number(n) || 0)}`;
export const pct = (n, digits = 0) => `${((Number(n) || 0) * 100).toFixed(digits)}%`;

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const fmtDate = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${Number(d)} ${MONTHS_SHORT[Number(m) - 1]} ${y}`;
};

// Colors for charts
export const CHART_COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];