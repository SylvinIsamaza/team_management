import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  publishBy: { type: Date, default: Date.now },
  type: {
    type: String,
    enum:["Injury","Good performance"]
  },
  tags: {
    type:[String]
  },
  coverImage: {
    type: String,
  }
  
},{timestamps:true});

export default mongoose.model("News", newsSchema);
