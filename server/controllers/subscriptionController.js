const Subscription = require('../models/Subscription');

exports.getAll = async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user.id });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const sub = await Subscription.create({ ...req.body, userId: req.user.id });
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const sub = await Subscription.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!sub) return res.status(404).json({ message: 'Not found' });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const sub = await Subscription.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!sub) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 