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
} from "../controllers/teamController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleWare.js";

const router = express.Router();

router.post(
  "/upload-jerseys",
  protect,
  authorize("teamManager", "superadmin"),
  upload.fields(
    [
      { name: "home", maxCount: 1 },
      { name: "away", maxCount: 1 },
      { name: "third", maxCount: 1 },
    ]),
  uploadJerseys
);
// router.post("/add-player", protect, authorize("teamManager"), addPlayer);
router.put(
  "/select-jersey-number",
  protect,
  authorize("teamManager","superadmin"),
  selectJerseyNumber
);
router.post(
  "/request-transfer",
  protect,
  authorize("teamManager","superadmin"),
  requestPlayerTransfer
);
router.post("/add-official", protect, authorize("teamManager","superadmin"), addOfficial);
router.post("/add-logo", protect, authorize("teamManager","superadmin"),upload.single("logo"), addLogo);
router.post(
  "/select-squad",
  protect,
  authorize("teamManager","superadmin"), 
  selectSquadForTournament
);
router.post("/new", protect, authorize("superadmin"), upload.fields(
  [
    { name: "home", maxCount: 1 },
    { name: "away", maxCount: 1 },
    { name: "third", maxCount: 1 },
  ]), createTeam);
router.put("/verify-payment", protect, authorize("superadmin"), verifyPayment);
router.get("/", getAllTeams);
router.get(
  "/:id",
  protect,
  // authorize("teamManager", "superAdmin"),
  getTeamDetails
);

export default router;
