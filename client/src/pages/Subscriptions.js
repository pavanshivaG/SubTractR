import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Subscriptions.css';

function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    API.get('/subscriptions').then(res => setSubs(res.data));
  }, []);
  const filtered = subs.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = async (id) => {
    await API.delete(`/subscriptions/${id}`);
    setSubs(subs.filter(s => s._id !== id));
  };
  return (
    <div className="subs-container">
      <div className="subs-header-row">
        <h1>Subscriptions</h1>
        <button className="subs-add-btn" onClick={() => navigate('/add')}>Add New</button>
      </div>
      <div className="subs-search-row">
        <input className="subs-search" placeholder="Search subscriptions..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="subs-list">
        {filtered.map(sub => (
          <div className="subs-card" key={sub._id}>
            <div className="subs-card-left">
              <div className="subs-avatar">{sub.name[0]}</div>
              <div>
                <div className="subs-name">{sub.name}</div>
                <div className="subs-renewal">Next renewal: {sub.renewalDate ? new Date(sub.renewalDate).toLocaleDateString() : '--'}</div>
              </div>
            </div>
            <div className="subs-card-right">
              <span className={`subs-category subs-category-${(sub.category || '').toLowerCase()}`}>{sub.category}</span>
              <div className="subs-amount">${sub.amount?.toFixed(2)}</div>
              <div className="subs-amount-label">Monthly</div>
              <button className="subs-action-btn" onClick={() => navigate(`/edit/${sub._id}`)}><FaEdit /></button>
              <button className="subs-action-btn subs-delete" onClick={() => handleDelete(sub._id)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Subscriptions; 