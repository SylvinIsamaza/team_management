import { Schema, model } from 'mongoose';

const goalSchema = new Schema({
  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  minute: { type: Number, required: true },
  againstTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
});

const assistSchema = new Schema({
  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  minute: { type: Number, required: true },
  toPlayerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  againstTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
});

const cardSchema = new Schema({
  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  minute: { type: Number, required: true },
  againstTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  againstPlayerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true }
});

const matchStatisticsSchema = new Schema({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  goals: [goalSchema],
  assists: [assistSchema],
  yellowCards: [cardSchema],
  redCards: [cardSchema]
});

const MatchStatistics = model('MatchStatistics', matchStatisticsSchema);
export default MatchStatistics;
