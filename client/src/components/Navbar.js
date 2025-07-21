import { Link, useLocation } from 'react-router-dom';
import { FaThLarge, FaListUl, FaPlus, FaCalendarAlt, FaCog, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <span className="logo-icon">S</span>
          <span className="logo-text">SubTractr</span>
        </div>
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}><FaThLarge /> Dashboard</Link>
          <Link to="/subscriptions" className={location.pathname === '/subscriptions' ? 'active' : ''}><FaListUl /> Subscriptions</Link>
          <Link to="/add" className={location.pathname === '/add' ? 'active' : ''}><FaPlus /> Add</Link>
          <Link to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}><FaCalendarAlt /> Calendar</Link>
        </div>
      </div>
      <div className="navbar-right">
        <span className="navbar-date"><FaCalendarAlt /> {today}</span>
        <Link to="/settings" className={location.pathname === '/settings' ? 'active navbar-icon' : 'navbar-icon'}><FaCog /></Link>
        <FaUserCircle className="navbar-icon" />
        <Link to="/login" onClick={() => localStorage.removeItem('token')} className="navbar-icon"><FaSignOutAlt /></Link>
      </div>
    </nav>
  );
}

export default Navbar; 