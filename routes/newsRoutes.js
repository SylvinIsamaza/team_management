import express from 'express';
import { createNews, deleteNewsById, getAllNews, getNewsById, updateNewsById } from '../controllers/newsController.js';
import upload from '../middlewares/multerMiddleWare.js';
const router = express.Router();
router.get("/", getAllNews);
router.post("/add",upload.single("coverImage"),createNews)
router.get('/:id', getNewsById);
router.put('/:id', updateNewsById);
router.delete('/:id', deleteNewsById); 

export default router;
