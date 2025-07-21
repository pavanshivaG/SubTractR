import { useEffect, useState } from 'react';
import API from '../utils/api';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FaDollarSign, FaCreditCard, FaBullseye, FaCalendarAlt } from 'react-icons/fa';
import './Dashboard.css';

const PIE_COLORS = ['#2563eb', '#a259e6', '#22c55e', '#ff8042', '#ffc658', '#e11d48'];

function Dashboard() {
  const [subs, setSubs] = useState([]);
  const [budget, setBudget] = useState(() => localStorage.getItem('budget') || '');

  useEffect(() => {
    API.get('/subscriptions').then(res => setSubs(res.data));
    // Listen for budget changes from Settings
    const onStorage = () => setBudget(localStorage.getItem('budget') || '');
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Stats
  const total = subs.reduce((sum, s) => sum + (s.amount || 0), 0);
  const activeCount = subs.length;
  // Budget Used
  const budgetNum = parseFloat(budget) || 0;
  const budgetUsed = budgetNum ? Math.round((total / budgetNum) * 100) : 0;
  // Next Payment
  const next = subs
    .filter(s => s.renewalDate)
    .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))[0];
  // Pie chart data
  const categories = [...new Set(subs.map(s => s.category))];
  const pieData = categories.map(cat => ({
    name: cat,
    value: subs.filter(s => s.category === cat).reduce((sum, s) => sum + (s.amount || 0), 0)
  }));

  const showBudgetWarning = budgetNum && budgetUsed > 100;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p className="dashboard-welcome">Welcome back! Here's your subscription overview.</p>
      {showBudgetWarning && (
        <div className="dashboard-budget-warning">
          <strong>Warning:</strong> You have exceeded your monthly budget limit!
        </div>
      )}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-header"><span>Total Monthly</span> <FaDollarSign /></div>
          <div className="card-main">${total.toFixed(2)}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-header"><span>Active Subscriptions</span> <FaCreditCard /></div>
          <div className="card-main">{activeCount}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-header"><span>Budget Used</span> <FaBullseye color="#ff6600" /></div>
          <div className="card-main">{budgetNum ? `${budgetUsed}%` : '--'}</div>
          <div className="card-bar"><div className="bar-fill" style={{width: budgetUsed + '%'}}></div></div>
        </div>
        <div className="dashboard-card">
          <div className="card-header"><span>Next Payment</span> <FaCalendarAlt color="#e11d48" /></div>
          <div className="card-main">{next ? new Date(next.renewalDate).toLocaleDateString() : '--'}</div>
          <div className="card-sub">{next ? `${next.name} - $${next.amount}` : 'No upcoming'}</div>
        </div>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-active">
          <h2>Active Subscriptions</h2>
          {subs.map((s, i) => (
            <div className="active-sub" key={s._id || i}>
              <div className="active-sub-left"><span className="sub-icon">{s.name[0]}</span><span>{s.name}</span><span className="active-sub-next">Next: {s.renewalDate ? new Date(s.renewalDate).toLocaleDateString() : '--'}</span></div>
              <div className="active-sub-amount">${s.amount?.toFixed(2)} <span>monthly</span></div>
            </div>
          ))}
        </div>
        <div className="dashboard-spending">
          <h2>Spending by Category</h2>
          <PieChart width={300} height={220}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
export default Dashboard; 