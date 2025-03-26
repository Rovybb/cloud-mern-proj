import express from 'express';
import { discoverMovies, searchMovies } from '../controllers/movieController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/discover', auth, discoverMovies);
router.get('/search', auth, searchMovies);

export default router;
