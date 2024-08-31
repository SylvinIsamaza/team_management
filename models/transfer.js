import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    playerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "officials",
      required: true,
    },
    fromTeamID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    toTeamID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    transferDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Completed", "Pending","Rejected"],
      default:"Pending"
    },
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", transferSchema);
export default Transfer;
