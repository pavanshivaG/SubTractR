import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../utils/api';
import { toast } from 'react-toastify';
import './EditSubscription.css';

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
    <div className="editsub-container">
      <h1>Edit Subscription</h1>
      <div className="editsub-card">
        <h2 className="editsub-title">Edit Details</h2>
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
          <Form className="editsub-form">
            <div className="editsub-row">
              <div className="editsub-field">
                <label>Service Name</label>
                <Field name="name" placeholder="e.g., Netflix, Spotify" />
                <ErrorMessage name="name" component="div" className="editsub-error" />
              </div>
              <div className="editsub-field">
                <label>Amount</label>
                <Field name="amount" type="number" placeholder="0.00" />
                <ErrorMessage name="amount" component="div" className="editsub-error" />
              </div>
            </div>
            <div className="editsub-row">
              <div className="editsub-field">
                <label>Category</label>
                <Field as="select" name="category">
                  <option value="">Select category</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Music">Music</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="category" component="div" className="editsub-error" />
              </div>
              <div className="editsub-field">
                <label>Billing Frequency</label>
                <Field as="select" name="frequency">
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Weekly">Weekly</option>
                </Field>
                <ErrorMessage name="frequency" component="div" className="editsub-error" />
              </div>
            </div>
            <div className="editsub-row">
              <div className="editsub-field">
                <label>Next Renewal Date</label>
                <Field name="renewalDate" type="date" placeholder="dd-mm-yyyy" />
                <ErrorMessage name="renewalDate" component="div" className="editsub-error" />
              </div>
            </div>
            <div className="editsub-actions">
              <button type="submit" className="editsub-btn">Update Subscription</button>
              <button type="button" className="editsub-cancel" onClick={() => navigate('/subscriptions')}>Cancel</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default EditSubscription; 