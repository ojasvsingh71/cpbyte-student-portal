import express from "express";
import { allAttendance, markAttendance, memberOfDomain } from "../controllers/coordinator.controller.js";
import isCoordinator from "../middlewares/auth/isCoordinator.js";

const router = express.Router();

router.get("/attendance",isCoordinator, allAttendance);
router.post("/markAttendance",isCoordinator, markAttendance);
router.get("/memberOfDomain",isCoordinator, memberOfDomain);

export default router;