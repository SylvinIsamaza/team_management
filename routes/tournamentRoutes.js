import express from "express";
import {
  createTournament,
  addTeamToTournament,
  allocateTeamsToGroups,
  createKnockoutStages,
  updateMatchData,
  getTournamentDetails,
  getAllTournaments,
  updateTournament,
  deleteTournamentById,
} from "../controllers/tournamentController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js  ";

const router = express.Router();

router.post("/new", protect, authorize("superadmin"), createTournament);
router.post(
  "/add-teams",
  protect,
  authorize("superadmin"),
  addTeamToTournament
);
router.post(
  "/allocate-teams",
  protect,
  authorize("superadmin"),
  allocateTeamsToGroups
);
router.post(
  "/create-knockout-stages",
  protect,
  authorize("superadmin"),
  createKnockoutStages
);
router.get("/", getAllTournaments);
router.put(
  "/update-match-data",
  protect,
  authorize("superadmin"),
  updateMatchData
);
router.get("/:id", getTournamentDetails);
router.put("/:id", protect, authorize("superadmin"), updateTournament);
router.delete("/:id",protect,authorize("superadmin"), deleteTournamentById);

export default router;
