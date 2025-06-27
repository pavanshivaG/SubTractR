import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../utils/api';
import { toast } from 'react-toastify';

function EditSubscription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  useEffect(() => {
    API.get(`/subscriptions`).then(res => {
      const sub = res.data.find(s => s._id === id);
      if (sub) setInitial(sub);
    });
  }, [id]);
  if (!initial) return <div>Loading...</div>;
  return (
    <div>
      <h2>Edit Subscription</h2>
      <Formik
        initialValues={initial}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          amount: Yup.number().required('Required'),
          category: Yup.string().required('Required'),
          frequency: Yup.string().required('Required'),
          renewalDate: Yup.date().required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await API.put(`/subscriptions/${id}`, values);
            toast.success('Subscription updated');
            navigate('/subscriptions');
          } catch (err) {
            toast.error('Failed to update');
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
          <button type="submit">Update</button>
        </Form>
      </Formik>
    </div>
  );
}
export default EditSubscription; 