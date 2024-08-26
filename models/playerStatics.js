import { Schema, model } from 'mongoose';

const playerStatisticsSchema = new Schema({
  playerId: { type: Schema.Types.ObjectId, ref: 'officials', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  goalsScored:  { type: Number, required: true },
  assists:  { type: Number, required: true },
  minutesPlayed: { type: Number, required: true },
  yellowCards: { type: Number, required: true },
  redCards:  { type: Number, required: true },
  
});

const PlayerStatistics = model('PlayerStatistics', playerStatisticsSchema);
export default PlayerStatistics;
