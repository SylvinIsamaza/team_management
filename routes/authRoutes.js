import express from 'express';
import { getUserInfo, login } from '../controllers/authenticationController.js'; 
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/', protect, getUserInfo)


export default router;
