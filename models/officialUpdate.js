import mongoose from "mongoose";

const officialUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  publishBy: { type: Date, default: Date.now },
  type: {
    type: String,
    enum:["Injury","Good performance"]
  },
  date: {
    type: Date,
    default:Date.now
  }
 
  
},{timestamps:true});

export default mongoose.model("OfficialUpdate", officialUpdateSchema);
