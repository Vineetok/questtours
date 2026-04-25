import { Router } from 'express';
import { getTours } from '../controllers/adminController';

const router = Router();

// @route   GET api/tours
// @desc    Get all tours
// @access  Public
router.get('/', getTours);

export default router;
