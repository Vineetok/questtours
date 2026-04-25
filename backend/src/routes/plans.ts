import { Router } from 'express';
import { getPlans } from '../controllers/adminController';

const router = Router();

// @route   GET api/plans
// @desc    Get all plans
// @access  Public
router.get('/', getPlans);

export default router;
