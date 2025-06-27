import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../utils/api';
import { toast } from 'react-toastify';

function AddSubscription() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Add Subscription</h2>
      <Formik
        initialValues={{ name: '', amount: '', category: '', frequency: '', renewalDate: '', reminder: true }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          amount: Yup.number().required('Required'),
          category: Yup.string().required('Required'),
          frequency: Yup.string().required('Required'),
          renewalDate: Yup.date().required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await API.post('/subscriptions', values);
            toast.success('Subscription added');
            navigate('/subscriptions');
          } catch (err) {
            toast.error('Failed to add');
          }
          setSubmitting(false);
        }}
      >
        <Form>
          <label>Name</label>
          <Field name="name" />
          <ErrorMessage name="name" component="div" />
          <label>Amount</label>
          <Field name="amount" type="number" />
          <ErrorMessage name="amount" component="div" />
          <label>Category</label>
          <Field name="category" />
          <ErrorMessage name="category" component="div" />
          <label>Frequency</label>
          <Field name="frequency" />
          <ErrorMessage name="frequency" component="div" />
          <label>Renewal Date</label>
          <Field name="renewalDate" type="date" />
          <ErrorMessage name="renewalDate" component="div" />
          <label>Reminder</label>
          <Field name="reminder" type="checkbox" />
          <button type="submit">Add</button>
        </Form>
      </Formik>
    </div>
  );
}
export default AddSubscription; 