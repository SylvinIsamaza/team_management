import mongoose from "mongoose";

const tournamentStandingsSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tournament",
    required: true,
  },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "team", required: true },
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
  yellowCards: {
    type: Number,
    default: 0,
  },
  cleansheet: {
    type: Number,
    default: 0,
  },
  redCards: {
    type: Number,
    default: 0,
  },
  playedMatches: { type: Number, required: true },
  wonMatches: { type: Number, required: true },
  drawnMatches: { type: Number, required: true },
  lostMatches: { type: Number, required: true },
  goalsFor: { type: Number, required: true },
  goalsAgainst: { type: Number, required: true },
  goalDifference: { type: Number, required: true },
  points: { type: Number, required: true },
});

const TournamentStandings = mongoose.model(
  "Standing",
  tournamentStandingsSchema
);
export default TournamentStandings;
