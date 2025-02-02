import Team from "../models/team.js";
import User from "../models/user.js";
import upload from "../middlewares/multerMiddleWare.js";
import bcrypt from "bcrypt";
import Officials from "../models/officials.js";
import Squad from "../models/squad.js";
import Transfer from "../models/transfer.js";

import TournamentStandings from "../models/tournamentStanding.js";
import Match from "../models/match.js";
import MatchStatistics from "../models/matchStatistics.js";
export async function getTeamAnalytics(req, res, next) {
  const { teamId } = req.params;

  try {
    const standings = await TournamentStandings.findOne({ team: teamId })
      .populate("tournament")
      .populate("team")
      .populate("seasonId");

    const upcomingMatches = await Match.find({
      $or: [{ homeTeam: teamId }, { awayTeam: teamId }],
      // $or: [{ startDate: { $gte: new Date() }},{ newDate: { $gte: new Date() }}]
    })
      .limit(5)
      .sort({ startDate: 1, newDate: 1 })
      .populate("homeTeam")
      .populate("awayTeam");

    const matchStats = await MatchStatistics.find({
      $or: [
        { "goals.teamId": teamId },
        { "assists.teamId": teamId },
        { "yellowCards.teamId": teamId },
        { "redCards.teamId": teamId },
      ],
    }).populate("matchId");

    const totalMatches = matchStats.length;
    const wins = matchStats.filter((stat) =>
      stat.goals.some((goal) => goal.teamId.equals(teamId))
    ).length;
    const draws = matchStats.filter((stat) => stat.goals.length === 0).length;
    const losses = totalMatches - (wins + draws);

    const winPercentage = totalMatches > 0 ? (wins / totalMatches) * 100 : 100;
    const drawPercentage =
      totalMatches > 0 ? (draws / totalMatches) * 100 : 100;
    const lossPercentage =
      totalMatches > 0 ? (losses / totalMatches) * 100 : 100;

    res.status(200).json({
      standings,
      next5Matches: upcomingMatches,
      performance: {
        totalMatches,
        wins,
        draws,
        losses,
        winPercentage,
        drawPercentage,
        lossPercentage,
      },
    });
  } catch (error) {
    next(error);
  }
}

export const createTeam = async (req, res, next) => {
  const data = req.body;

  try {
    const newTeam = new Team(data);
    const file = req.file;
    const fileName = file ? file.filename : "";
    newTeam.logo = fileName;

    await newTeam.save();
    res.status(201).json({ success: true, team: newTeam });
  } catch (error) {
    next(error);
  }
};
// Upload jerseys
export const uploadJerseys = async (req, res, next) => {
  const { teamId } = req.body;
  console.log(req.files.home[0].path);

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (req.files.home) team.jerseys.home = req.files.home[0].path;
    if (req.files.away) team.jerseys.away = req.files.away[0].path;
    if (req.files.third) team.jerseys.third = req.files.third[0].path;
    await team.save();

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const addPlayer = async (req, res, next) => {
  const { teamId, name, dateOfBirth, nationality, position, shirtNumber } =
    req.body;

  try {
    const newPlayer = new Officials({
      name,
      dateOfBirth,
      nationality,
      position,
      shirtNumber,
      teamId,
    });
    await newPlayer.save();
    await Team.findByIdAndUpdate(teamId, { $push: { players: newPlayer._id } });
    res.status(201).json(newPlayer);
  } catch (error) {
    next(error);
  }
};

export const updateJerseys = async (req, res, next) => {
  const { teamId, homeJersey, awayJersey, thirdJersey } = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        homeJersey,
        awayJersey,
        thirdJersey,
      },
      { new: true }
    );
    res.status(200).json(updatedTeam);
  } catch (error) {
    next(error);
  }
};

export const requestPlayerTransfer = async (req, res, next) => {
  const { playerId, toTeamId, transferFee } = req.body;

  try {
    const player = await Officials.findById(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });

    // player.teamID = newTeamId;
    const transfer = new Transfer({
      playerID: playerId,
      toTeamID: toTeamId,
      fromTeamID: player.teamID,
      transferFee: transferFee,
    });
    await transfer.save();
    // await player.save();
    res.status(200).json({ message: "Player transfer requested" });
  } catch (error) {
    next(error);
  }
};
// Select jersey number for player
export const selectJerseyNumber = async (req, res, next) => {
  const { playerId, jerseyNumber } = req.body;
  try {
    const player = await Officials.findById(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });

    player.jerseyNumber = jerseyNumber;
    await player.save();

    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
};

// Add team logo
export const addLogo = async (req, res, next) => {
  const { teamId } = req.body;
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });
    team.logo = req.file.path;
    await team.save();

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const addOfficial = async (req, res, next) => {
  const data = req.body;

  try {
    const officialsPromises = data.officials.map(async (official) => {
      const savedOfficial = new Officials(official);
      savedOfficial.teamID = data.teamId;
      await savedOfficial.save();
      return savedOfficial;
    });

    const officials = await Promise.all(officialsPromises);

    const updatedTeam = await Team.findByIdAndUpdate(
      data.teamId,
      {
        $push: { officials: { $each: officials } },
      },
      { new: true }
    );

    res.status(200).json(updatedTeam);
  } catch (error) {
    next(error);
  }
};

export const selectSquadForTournament = async (req, res, next) => {
  const { teamId, squad } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });
    const savedSquad = await new Squad(squad);
    console.log(squad);
    await savedSquad.save();
    team.squads.push(savedSquad);
    await team.save();

    res.status(200).json({ message: "Squad selected for tournament" });
  } catch (error) {
    next(error);
  }
};

export const getTeamDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const team = await Team.findById(id).populate("officials");
    if (!team) return res.status(404).json({ message: "Team not found" });

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    const id = req.params.id;
    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    await Team.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Team Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
export const updateTeam = async (req, res, next) => {
  try {
    const id = req.params.id;
    let team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    console.log(req.body);
    team = await Team.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .json({ success: true, message: "Team Successfully updated", team });
  } catch (error) {
    next(error);
  }
};
export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().select(
      "-__v  -createdAt -updatedAt -paymentReceipt"
    );
    const updatedTeams = await Promise.all(
      teams.map(async (team) => {
        const manager = await User.findById(team.managerId).select(
          "-__v  -createdAt -updatedAt "
        );

        return {
          ...team._doc,
          manager,
        };
      })
    );

    res.status(200).json({ success: true, teams: updatedTeams });
  } catch (error) {
    next(error);
  }
};
export const createManager = async (req, res, next) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newManager = new User(data);
    newManager.role = "manager";
    newManager.password = hashedPassword;
    await newManager.save();
    res.status(201).json({
      message: "Manager created successfully",
      success: true,
      manager: newManager,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllManagers = async (req, res, next) => {
  try {
    let managers = await User.find({ role: "manager" });
    res.status(200).json({ success: true, managers });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Verify payment transfer slips / receipts
export const verifyPayment = async (req, res, next) => {
  const { teamId, paymentReceipt } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    team.paymentReceipt = paymentReceipt;
    team.isPaymentVerified = true;
    await team.save();

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};
