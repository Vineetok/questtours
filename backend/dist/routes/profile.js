"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const profileController_1 = require("../controllers/profileController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Configure Multer for storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'));
    }
});
// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', auth_1.auth, profileController_1.getProfile);
// @route   PUT api/profile
// @desc    Update user profile
// @access  Private
router.put('/', auth_1.auth, profileController_1.updateProfile);
// @route   GET api/profile/payments
// @desc    Get current user's payments
// @access  Private
router.get('/payments', auth_1.auth, profileController_1.getPayments);
// @route   POST api/profile/avatar
// @desc    Upload user avatar
// @access  Private
router.post('/avatar', auth_1.auth, upload.single('avatar'), profileController_1.uploadAvatar);
exports.default = router;
