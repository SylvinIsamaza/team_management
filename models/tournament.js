import mongoose from "mongoose";
const tournamentSchema = new mongoose.Schema(
  {
    season: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"season"
    },
    name: {
      type: String,
      required: true,
   
    },
    tournamentLogo: {
      type:String
    },
    type: {
      type: String,
      enum: [
        "Knockout",
        "League",
        "Group and Knockout"
      ]
    },
    description: {
      type: String,
      default: "No description mentioned yet...",
    },
    groups: [{
      groupName: {
        type: String
      },
      teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"team"
      }]

    }],
    sponsors: { type: String},
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    teams: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref:"team"
        
      }
   
    ],
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: {
      type: String,
      enum: [
        "upcoming",
        "ongoing",
        "finished"
      ]
      
    }
  
  },
  { timestamps: true }
);

const tournament = mongoose.model("tournament", tournamentSchema);

export default tournament;
