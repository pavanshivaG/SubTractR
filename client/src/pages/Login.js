import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../utils/api';
import { setToken } from '../utils/auth';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Login</h2>
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
        <Form>
          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
export default Login; 