import mongoose from "mongoose";

const squadSchema = new mongoose.Schema({
  member: [{ type: mongoose.Schema.Types.ObjectId, ref: "officials" }],
  tournamentID: { type: mongoose.Schema.Types.ObjectId, ref: "tournament", required: true }
}, { timestamps: true });

const Squad = mongoose.model("squad", squadSchema);
export default Squad;
