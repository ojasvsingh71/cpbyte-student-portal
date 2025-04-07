import express from 'express';
import { deleteUser, editUserProfile } from '../controllers/admin.controller.js';
import isAdmin from '../middlewares/auth/isAdmin.js';

const router = express.Router();

router.post('/editUserProfile',isAdmin, editUserProfile);

router.delete('/deleteUser',isAdmin, deleteUser);


export default router;