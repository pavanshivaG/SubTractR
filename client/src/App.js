import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import AddSubscription from './pages/AddSubscription';
import EditSubscription from './pages/EditSubscription';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import ToastNotifications from './components/ToastNotifications';
import { getToken } from './utils/auth';

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <ToastNotifications />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/subscriptions" element={<PrivateRoute><Subscriptions /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddSubscription /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditSubscription /></PrivateRoute>} />
        <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
