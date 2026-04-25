import { Router } from 'express';
import { getPackages } from '../controllers/adminController';

const router = Router();

// @route   GET api/packages
// @desc    Get all packages
// @access  Public
router.get('/', getPackages);

export default router;
