import { useEffect, useState } from 'react';
import API from '../utils/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Dashboard() {
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    API.get('/subscriptions').then(res => setSubs(res.data));
  }, []);
  const total = subs.reduce((sum, s) => sum + s.amount, 0);
  const categories = [...new Set(subs.map(s => s.category))];
  const pieData = categories.map(cat => ({ name: cat, value: subs.filter(s => s.category === cat).reduce((sum, s) => sum + s.amount, 0) }));
  const barData = categories.map(cat => ({ category: cat, count: subs.filter(s => s.category === cat).length }));
  const upcoming = subs.filter(s => new Date(s.renewalDate) > new Date() && new Date(s.renewalDate) < new Date(Date.now() + 7*24*60*60*1000));
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Monthly Cost: ${total}</p>
      <PieChart width={300} height={200}>
        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#8884d8','#82ca9d','#ffc658','#ff8042'][index % 4]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <BarChart width={300} height={200} data={barData}>
        <XAxis dataKey="category" />
        <YAxis />
        <Bar dataKey="count" fill="#8884d8" />
        <Tooltip />
        <Legend />
      </BarChart>
      <h3>Upcoming Renewals (7 days)</h3>
      <ul>
        {upcoming.map(s => <li key={s._id}>{s.name} - {new Date(s.renewalDate).toLocaleDateString()}</li>)}
      </ul>
    </div>
  );
}
export default Dashboard; 