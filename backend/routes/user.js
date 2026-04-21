const express = require('express');
const router = express.Router();
const { getUserSettings, updateUserSettings } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/settings', auth, getUserSettings);
router.put('/settings', auth, updateUserSettings);

module.exports = router;