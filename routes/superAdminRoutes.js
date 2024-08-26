import express from "express";

import { protect, authorize } from "../middlewares/authMiddleware.js";
import { createManager, getAllManagers } from "../controllers/teamController.js";
import { getAllTournaments } from "../controllers/tournamentController.js";
import { createSuperAdmin } from "../controllers/authenticationController.js";

const router = express.Router();
router.post(
  "/register-manager",
  protect,
  authorize("superadmin"),
  createManager
);
router.get("/managers", protect, authorize('superadmin'), getAllManagers)

router.post("/create-admin", createSuperAdmin);

export default router;
