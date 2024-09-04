import express from 'express';
import {
  createTournamentStanding,
  
  getTournamentStandingById,
  updateTournamentStanding,
  deleteTournamentStanding,
  getTournamentStandingsByTeam,
  getSortedTournamentStandings,
  } from '../controllers/tournamentStanding.js'; 

const router = express.Router();

router.post('/', createTournamentStanding);
router.get('/:id', getTournamentStandingById);
router.put('/:id', updateTournamentStanding);
router.delete('/:id', deleteTournamentStanding);
router.get('/team/:teamId', getTournamentStandingsByTeam);
router.get('/', getSortedTournamentStandings);


export default router;
