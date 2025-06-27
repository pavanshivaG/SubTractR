import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastNotifications() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}

export default ToastNotifications; 