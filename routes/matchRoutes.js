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
  authorize("superAdmin", "manager"),
  updateMatchScore
);
router.post(
  "/statistics",
  protect,
  authorize("manager"),
  recordMatchStatistics
);
router.get(
  "/statistics/:matchId",
  protect,
  authorize("manager", "superAdmin"),
  getMatchStatistics
);

export default router;
