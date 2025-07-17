import express from 'express';
import { GetIndex, GetCreate, PostCreate, Delete, GetEdit, PostEdit } from '../controllers/RegionsController.js';

const router = express.Router();

// Rutas para Regions
router.get('/index', GetIndex);
router.get('/create', GetCreate);
router.post('/create', PostCreate);
router.post('/delete', Delete);
router.get('/edit/:regionsId', GetEdit);
router.post('/edit', PostEdit);

export default router;