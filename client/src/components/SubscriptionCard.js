function SubscriptionCard({ sub, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{sub.name}</h3>
      <p>Amount: ${sub.amount}</p>
      <p>Category: {sub.category}</p>
      <p>Renewal: {new Date(sub.renewalDate).toLocaleDateString()}</p>
      <button onClick={() => onEdit(sub)}>Edit</button>
      <button onClick={() => onDelete(sub._id)}>Delete</button>
    </div>
  );
}
export default SubscriptionCard; 