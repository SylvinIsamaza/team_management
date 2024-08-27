import Tournament from "../models/tournament.js";
import Team from "../models/team.js";
import Match from "../models/match.js";
import MatchStatistics from "../models/matchStatistics.js";

export async function createTournament(req, res, next) {
  const { name, type, startDate, endDate, sponsors, teams,status } = req.body;

  try {
    const newTournament = new Tournament({
      name,
      type,
      startDate,
      status,
      endDate,
      teams,
      sponsors,
    });
    newTournament.recordedBy = req.user.id;
    await newTournament.save();
    res.status(201).json({
      success: true,
      data: newTournament,
    });
  } catch (error) {
    next(error);
  }
}

export async function addTeamToTournament(req, res, next) {
  const { tournamentId, teamIds } = req.body;

  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      tournamentId,
      {
        $push: { teams: teamIds },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedTournament,
    });
  } catch (error) {
    next(error);
  }
}

export async function createMatch(req, res, next) {
  const { homeTeamId, awayTeamId, tournamentId, dateTime, venue } = req.body;

  try {
    const newMatch = new Match({
      homeTeamId,
      awayTeamId,
      tournamentId,
      dateTime,
      venue,
      homeTeamScore: 0,
      awayTeamScore: 0,
    });
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    next(error);
  }
}
// Allocate teams to groups
export const allocateTeamsToGroups = async (req, res, next) => {
  const { tournamentId, groups } = req.body; // groups is an array of objects { groupName, teamIds }

  try {
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament)
      return res.status(404).json({ message: "Tournament not found" });

    tournament.groups = groups;
    await tournament.save();

    res.status(200).json(tournament);
  } catch (error) {
    next(error);
  }
};

// Create knockout stages
export const createKnockoutStages = async (req, res, next) => {
  const { tournamentId, knockoutStages } = req.body; // knockoutStages is an array of objects { stageName, matches }

  try {
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament)
      return res.status(404).json({ message: "Tournament not found" });

    tournament.knockoutStages = knockoutStages;
    await tournament.save();

    res.status(200).json(tournament);
  } catch (error) {
    next(error);
  }
};

export const updateMatchData = async (req, res, next) => {
  const { matchId, homeTeamScore, awayTeamScore, statistics } = req.body;

  try {
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    match.homeTeamScore = homeTeamScore;
    match.awayTeamScore = awayTeamScore;
    await match.save();

    // Record match statistics
    const matchStatistics = new MatchStatistics({ matchId, ...statistics });
    await matchStatistics.save();

    res.status(200).json({ match, matchStatistics });
  } catch (error) {
    next(error);
  }
};

export const getAllTournaments = async (req, res, next) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json({
      success: true,
      data: tournaments,
    });
  } catch (error) {
    next(error);
  }
};

export const getTournamentDetails = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const tournaments = await Tournament.findById(id);

    res.status(200).json(tournaments);
  } catch (error) {
    next(error);
  }
};

export const deleteTournamentById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const tournament = await Tournament.findById(id);
    if (!tournament) {
      res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    } else {
      await Tournament.findByIdAndDelete(id);
      res
        .status(200)
        .json({ success: true, message: "Tournament successfully deleted" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateTournament = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  console.log(id);
  try {
    let tournament = await Tournament.findById(id);
    if (!tournament) {
      res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    } else {
      tournament = await Tournament.findByIdAndUpdate(id, data);
      res.status(200).json({
        success: true,
        tournament,
      });
    }
  } catch (error) {
    next(error);
  }
};
