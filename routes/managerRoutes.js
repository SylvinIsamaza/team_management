import express from 'express';
import { deleteManagerById, getAllManagers, getManagerById, updateManagerById } from '../controllers/managerController.js';



const router = express.Router();
router.get("/",getAllManagers)
router.get('/:id', getManagerById);
router.put('/:id', updateManagerById);
router.delete('/:id', deleteManagerById); 

export default router;
