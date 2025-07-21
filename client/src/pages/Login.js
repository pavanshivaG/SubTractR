import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../utils/api';
import { setToken } from '../utils/auth';
import { toast } from 'react-toastify';
import { FaThLarge, FaChartLine, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="login-root">
      <div className="login-left">
        <div className="login-logo-row">
          <span className="login-logo-icon">S</span>
          <span className="login-logo-text">SubTractr</span>
        </div>
        <h1 className="login-title">Take control of your subscriptions</h1>
        <div className="login-feature"><FaThLarge className="login-feature-icon" /> Track all your subscriptions in one place</div>
        <div className="login-feature"><FaChartLine className="login-feature-icon" /> Get insights into your spending patterns</div>
        <div className="login-feature"><FaShieldAlt className="login-feature-icon" /> Never miss a payment with smart notifications</div>
      </div>
      <div className="login-right">
        <div className="login-card">
          <h2 className="login-welcome">Welcome back</h2>
          <p className="login-sub">Sign in to your SubTractr account</p>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email').required('Required'),
              password: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { data } = await API.post('/users/login', values);
                setToken(data.token);
                toast.success('Login successful');
                navigate('/');
              } catch (err) {
                toast.error(err.response?.data?.message || 'Login failed');
              }
              setSubmitting(false);
            }}
          >
            {({ values, handleChange }) => (
              <Form className="login-form">
                <label>Email address</label>
                <Field name="email" type="email" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="login-error" />
                <label>Password</label>
                <div className="login-password-row">
                  <Field name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
                  <button type="button" className="login-showpass-btn" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="login-error" />
                <div className="login-options-row">
                  <label className="login-remember"><Field type="checkbox" name="remember" /> Remember me</label>
                  <span className="login-forgot">Forgot password?</span>
                </div>
                <button type="submit" className="login-btn">Sign in to SubTractr</button>
                <div className="login-register-row">
                  <span>Don't have an account? </span>
                  <Link to="/register" className="login-register-link">Register</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default Login; 