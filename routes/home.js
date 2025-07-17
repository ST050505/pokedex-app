import express from 'express';
import { GetHome } from '../controllers/HomeController.js';

const router = express.Router();

// Home routes
router.get('/', GetHome);

export default router;