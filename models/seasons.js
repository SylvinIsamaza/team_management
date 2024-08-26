import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const Season = mongoose.model("Season", seasonSchema);
export default Season;
