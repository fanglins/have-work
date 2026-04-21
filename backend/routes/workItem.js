const express = require('express');
const router = express.Router();
const { 
  getWorkItemList, 
  getWorkItemDetail, 
  updateWorkItem, 
  addReminder 
} = require('../controllers/workItemController');
const auth = require('../middleware/auth');

router.get('/', auth, getWorkItemList);
router.get('/:id', auth, getWorkItemDetail);
router.put('/:id', auth, updateWorkItem);
router.post('/:id/reminders', auth, addReminder);

module.exports = router;