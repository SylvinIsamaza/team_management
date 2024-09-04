import Favorites from '../models/favorites.js';
import Tournament from '../models/tournament.js';
import Team from '../models/team.js';
import Match from '../models/match.js';


export async function addFavorite(req, res, next) {
  const { userId, match, team, tournament } = req.body;

  try {
    let favorites = await Favorites.findOne({ userId });

    if (!favorites) {
      favorites = new Favorites({ userId });
    }

    if (match && !favorites.matches.includes(match)) {
      favorites.matches.push(match);
    }

    if (team && !favorites.teams.includes(team)) {
      favorites.teams.push(team);
    }

    if (tournament && !favorites.competitions.includes(tournament)) {
      favorites.competitions.push(tournament);
    }

    await favorites.save();

    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
}

export async function removeFavorite(req, res, next) {
  const { userId, match, team, tournament } = req.body;

  try {
    const favorites = await Favorites.findOne({ userId });

    if (!favorites) {
      return res.status(404).json({ message: 'Favorites not found' });
    }

    if (match) {
      favorites.matches = favorites.matches.filter(id => id.toString() !== match);
    }

    if (team) {
      favorites.teams = favorites.teams.filter(id => id.toString() !== team);
    }

    if (tournament) {
      favorites.competitions = favorites.competitions.filter(id => id.toString() !== tournament);
    }

    await favorites.save();

    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
}

// Get all favorites for a user
export async function getFavorites(req, res, next) {
  const { userId } = req.params;

  try {
    const favorites = await Favorites.findOne({ userId });

    if (!favorites) {
      return res.status(404).json({ message: 'Favorites not found' });
    }

    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
}
