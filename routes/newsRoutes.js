import express from 'express';
import { createNews, deleteNewsById, getAllNews, getNewsById, updateNewsById } from '../controllers/newsController.js';
const router = express.Router();
router.get("/", getAllNews);
router.post("/add",createNews)
router.get('/:id', getNewsById);
router.put('/:id', updateNewsById);
router.delete('/:id', deleteNewsById); 

export default router;
