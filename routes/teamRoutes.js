import express from "express";
import {
  uploadJerseys,
  addPlayer,
  selectJerseyNumber,
  requestPlayerTransfer,
  addOfficial,
  addLogo,
  selectSquadForTournament,
  getTeamDetails,
  createTeam,
  verifyPayment,
  getAllTeams,
  deleteTeam,
  updateTeam,
} from "../controllers/teamController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleWare.js";

const router = express.Router();

router.post(
  "/upload-jerseys",
  protect,
  authorize("manager", "superadmin"),
  upload.fields([
    { name: "home", maxCount: 1 },
    { name: "away", maxCount: 1 },
    { name: "third", maxCount: 1 },
  ]),
  uploadJerseys
);
router.put(
  "/select-jersey-number",
  protect,
  authorize("manager", "superadmin"),
  selectJerseyNumber
);
router.post(
  "/request-transfer",
  protect,
  authorize("manager", "superadmin"),
  requestPlayerTransfer
);
router.post(
  "/add-official",
  protect,
  authorize("manager", "superadmin"),
  addOfficial
);
router.post(
  "/add-logo",
  protect,
  authorize("manager", "superadmin"),
  upload.single("logo"),
  addLogo
);
router.post(
  "/select-squad",
  protect,
  authorize("manager", "superadmin"),
  selectSquadForTournament
);
router.post(
  "/new",
  protect,
  authorize("superadmin"),
  upload.fields([
    { name: "home", maxCount: 1 },
    { name: "away", maxCount: 1 },
    { name: "third", maxCount: 1 },
  ]),
  createTeam
);
router.put("/verify-payment", protect, authorize("superadmin"), verifyPayment);
router.get("/", getAllTeams);
router.get(
  "/:id",
  protect,
  getTeamDetails
);

router.delete("/:id", protect, authorize("superadmin", "manager"), deleteTeam);
router.put("/:id",protect,authorize("superadmin"),updateTeam)
export default router;
