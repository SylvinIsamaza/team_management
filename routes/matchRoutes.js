const express = require("express");
const {
  createMatch,
  updateMatchScore,
  recordMatchStatistics,
  getMatchStatistics,
} = require("../controllers/matchController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", protect, authorize("superAdmin"), createMatch);
router.put(
  "/update-score",
  protect,
  authorize("superAdmin", "teamManager"),
  updateMatchScore
);
router.post(
  "/statistics",
  protect,
  authorize("teamManager"),
  recordMatchStatistics
);
router.get(
  "/statistics/:matchId",
  protect,
  authorize("teamManager", "superAdmin"),
  getMatchStatistics
);

export default router;
