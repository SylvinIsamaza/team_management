import MatchStatistics from '../models/matchStatistics.js'; 

export async function createMatchStatistics(req, res, next) {
  const { matchId, goals, assists, yellowCards, redCards } = req.body;

  try {
    const matchStatistics = new MatchStatistics({
      matchId,
      goals,
      assists,
      yellowCards,
      redCards
    });

    await matchStatistics.save();
    res.status(201).json(matchStatistics);
  } catch (error) {
    next(error);
  }
}
export async function getAllMatchStatistics(req, res, next) {
  try {
    const matchStatistics = await MatchStatistics.find()
      .populate('matchId')
      .exec();
    
    res.status(200).json(matchStatistics);
  } catch (error) {
    next(error);
  }
}
export async function getMatchStatisticsById(req, res, next) {
  const { id } = req.params;

  try {
    const matchStatistics = await MatchStatistics.findById(id)
      .populate('matchId')
      .exec();

    if (!matchStatistics) {
      return res.status(404).json({ message: 'MatchStatistics not found' });
    }

    res.status(200).json(matchStatistics);
  } catch (error) {
    next(error);
  }
}
export async function updateMatchStatistics(req, res, next) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const matchStatistics = await MatchStatistics.findByIdAndUpdate(id, updateData, { new: true })
      .populate('matchId')
      .exec();

    if (!matchStatistics) {
      return res.status(404).json({ message: 'MatchStatistics not found' });
    }

    res.status(200).json(matchStatistics);
  } catch (error) {
    next(error);
  }
}
export async function deleteMatchStatistics(req, res, next) {
  const { id } = req.params;

  try {
    const matchStatistics = await MatchStatistics.findByIdAndDelete(id);

    if (!matchStatistics) {
      return res.status(404).json({ message: 'MatchStatistics not found' });
    }

    res.status(204).json();
  } catch (error) {
    next(error);
  }
}
