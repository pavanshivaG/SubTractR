import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../utils/api';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Register</h2>
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
        <Form>
          <label>Name</label>
          <Field name="name" />
          <ErrorMessage name="name" component="div" />
          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />
          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
export default Register; 