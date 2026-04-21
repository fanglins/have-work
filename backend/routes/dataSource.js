const express = require('express');
const router = express.Router();
const { 
  getDataSourceList, 
  addDataSource, 
  updateDataSource, 
  deleteDataSource, 
  syncDataSource 
} = require('../controllers/dataSourceController');
const auth = require('../middleware/auth');

router.get('/', auth, getDataSourceList);
router.post('/', auth, addDataSource);
router.put('/:id', auth, updateDataSource);
router.delete('/:id', auth, deleteDataSource);
router.post('/:id/sync', auth, syncDataSource);

module.exports = router;