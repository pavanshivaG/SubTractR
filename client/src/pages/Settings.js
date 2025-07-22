import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './Settings.css';

function Settings() {
  const [budget, setBudget] = useState(() => localStorage.getItem('budget') || '');
  const [currency, setCurrency] = useState('USD ($)');
  const [emailReminders, setEmailReminders] = useState(true);
  const [reminderDays] = useState('3');
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('budget', budget);
    localStorage.setItem('currency', currency);
    localStorage.setItem('darkMode', dark);
    document.body.classList.toggle('dark-mode', dark);
  }, [budget, currency, dark]);

  // Save settings (local only)
  const handleSave = () => {
    toast.success('Settings saved');
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-grid">
        <div className="settings-card">
          <h2>Budget Settings</h2>
          <label>Monthly Budget Limit</label>
          <input className="settings-input" value={budget} onChange={e => setBudget(e.target.value)} placeholder="500" />
          <label>Currency</label>
          <select className="settings-input" value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="USD ($)">USD ($)</option>
          </select>
        </div>
        <div className="settings-card">
          <h2>Notification Settings</h2>
          <div className="settings-switch-row">
            <span>Email Reminders</span>
            <label className="switch">
              <input type="checkbox" checked={emailReminders} onChange={e => setEmailReminders(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>
          <label>Reminder Days Before Renewal</label>
          <select className="settings-input" value={reminderDays} disabled>
            <option value="3">3 days</option>
          </select>
        </div>
        <div className="settings-card">
          <h2>Appearance</h2>
          <div className="settings-switch-row">
            <span>Dark Mode</span>
            <label className="switch">
              <input type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)} />
              <span className="slider round"></span>
            </label>
            <span className="settings-note">Toggle dark theme</span>
          </div>
        </div>
        <div className="settings-card">
          <h2>Account</h2>
          <button className="settings-btn">Change Password</button>
          <button className="settings-btn">Export Data</button>
          <button className="settings-btn settings-delete">Delete Account</button>
        </div>
      </div>
      <div className="settings-actions">
        <button className="settings-save" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
}
export default Settings; 