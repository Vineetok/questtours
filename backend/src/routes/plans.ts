import { Router } from 'express';
import { getPlans, getPlanById } from '../controllers/adminController';

const router = Router();

// @route   GET api/plans
// @desc    Get all plans
// @access  Public
router.get('/', getPlans);

// @route   GET api/plans/:id
// @desc    Get a plan by ID
// @access  Public
router.get('/:id', getPlanById);

export default router;
