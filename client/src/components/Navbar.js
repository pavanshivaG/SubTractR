import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link> |
      <Link to="/subscriptions">Subscriptions</Link> |
      <Link to="/add">Add</Link> |
      <Link to="/calendar">Calendar</Link> |
      <Link to="/settings">Settings</Link> |
      <Link to="/register">Register</Link> |
      <Link to="/login" onClick={() => localStorage.removeItem('token')}>Logout</Link>
    </nav>
  );
}

export default Navbar; 