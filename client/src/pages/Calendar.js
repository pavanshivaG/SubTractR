import { useEffect, useState } from 'react';
import API from '../utils/api';
import './Calendar.css';

function CalendarPage() {
  const [subs, setSubs] = useState([]);
  const [month] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    API.get('/subscriptions').then(res => setSubs(res.data));
  }, []);

  // Build calendar grid
  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const firstDay = new Date(year, monthIdx, 1);
  const lastDay = new Date(year, monthIdx + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const today = new Date();

  // Map renewal dates to days
  const renewals = subs.filter(s => {
    const d = new Date(s.renewalDate);
    return d.getMonth() === monthIdx && d.getFullYear() === year;
  });
  const dayMap = {};
  renewals.forEach(s => {
    const d = new Date(s.renewalDate).getDate();
    if (!dayMap[d]) dayMap[d] = [];
    dayMap[d].push(s);
  });

  // Upcoming renewals (from today)
  const upcoming = subs.filter(s => new Date(s.renewalDate) >= today)
    .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))
    .slice(0, 5);

  // Calendar grid
  const weeks = [];
  let day = 1 - startDay;
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++, day++) {
      if (day > 0 && day <= daysInMonth) {
        week.push(day);
      } else {
        week.push(null);
      }
    }
    weeks.push(week);
  }

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <div className="calendar-card">
        <div className="calendar-header-row">
          <span className="calendar-month">{month.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="calendar-grid">
          <div className="calendar-row calendar-days">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="calendar-day-label">{d}</div>)}
          </div>
          {weeks.map((week, i) => (
            <div className="calendar-row" key={i}>
              {week.map((d, j) => (
                <div key={j} className={`calendar-cell${d && dayMap[d] ? ' calendar-renewal' : ''}${d === today.getDate() && monthIdx === today.getMonth() && year === today.getFullYear() ? ' calendar-today' : ''}`}>
                  {d && <>
                    <span className="calendar-date">{d}</span>
                    {dayMap[d] && dayMap[d].map((s, idx) => (
                      <div className="calendar-renewal-badge" key={idx}>
                        <span className="calendar-renewal-name">{s.name}</span>
                        <span className="calendar-renewal-amount">${s.amount}</span>
                      </div>
                    ))}
                  </>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="calendar-upcoming">
        <h2>Upcoming Renewals</h2>
        <ul>
          {upcoming.map(s => (
            <li key={s._id} className="calendar-upcoming-item">
              <span className="calendar-upcoming-name">{s.name}</span>
              <span className="calendar-upcoming-date">{new Date(s.renewalDate).toLocaleDateString()}</span>
              <span className="calendar-upcoming-amount">${s.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default CalendarPage; 