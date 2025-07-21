import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="register-root">
      <div className="register-card">
        <h2 className="register-title">Create your account</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(6, 'Min 6 chars').required('Required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await API.post('/users/register', values);
              toast.success('Registration successful');
              navigate('/login');
            } catch (err) {
              toast.error(err.response?.data?.message || 'Registration failed');
            }
            setSubmitting(false);
          }}
        >
          {() => (
            <Form className="register-form">
              <label>Name</label>
              <Field name="name" placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" className="register-error" />
              <label>Email</label>
              <Field name="email" type="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="register-error" />
              <label>Password</label>
              <div className="register-password-row">
                <Field name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
                <button type="button" className="register-showpass-btn" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="register-error" />
              <button type="submit" className="register-btn">Register</button>
              <div className="register-login-row">
                <span>Already have an account? </span>
                <Link to="/login" className="register-login-link">Login</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default Register; 