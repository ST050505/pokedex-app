import express from 'express';
import { GetIndex, GetCreate, PostCreate, Delete, GetEdit, PostEdit } from '../controllers/PokemonsController.js';

const router = express.Router();

// Index routes
router.get('/index', GetIndex);
router.get('/create', GetCreate);
router.post('/create', PostCreate);
router.post('/delete', Delete);
router.get('/edit/:pokemonsId', GetEdit);
router.post('/edit', PostEdit);

export default router;