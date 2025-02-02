import { Router } from 'express';

import petsRouter from './petsRouter.mjs';
import petsCategories from './petsCategories.mjs';

const router = Router();

router.use(petsRouter);
router.use(petsCategories);

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to pets api' });
});

export default router;
