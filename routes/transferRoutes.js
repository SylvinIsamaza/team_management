import express from 'express';
import { deleteNewsById, getAllNews, getNewsById, updateNewsById } from '../controllers/newsController.js';
import { deleteTransferById, getAllTransfer, getTransferById, newTransfer, updateTransferById } from '../controllers/transferController.js';
const router = express.Router();
router.post("/new",newTransfer)
router.get("/",getAllTransfer)
router.get('/:id', getTransferById);
router.put('/:id', updateTransferById);
router.delete('/:id', deleteTransferById); 

export default router;
