const mongoose = require('mongoose');
const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  amount: Number,
  category: String,
  frequency: String,
  renewalDate: Date,
  reminder: Boolean,
});
module.exports = mongoose.model('Subscription', subscriptionSchema); 