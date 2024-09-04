import mongoose from 'mongoose';

const seasonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  tournaments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tournament',
    },
  ],
});

const Season = mongoose.model('Season', seasonSchema);
export default Season;
