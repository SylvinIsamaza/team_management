import express from 'express';
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch
} from '../controllers/matchController.js'; 

const router = express.Router();

router.post('/new', createMatch);
router.get('/', getAllMatches);
router.get('/:id', getMatchById);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

export default router;
