import mongoose, { mongo, Mongoose } from "mongoose";
const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
  
      unique:true
    },
    contact: {
      type:String
    },
    logo: {
      type:String
    },
    description: {
      type: String,
      default: "No description mentioned yet...",
    },
    foundedYear: {
      type:Number
    },
    stadium: {
      type:String
    },
    jerseys: [{
      home: {
       type:String
      } ,
      away: {
        type:String
       } ,
       third: {
         type: String,
         
      },
      goalKeeper: {
         type:String
       }
    }],
    paymentVerified: {
      type:Boolean
    },
    paymentReceipt: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"payment"
    }],
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
    squads: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"squad"
    }],
    officials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'official' }]
   
  },
  { timestamps: true }
);

const Team = mongoose.model("team", teamSchema);

export default Team;
