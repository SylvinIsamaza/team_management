import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoriteController.js';

const router = express.Router();
router.post('/add', addFavorite),
router.post('/remove', removeFavorite);
router.get('/:userId', getFavorites);
export default router;
