import { Router } from "express";

import { login, register } from "../controllers/auth.controller.js";

import {
  validateLoginRequest,
  validateRegisterRequest,
} from "../middlewares/validators/auth.validator.js";

import isAdmin from "../middlewares/auth/isAdmin.js";

const router = Router();

router.post("/login", validateLoginRequest, login);
router.post("/register", isAdmin, validateRegisterRequest, register);

export default router;
