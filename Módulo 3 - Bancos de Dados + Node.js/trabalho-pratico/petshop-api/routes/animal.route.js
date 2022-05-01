import express from 'express';
import AnimalController from '../controller/animal.controller.js';

const router = express.Router();

router.post('/', AnimalController.createAnimal);
router.get('/', AnimalController.getAnimais);
router.get('/:id', AnimalController.getAnimal);
router.put('/', AnimalController.updateAnimal);
router.delete('/:id', AnimalController.deleteAnimal);

export default router;
