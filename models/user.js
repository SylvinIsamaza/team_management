import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    resetPasswordLink: {
      data: { type: String, default: "" },
    },
    avatar: {
      type:String
    },
    role: {
      type: String,
      enum: [
        "superadmin",
        "manager"
      ]
    },
    status: {
      type: String,
      enum: [
        "Approved",
        "Request Approval"
      ],
      default:"Request Approval"
    },
    password: {
      type: String,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"team"
    }
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
export default user;
