import mongoose from "mongoose";

const teamStatisticsSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  goalsScored: { type: Number, required: true },
  goalsConceded: { type: Number, required: true },
});

const TeamStatistics = mongoose.model("TeamStatistics", teamStatisticsSchema);
export default TeamStatistics;
