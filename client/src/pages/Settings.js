import { useState } from 'react';
function Settings() {
  const [budget, setBudget] = useState('');
  const [reminders, setReminders] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <div>
      <h2>Settings</h2>
      <label>Budget Limit</label>
      <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="$" />
      <br />
      <label>Reminders</label>
      <input type="checkbox" checked={reminders} onChange={e => setReminders(e.target.checked)} />
      <br />
      <label>Dark Mode</label>
      <input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />
    </div>
  );
}
export default Settings; 