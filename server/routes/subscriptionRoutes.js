const express = require('express');
const router = express.Router();
const { getAll, create, update, delete: del } = require('../controllers/subscriptionController');
const auth = require('../utils/auth');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, del);

module.exports = router; 