import { Router } from 'express';
import { lettersOnly } from '../middleware/lettersOnly.mjs';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category-controller.mjs';

const router = Router();

router.get('/api/categories', getAllCategories);
router.post('/api/categories', lettersOnly('category_name'), createCategory);
router.put('/api/categories/:id', lettersOnly('category_name'), updateCategory);
router.delete('/api/categories/:id', deleteCategory);

export default router;
