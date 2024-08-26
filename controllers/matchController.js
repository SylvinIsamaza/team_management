import Match from '../models/match.js';
import MatchStatistics from '../models/matchStatistics.js';

export async function createMatch(req, res,next) {
  const { homeTeamId, awayTeamId, dateTime, venue } = req.body;

  try {
    const match = new Match({ homeTeamId, awayTeamId, dateTime, venue });
    await match.save();

    res.status(201).json(match);
  } catch (error) {
   next(error)
  }
}

export async function updateMatchScore(req, res,next) {
  const { matchId, homeTeamScore, awayTeamScore } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    match.homeTeamScore = homeTeamScore;
    match.awayTeamScore = awayTeamScore;
    await match.save();

    res.status(200).json(match);
  } catch (error) {
   next(error)
  }
}

export async function recordMatchStatistics(req, res,next) {
  const { matchId, statistics } = req.body;

  try {
    const matchStatistics = new MatchStatistics({ matchId, ...statistics });
    await matchStatistics.save();

    res.status(201).json(matchStatistics);
  } catch (error) {
   next(error)
  }
}

export async function getMatchStatistics(req, res,next) {
  const { matchId } = req.params;

  try {
    const statistics = await MatchStatistics.findOne({ matchId }).populate('goals.playerId assists.playerId yellowCards.playerId redCards.playerId');
    if (!statistics) return res.status(404).json({ message: 'Statistics not found' });

    res.status(200).json(statistics);
  } catch (error) {
   next(error)
  }
}
