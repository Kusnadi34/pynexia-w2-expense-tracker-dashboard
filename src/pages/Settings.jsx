import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Settings() {
  const { paymentMethods, setPaymentMethods } = useApp();
  const [newMethod, setNewMethod] = useState('');

  const addMethod = (e) => {
    e.preventDefault();
    if (newMethod && !paymentMethods.includes(newMethod)) {
      setPaymentMethods([...paymentMethods, newMethod]);
      setNewMethod('');
    }
  };

  const removeMethod = (method) => {
    setPaymentMethods(paymentMethods.filter(m => m !== method));
  };

  return (
    <div>
      <h2 className="mb-4">Settings</h2>
      
      <div className="card" style={{ maxWidth: '500px' }}>
        <h4 className="mb-4">Payment Methods</h4>
        <form onSubmit={addMethod} className="flex-gap mb-4">
          <input className="input-field" placeholder="New method (e.g. PayPal)" value={newMethod} onChange={e => setNewMethod(e.target.value)} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {paymentMethods.map(m => (
            <li key={m} className="flex-between" style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: '8px' }}>
              <span>{m}</span>
              <button onClick={() => removeMethod(m)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}