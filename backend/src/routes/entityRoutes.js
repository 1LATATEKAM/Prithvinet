const express = require('express');
const router = express.Router();
const { 
  getEntities, 
  getEntityById, 
  createEntity, 
  updateEntity, 
  deleteEntity 
} = require('../controllers/entityController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getEntities)
  .post(protect, authorize('Admin'), createEntity);

router.route('/:id')
  .get(protect, getEntityById)
  .put(protect, authorize('Admin'), updateEntity)
  .delete(protect, authorize('Admin'), deleteEntity);

module.exports = router;
