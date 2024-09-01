import mongoose from "mongoose";

const officialsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  description: { type: String },
  teamID: { type: mongoose.Schema.Types.ObjectId, ref: "team" },
  position: {
    type: String, required: true, enum: [
      "Owners",
        "Board of Director",
        "President/Chairman",
        "Chief Executive Officer",
        "Sporting Director",
        "Head Coach/Manager",
        "Assistant Coach",
        "Fitness Coach",
        "Condition Coach",
        "Team Doctor",
        "Equipment Manager",
        "Chief Financial Officer",
        "Event Coordinator",
        "Scouts",
        "Analyst",
        "Equipment Manager",
        "Nutritionist",
      "Goalkeeper",
      "Right Back",
      "Left Back",
      "Center Back",
      "Defensive Midfielder",
      "Central Midfielder",
      "Right Midfielder",
      "Left Midfielder",
      "Attacking Midfielder",
      "Forward/Striker"
    ]
  },
  jerseyNumber: {
    type: Number,

  },
  joinDate: {
    type: Date,
    default:Date.now
  },
  preferredFoot: { type: String },
  dateOfBirth: { type: Date },
  nationality: { type: String },
  avatar: {
    type:String
  },
  status: {
    type: String,
    enum:["Pending","Completed"]
  }
 
}, { timestamps: true });

const officials = mongoose.model("officials", officialsSchema);
export default officials;
