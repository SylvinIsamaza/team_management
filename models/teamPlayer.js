import mongoose from "mongoose";

const teamPlayerSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "officials",
    required: true,
  },
  seasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
  shirtNumber: { type: Number, required: true },
  contractStartDate: { type: Date, required: true },
  contractEndDate: { type: Date, required: true },
});

const TeamPlayer = mongoose.model("TeamPlayer", teamPlayerSchema);
export default TeamPlayer;
