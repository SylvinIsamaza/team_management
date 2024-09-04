import express from "express";
import {
  createTournament,
  addTeamToTournament,
  allocateTeamsToGroups,
  // updateMatchData,
  getTournamentDetails,
  getAllTournaments,
  updateTournament,
  deleteTournamentById,
} from "../controllers/tournamentController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  createTournamentMatches,
  deleteAllMatchesInTournament,
  getMatchesByTournament,
} from "../controllers/matchController.js";

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
  "/:tId/matches",
  // protect,
  // authorize("superadmin"),
  createTournamentMatches
);
router.get("/", getAllTournaments);
// router.put(
//   "/update-match-data",
//   protect,
//   authorize("superadmin"),
//   updateMatchData
// );
router.get("/:id", getTournamentDetails);
router.put("/:id", protect, authorize("superadmin"), updateTournament);
router.delete("/:id", protect, authorize("superadmin"), deleteTournamentById);
router.get("/:tournament/matches", getMatchesByTournament);
router.delete("/:tournament/matches", deleteAllMatchesInTournament);

export default router;
