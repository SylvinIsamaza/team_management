import Mongoose from "mongoose";

const paymentSchema = new Mongoose.Schema({
  teamID: {
    type: Mongoose.Schema.Types.ObjectId,
    ref:"team"
  },
  paidAmount: {
    type:Number,
  },
  remainingAmount: {
    type: Number,
  },
  paidBy: {
    type: Mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  type: {
    type: String,
    enum:["Annual Fee","Team participation fee"]
  }

}, { timestamps: true })

const payment = model("Payment", paymentSchema)
export default payment
