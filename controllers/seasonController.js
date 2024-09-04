import Season from '../models/season.js';
import Tournament from '../models/tournament.js';


export const createSeason = async (req, res, next) => {
  const { name, year, tournaments } = req.body;

  try {
    const season = new Season({ name, year, tournaments });
    await season.save();
    res.status(201).json(season);
  } catch (error) {
    next(error);
  }
};
export const getAllSeasons = async (req, res, next) => {
  try {
    const seasons = await Season.find().populate('tournaments');
    res.status(200).json(seasons);
  } catch (error) {
    next(error);
  }
};

export const getSeasonById = async (req, res, next) => {
  try {
    const season = await Season.findById(req.params.id).populate('tournaments');
    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }
    res.status(200).json(season);
  } catch (error) {
    next(error);
  }
};

// Update a season
export const updateSeason = async (req, res, next) => {
  try {
    const { name, year, tournaments } = req.body;
    const season = await Season.findByIdAndUpdate(
      req.params.id,
      { name, year, tournaments },
      { new: true }
    ).populate('tournaments');

    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }
    res.status(200).json(season);
  } catch (error) {
    next(error);
  }
};

// Delete a season
export const deleteSeason = async (req, res, next) => {
  try {
    const season = await Season.findByIdAndDelete(req.params.id);
    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }
    res.status(200).json({ message: 'Season deleted successfully' });
  } catch (error) {
    next(error);
  }
};
