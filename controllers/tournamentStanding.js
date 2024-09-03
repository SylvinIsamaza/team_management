import TournamentStandings from '../models/TournamentStandings.js'; 
import Team from "../models/team.js"
import Tournament from '../models/tournament.js';


export async function createTournamentStanding(req, res, next) {
  const { tournamentId, season } = req.body;
  const tournament = Tournament.findById(tournamentId)

  try {
    if (tournament != null) {
      const teams = await Team.find(); 
    const standingsPromises = teams.map(team => {
      const standing = new TournamentStandings({
        tournamentId,
        teamId: team._id,
        season,
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

    res.status(201).json({success:true, message: 'Tournament standings created for all teams.' });
    }
    else {
      res.status(400).json({success:false,message:"Tournaments not found"})
    }
    
  } catch (error) {
    next(error);
  }
}
export async function getSortedTournamentStandings(req, res, next) {
  try {
    const standings = await TournamentStandings.find()
      .sort({ points: -1, goalDifference: -1 })
      .exec();
    res.status(200).json({success:true,standings});
  } catch (error) {
    next(error);
  }
}

export async function getTournamentStandingById(req, res, next) {
  const { id } = req.params;

  try {
    const standing = await TournamentStandings.findById(id)
      .populate('tournamentId')
      .populate('teamId')
      .populate('season')
      .exec();

    if (!standing) {
      return res.status(404).json({success:true, message: 'TournamentStanding not found' });
    }

    res.status(200).json({success:true,standing});
  } catch (error) {
    next(error);
  }
}

export async function updateTournamentStanding(req, res, next) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const standing = await TournamentStandings.findByIdAndUpdate(id, updates, { new: true })
      .populate('tournamentId')
      .populate('teamId')
      .populate('season')
      .exec();

    if (!standing) {
      return res.status(404).json({ message: 'TournamentStanding not found' });
    }

    res.status(200).json({success:true,standing});
  } catch (error) {
    next(error);
  }
}

export async function deleteTournamentStanding(req, res, next) {
  const { id } = req.params;

  try {
    const standing = await TournamentStandings.findByIdAndDelete(id);

    if (!standing) {
      return res.status(404).json({ message: 'TournamentStanding not found' });
    }

    res.status(200).json({ message: 'TournamentStanding deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getTournamentStandingsByTeam(req, res, next) {
  const { teamId } = req.params;

  try {
    const standings = await TournamentStandings.find({ teamId })
      .populate('tournamentId')
      .populate('season')
      .exec();

    if (!standings.length) {
      return res.status(404).json({ message: 'No standings found for the team' });
    }

    res.status(200).json({success:true,standings});
  } catch (error) {
    next(error);
  }
}
