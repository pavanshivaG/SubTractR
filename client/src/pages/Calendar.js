import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import API from '../utils/api';

function CalendarPage() {
  const [subs, setSubs] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    API.get('/subscriptions').then(res => setSubs(res.data));
  }, []);
  const due = subs.filter(s => new Date(s.renewalDate).toDateString() === date.toDateString());
  return (
    <div>
      <h2>Renewal Calendar</h2>
      <Calendar value={date} onChange={setDate} tileClassName={({ date: d }) => subs.some(s => new Date(s.renewalDate).toDateString() === d.toDateString()) ? 'highlight' : ''} />
      <h3>Services due on {date.toDateString()}</h3>
      <ul>
        {due.map(s => <li key={s._id}>{s.name} (${s.amount})</li>)}
      </ul>
      <style>{`.highlight { background: #ffc658 !important; }`}</style>
    </div>
  );
}
export default CalendarPage; 