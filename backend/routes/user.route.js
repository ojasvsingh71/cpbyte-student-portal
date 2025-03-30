import express from 'express';
import isAuthenticated from '../middlewares/auth/isAuthenticated.js';
import { userAttendance } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/attendance',isAuthenticated, userAttendance);

export default router;