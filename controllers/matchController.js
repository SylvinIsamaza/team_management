import Match from "../models/match.js";
import Tournament from "../models/tournament.js";
const createKnockoutMatches = async (tId) => {
  const tournament = await Tournament.findById(tId).populate("teams");

  if (!tournament || tournament.type !== "Knockout") {
    throw new Error("Invalid tournament or tournament type is not Knockout");
  }

  const teams = tournament.teams;
  if (teams.length % 2 !== 0) {
    throw new Error("Knockout tournaments require an even number of teams");
  }

  const matches = [];
  for (let i = 0; i < teams.length; i += 2) {
    const match = new Match({
      homeTeam: teams[i],
      awayTeam: teams[i + 1],
      tournamentId,
      dateTime: new Date(),
      venue: "Default Venue",
      status: "UPCOMING",
      homeTeamScore: 0,
      awayTeamScore: 0,
      startDate: new Date(),
    });
    matches.push(match);
  }

  await Match.insertMany(matches);
  return matches;
};

const createLeagueMatches = async (tId) => {
  const tournament = await Tournament.findById(tId).populate("teams");

  if (!tournament || tournament.type !== "League") {
    throw new Error("Invalid tournament or tournament type is not League");
  }

  const teams = tournament.teams;
  const matches = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const match = new Match({
        homeTeam: teams[i],
        awayTeam: teams[j],
        tournament:tId,
        dateTime: new Date(),
        venue: "Default Venue",
        status: "UPCOMING",
        homeTeamScore: 0,
        awayTeamScore: 0,
        startDate: new Date(),
      });
      matches.push(match);
    }
  }
  await Match.insertMany(matches);
  return matches;
};

export async function createMatch(req, res, next) {
  const { homeTeam, awayTeam, dateTime, venue, startDate } = req.body;

  try {
    const match = new Match({
      homeTeam,
      awayTeam,
      dateTime,
      venue,
      startDate,
    });
    await match.save();

    res.status(201).json({ success: true, match });
  } catch (error) {
    next(error);
  }
}
export const createTournamentMatches = async (req, res, next) => {
  try {
    const tId = req.params.tId;
    const tournament = await Tournament.findById(tId);
    const matchesinTournament = await Match.findOne({
      tournament: tId,
    });
    if (matchesinTournament == null) {
      let matches = [];
      if (tournament.type == "League") {
        matches = createLeagueMatches(tId);
      }
      if (tournament.type == "Knockout") {
        matches = createKnockoutMatches(tId);
      }
      res.json({ success: true, matches });
    } else {
      res.json({ success: false, message: "Matches already generated" });
    }
  } catch (error) {
    next(error);
  }
};

export async function getAllMatches(req, res, next) {
  try {
    const matches = await Match.find().populate("homeTeam").populate("awayTeam").populate("tournament");
    res.status(200).json({ success: true, matches });
  } catch (error) {
    next(error);
  }
}

export async function getMatchById(req, res, next) {
  const { id } = req.params;

  try {
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json({ success: true, match });
  } catch (error) {
    next(error);
  }
}

export async function updateMatch(req, res, next) {
  const { id } = req.params;
  const {
    homeTeam,
    awayTeam,
    dateTime,
    venue,
    homeTeamScore,
    awayTeamScore,
    status,
    startDate,
    isPostponed,
    newDate,
  } = req.body;

  try {
    const match = await Match.findByIdAndUpdate(
      id,
      {
        homeTeam,
        awayTeam,
        dateTime,
        venue,
        homeTeamScore,
        awayTeamScore,
        status,
        startDate,
        isPostponed,
        newDate,
      },
      { new: true, runValidators: true }
    );

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ success: true, match });
  } catch (error) {
    next(error);
  }
}

export async function deleteMatch(req, res, next) {
  const { id } = req.params;

  try {
    const match = await Match.findByIdAndDelete(id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getMatchesByTournament(req, res, next) {
  const { tournamentId } = req.params;

  try {
    const matches = await Match.find({ tournamentId })
      .populate("homeTeam awayTeam")
      .exec();

    if (!matches.length) {
      return res
        .status(404)
        .json({ message: "No matches found for this tournament" });
    }

    res.status(200).json(matches);
  } catch (error) {
    next(error);
  }
}

export const deleteAllMatchesInTournament = async (req, res, next) => {
  try {
    const tournamentId = req.params.tournamentId;
    await Match.deleteMany({ tournamentId: tournamentId });
    res.json({ success: true, message: "Successfully deleted matches" });
  } catch (error) {
    next(error);
  }
};
