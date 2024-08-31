import express from "express";

import { protect, authorize } from "../middlewares/authMiddleware.js";
import { createManager, getAllManagers } from "../controllers/teamController.js";
import { getAllTournaments } from "../controllers/tournamentController.js";
import { createSuperAdmin, updateAdmin, updateAdminById } from "../controllers/authenticationController.js";
import upload from "../middlewares/multerMiddleWare.js";
const router = express.Router();
router.post(
  "/register-manager",
  protect,
  authorize("superadmin"),
  createManager
);
router.get("/managers", protect, authorize('superadmin'), getAllManagers)

router.post("/create-admin", createSuperAdmin);
router.put("/me",protect, authorize("superadmin"),upload.single("avatar"),updateAdmin)
router.put(":/id",protect,authorize("superadmin"),upload.single("avatar"),updateAdminById)

export default router;
