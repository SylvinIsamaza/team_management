import Match from '../models/match.js';

export async function createMatch(req, res, next) {
  const { homeTeamId, awayTeamId, dateTime, venue, startDate } = req.body;

  try {
    const match = new Match({ homeTeamId, awayTeamId, dateTime, venue, startDate });
    await match.save();

    res.status(201).json({success:true,match});
  } catch (error) {
    next(error);
  }
}
export const createTournamentMatches = async (req, res, next) => {
  try {
    const tournamentId=req.params.tournamentId
    const tournament = await Tournament.findById(tournamentId)
    const matchesinTournament = await Match.findOne({ tournamentId: tournamentId })
    if (matchesinTournament == null) {
      let matches=[]
    if (tournament.type == "League") {
     matches=createLeagueMatches(tournamentId)
    }
    if (tournament.type == "Knockout") {
     matches=createKnockoutMatches(tournamentId)
    }
    res.json({success:true,matches})
    }
    else {
      res.json({success:false,message:"Matches already generated"})
    }
    
  } catch (error) {
    next(error)
  }
 

}

export async function getAllMatches(req, res, next) {
  try {
    const matches = await Match.find();
    res.status(200).json({success:true, matches });
  } catch (error) {
    next(error);
  }
}

export async function getMatchById(req, res, next) {
  const { id } = req.params;

  try {
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json({success:true,match});
  } catch (error) {
    next(error);
  }
}

export async function updateMatch(req, res, next) {
  const { id } = req.params;
  const { homeTeamId, awayTeamId, dateTime, venue, homeTeamScore, awayTeamScore, status, startDate, isPostponed, newDate } = req.body;

  try {
    const match = await Match.findByIdAndUpdate(
      id,
      { homeTeamId, awayTeamId, dateTime, venue, homeTeamScore, awayTeamScore, status, startDate, isPostponed, newDate },
      { new: true, runValidators: true }
    );

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json({success:true, match });
  } catch (error) {
    next(error);
  }
}

export async function deleteMatch(req, res, next) {
  const { id } = req.params;

  try {
    const match = await Match.findByIdAndDelete(id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error) {
    next(error);
  }



}

export async function getMatchesByTournament(req, res, next) {
  const { tournamentId } = req.params;

  try {
    const matches = await Match.find({ tournamentId })
      .populate('homeTeamId awayTeamId')
      .exec();

    if (!matches.length) {
      return res.status(404).json({ message: 'No matches found for this tournament' });
    }

    res.status(200).json(matches);
  } catch (error) {
    next(error);
  }
}


export const deleteAllMatchesInTournament = async (req, res, next) => {
  try {
    const tournamentId = req.params.tournamentId
    await Match.deleteMany({ tournamentId: tournamentId })
    res.json({success:true,message:"Successfully deleted matches"})
  } catch (error) {
    next(error)
  }
  
}