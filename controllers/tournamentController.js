import Tournament from "../models/tournament.js";
import Team from "../models/team.js";
import Match from "../models/match.js";
import MatchStatistics from "../models/matchStatistics.js";

export async function createTournament(req, res, next) {
  console.log(req)
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
    await newTournament.save();
    res.status(201).json({
      success: true,
      data: newTournament,
    });
  } catch (error) {
    console.log(error)
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

 const createKnockoutMatches = async (tournamentId) => {
 
  const tournament = await Tournament.findById(tournamentId).populate('teams');

  if (!tournament || tournament.type !== 'Knockout') {
    throw new Error('Invalid tournament or tournament type is not Knockout');
  }

  const teams = tournament.teams;
  if (teams.length % 2 !== 0) {
    throw new Error('Knockout tournaments require an even number of teams');
  }

  const matches = [];
  for (let i = 0; i < teams.length; i += 2) {
    const match = new Match({
      homeTeamId: teams[i],
      awayTeamId: teams[i + 1],
      tournamentId,
      dateTime: new Date(), 
      venue: 'Default Venue',
      status: 'UPCOMING',
      homeTeamScore: 0,
      awayTeamScore: 0,
      startDate: new Date(),
    });
    matches.push(match);
  }

 
  await Match.insertMany(matches);
  return matches;
};

 const createLeagueMatches = async (tournamentId) => {
  const tournament = await Tournament.findById(tournamentId).populate('teams');

  if (!tournament || tournament.type !== 'League') {
    throw new Error('Invalid tournament or tournament type is not League');
  }

  const teams = tournament.teams;
  const matches = [];

  
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const match = new Match({
        homeTeamId: teams[i],
        awayTeamId: teams[j],
        tournamentId,
        dateTime: new Date(), 
        venue: 'Default Venue', 
        status: 'UPCOMING',
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





export const getAllTournaments = async (req, res, next) => {
  try {
    const tournaments = await Tournament.find();
    const filteredTournaments = await Promise.all(
      tournaments.map(async (tournament) => {
        let allTeamsInTournament=[] 
        const teams = await Promise.all(
          tournament.teams.map(async (teamId) => {
            const teamInTournament = await Team.findById(teamId).select('-__v -paymentReceipt -officials -v -createdAt -updatedAt -squads ');
            allTeamsInTournament.push(teamInTournament)
          })
        );
       
        tournament.teams=allTeamsInTournament
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

    res.status(200).json({ tournament,success:true });
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
