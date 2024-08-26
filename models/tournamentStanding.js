import mongoose from "mongoose";

const tournamentStandingsSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "season",
    required: true,
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
  "TournamentStandings",
  tournamentStandingsSchema
);
export default TournamentStandings;
