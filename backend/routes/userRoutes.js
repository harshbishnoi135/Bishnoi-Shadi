import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUsersByID,
    deleteUser,
    updateUser,
    getMyUserProfile,
    getFullUserProfile
  } from '../controllers/userControllers.js';
import { protect, admin, member } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/myprofile').get(protect, getMyUserProfile).put(protect, updateUserProfile);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile/:id').get(protect, member, getFullUserProfile);
router.route('/:id').get(protect, admin, getUsersByID).delete(protect, admin, deleteUser).put(protect, admin, updateUser);


export default router;