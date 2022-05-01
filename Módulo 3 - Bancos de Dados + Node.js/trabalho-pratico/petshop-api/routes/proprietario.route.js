import express from 'express';
import ProprietarioController from '../controller/proprietario.controller.js';

const router = express.Router();

router.post('/', ProprietarioController.createProprietario);
router.get('/', ProprietarioController.getProprietarios);
router.get('/:id', ProprietarioController.getProprietario);
router.put('/', ProprietarioController.updateProprietario);
router.delete('/:id', ProprietarioController.deleteProprietario);

export default router;
