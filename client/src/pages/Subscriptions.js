import { useEffect, useState } from 'react';
import API from '../utils/api';
import SubscriptionCard from '../components/SubscriptionCard';

function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(() => {
    API.get('/subscriptions').then(res => setSubs(res.data));
  }, []);
  const filtered = subs.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (!filter || s.category === filter)
  );
  const handleDelete = async (id) => {
    await API.delete(`/subscriptions/${id}`);
    setSubs(subs.filter(s => s._id !== id));
  };
  return (
    <div>
      <h2>Subscriptions</h2>
      <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">All Categories</option>
        {[...new Set(subs.map(s => s.category))].map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <div>
        {filtered.map(sub => <SubscriptionCard key={sub._id} sub={sub} onEdit={() => {}} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}
export default Subscriptions; 