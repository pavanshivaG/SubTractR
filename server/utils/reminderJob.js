const cron = require('node-cron');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

cron.schedule('0 12 * * *', async () => {
  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const subs = await Subscription.find({
    renewalDate: { $gte: now, $lte: in3Days },
    reminder: true,
  });
  for (const sub of subs) {
    const user = await User.findById(sub.userId);
    if (!user) continue;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Upcoming renewal: ${sub.name}`,
      text: `Hope you’re enjoying your favorite content on ${sub.name}\nQuick heads-up: your subscription will renew on ${sub.renewalDate.toDateString()} for $${sub.amount}.\nIf you wish to make any changes or need to cancel, please do so before the renewal date. Thank you for using SubTractr!`,
    });
  }
}); 