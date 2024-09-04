import express from 'express';
import {
  createSquad,
  getAllSquads,
  getSquadById,
  updateSquad,
  deleteSquad
} from '../controllers/squadController.js';
const router = express.Router();
router.post('/', createSquad);
router.get('/', getAllSquads);
router.get('/:id', getSquadById);
router.put('/:id', updateSquad);
router.delete('/:id', deleteSquad);

export default router;
