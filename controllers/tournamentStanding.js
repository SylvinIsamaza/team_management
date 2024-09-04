import Tournament from "../models/tournament.js";
import Team from "../models/team.js";
import TournamentStandings from "../models/tournamentStanding.js";
import Season from "../models/season.js";

export async function createTournamentStanding(req, res, next) {
  const { tournament, seasonId } = req.body;
  try {
    const tournament = await Tournament.findById(tId);
    const season = await Season.findById(seasonId);

    if (!tournament) {
      return res
        .status(404)
        .json({ success: false, message: "Tournament not found" });
    }
    if (!season) {
      return res
        .status(404)
        .json({ success: false, message: "Season not found" });
    }

    const teams = await Team.find();
    const standingsPromises = teams.map((team) => {
      const standing = new TournamentStandings({
        tournament,
        team: team._id,
        seasonId,
        playedMatches: 0,
        wonMatches: 0,
        drawnMatches: 0,
        lostMatches: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      });

      return standing.save();
    });

    await Promise.all(standingsPromises);

    res.status(201).json({
      success: true,
      message: "Tournament standings created for all teams.",
    });
  } catch (error) {
    next(error);
  }
}

export async function getSortedTournamentStandings(req, res, next) {
  try {
    const standings = await TournamentStandings.find()
      .sort({ points: -1, goalDifference: -1 })
      .populate("team")
      .exec();
    res.status(200).json({ success: true, standings });
  } catch (error) {
    next(error);
  }
}

export async function getTournamentStandingById(req, res, next) {
  const { id } = req.params;

  try {
    const standing = await TournamentStandings.findById(id)
      .populate("tournament")
      .populate("teamId")
      .populate("season")
      .exec();

    if (!standing) {
      return res
        .status(404)
        .json({ success: true, message: "TournamentStanding not found" });
    }

    res.status(200).json({ success: true, standing });
  } catch (error) {
    next(error);
  }
}

export async function updateTournamentStanding(req, res, next) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const standing = await TournamentStandings.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate("tournament")
      .populate("teamId")
      .populate("season")
      .exec();

    if (!standing) {
      return res.status(404).json({ message: "TournamentStanding not found" });
    }

    res.status(200).json({ success: true, standing });
  } catch (error) {
    next(error);
  }
}

export async function deleteTournamentStanding(req, res, next) {
  const { id } = req.params;

  try {
    const standing = await TournamentStandings.findByIdAndDelete(id);

    if (!standing) {
      return res.status(404).json({ message: "TournamentStanding not found" });
    }

    res
      .status(200)
      .json({ message: "TournamentStanding deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getTournamentStandingsByTeam(req, res, next) {
  const { teamId } = req.params;
  console.log(teamId);
  try {
    const standing = await TournamentStandings.findOne({ team: teamId })
      .populate("team")
      .exec();

    // Check if the standing is found
    if (!standing) {
      return res
        .status(404)
        .json({ message: "No standings found for the team" });
    }

    // Return the standing with success status
    res.status(200).json({ success: true, standing });
  } catch (error) {
    next(error); // Handle any errors
  }
}
