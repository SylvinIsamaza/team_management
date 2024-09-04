import mongoose from "mongoose";

const squadSchema = new mongoose.Schema(
  {
    team: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "officials" }],
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tournament",
      required: true,
    },
  },
  { timestamps: true }
);

const Squad = mongoose.model("squad", squadSchema);
export default Squad;
