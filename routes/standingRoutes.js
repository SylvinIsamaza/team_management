import express from 'express';
import {
  createTournamentStanding,
  getAllTournamentStandings,
  getTournamentStandingById,
  updateTournamentStanding,
  deleteTournamentStanding,
  getTournamentStandingsByTeam,
  getSortedTournamentStandings,
  getTeamAnalytics
} from '../controllers/tournamentStanding.js'; 

const router = express.Router();

router.post('', createTournamentStanding);
router.get('/:id', getTournamentStandingById);
router.put('/:id', updateTournamentStanding);
router.delete('/:id', deleteTournamentStanding);
router.get('/team/:teamId', getTournamentStandingsByTeam);
router.get('/', getSortedTournamentStandings);


export default router;
