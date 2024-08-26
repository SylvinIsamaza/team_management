import express from 'express';
import {
    createOfficial,
    getAllOfficials,
    getOfficialById,
    updateOfficial,
    deleteOfficial,
    getPlayers,
} from '../controllers/officialController.js';

const router = express.Router();

router.post('/new', createOfficial);
router.get('/players', getPlayers);
router.get('/', getAllOfficials);
router.get('/:id', getOfficialById);
router.put('/:id', updateOfficial);
router.delete('/:id', deleteOfficial);


export default router;
