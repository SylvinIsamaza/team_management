import Tournament from "../models/tournament.js";
import Team from "../models/team.js";
import Match from "../models/match.js";
import MatchStatistics from "../models/matchStatistics.js";

export async function createTournament(req, res, next) {
  console.log(req);
  const { name, type, startDate, endDate, sponsors, teams, status } = req.body;

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
    await newTournament.save();
    res.status(201).json({
      success: true,
      data: newTournament,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addTeamToTournament(req, res, next) {
  const { tournament, teamIds } = req.body;

  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      tournament,
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
  const { homeTeam, awayTeam, tournament, dateTime, venue } = req.body;

  try {
    const newMatch = new Match({
      homeTeam,
      awayTeam,
      tournament,
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
  const { tournament, groups } = req.body; // groups is an array of objects { groupName, teamIds }

  try {
    const tournament = await Tournament.findById(tId);
    if (!tournament)
      return res.status(404).json({ message: "Tournament not found" });

    tournament.groups = groups;
    await tournament.save();

    res.status(200).json(tournament);
  } catch (error) {
    next(error);
  }
};

export const getAllTournaments = async (req, res, next) => {
  try {
    const tournaments = await Tournament.find();
    const filteredTournaments = await Promise.all(
      tournaments.map(async (tournament) => {
        let allTeamsInTournament = [];
        const teams = await Promise.all(
          tournament.teams.map(async (teamId) => {
            const teamInTournament = await Team.findById(teamId).select(
              "-__v -paymentReceipt -officials -v -createdAt -updatedAt -squads "
            );
            allTeamsInTournament.push(teamInTournament);
          })
        );

        tournament.teams = allTeamsInTournament;
        return tournament;
      })
    );
    res.status(200).json({
      success: true,
      data: filteredTournaments,
    });
  } catch (error) {
    next(error);
  }
};

export const getTournamentDetails = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const tournament = await Tournament.findById(id);

    res.status(200).json({ tournament, success: true });
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
