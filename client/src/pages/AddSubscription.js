import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../utils/api';
import { toast } from 'react-toastify';
import './AddSubscription.css';

function AddSubscription() {
  const navigate = useNavigate();
  return (
    <div className="addsub-container">
      <h1>Add Subscription</h1>
      <div className="addsub-card">
        <h2 className="addsub-title">Subscription Details</h2>
        <Formik
          initialValues={{ name: '', amount: '', category: '', frequency: '', renewalDate: '', description: '', reminder: true }}
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
          <Form className="addsub-form">
            <div className="addsub-row">
              <div className="addsub-field">
                <label>Service Name</label>
                <Field name="name" placeholder="e.g., Netflix, Spotify" />
                <ErrorMessage name="name" component="div" className="addsub-error" />
              </div>
              <div className="addsub-field">
                <label>Amount</label>
                <Field name="amount" type="number" placeholder="0.00" />
                <ErrorMessage name="amount" component="div" className="addsub-error" />
              </div>
            </div>
            <div className="addsub-row">
              <div className="addsub-field">
                <label>Category</label>
                <Field as="select" name="category">
                  <option value="">Select category</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Music">Music</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="category" component="div" className="addsub-error" />
              </div>
              <div className="addsub-field">
                <label>Billing Frequency</label>
                <Field as="select" name="frequency">
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Weekly">Weekly</option>
                </Field>
                <ErrorMessage name="frequency" component="div" className="addsub-error" />
              </div>
            </div>
            <div className="addsub-row">
              <div className="addsub-field">
                <label>Next Renewal Date</label>
                <Field name="renewalDate" type="date" placeholder="dd-mm-yyyy" />
                <ErrorMessage name="renewalDate" component="div" className="addsub-error" />
              </div>
            </div>
            <div className="addsub-row">
              <div className="addsub-field addsub-field-full">
                <label>Description (Optional)</label>
                <Field as="textarea" name="description" placeholder="Add any notes about this subscription..." />
              </div>
            </div>
            <div className="addsub-actions">
              <button type="submit" className="addsub-btn">Add Subscription</button>
              <button type="button" className="addsub-cancel" onClick={() => navigate('/subscriptions')}>Cancel</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default AddSubscription; 