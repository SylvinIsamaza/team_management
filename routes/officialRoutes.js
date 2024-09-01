import express from 'express';
import {
    createOfficial,
    getAllOfficials,
    getOfficialById,
    updateOfficial,
    deleteOfficial,
    getPlayers,
    
} from '../controllers/officialController.js';
import { createOfficialUpdate, deleteOfficialUpdateById, getAllOfficialUpdate, updateOfficialUpdateById } from '../controllers/officialupdateController.js';
import upload from '../middlewares/multerMiddleWare.js';

const router = express.Router();

router.post('/new',upload.single("avatar"), createOfficial);
router.get('/players', getPlayers);
router.get("/update", getAllOfficialUpdate)
router.post("/update/new", createOfficialUpdate)
router.delete("/update/:id", deleteOfficialUpdateById)
router.put("/update/:id",updateOfficialUpdateById)
router.get('/', getAllOfficials);
router.get('/:id', getOfficialById);
router.put('/:id',upload.single("avatar"), updateOfficial);
router.delete('/:id', deleteOfficial);


export default router;
