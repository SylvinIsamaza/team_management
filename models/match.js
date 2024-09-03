import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  homeTeamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  awayTeamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  dateTime: { type: Date, required: true },
  venue: { type: String, required: true },
  homeTeamScore: { type: Number, required: true },
  awayTeamScore: { type: Number, required: true },
  status: {
    type: String,
    enum: ["ENDED", "ONGOING", "UPCOMING"],
    default: "UPCOMING",
  },
  startDate: {
    type: Date,
    required: true,
  },
  isPostponed: {
    type: String,
    default:false
  },
  newDate: {
    type: Date,
    default:Date.now()
  }
});

const Match = mongoose.model("Match", matchSchema);
export default Match;
