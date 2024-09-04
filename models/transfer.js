import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "officials",
      required: true,
    },
    fromTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      required: true,
    },
    toTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
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
