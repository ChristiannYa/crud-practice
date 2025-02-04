import { Router } from 'express';
import { validatePetAge } from '../middleware/validatePetAge.mjs';
import {
  getAllPets,
  getPetsByCategory,
  createPet,
  updatePet,
  deletePet,
} from '../controllers/pet-controller.mjs';

const router = Router();

router.get('/api/pets', getAllPets);
router.get('/api/pets/:category_name', getPetsByCategory);
router.post('/api/pets', validatePetAge, createPet);
router.patch('/api/pets/:id', validatePetAge, updatePet);
router.delete('/api/pets/:id', deletePet);

export default router;
