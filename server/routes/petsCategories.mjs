import { Router } from 'express';
import { pool } from '../config/db.mjs';
import { lettersOnly } from '../middleware/index.mjs';
import { handleRepeatedField } from '../utils/repeatedField.mjs'
import { buildSelectQuery, buildInsertQuery, buildUpdateQuery } from '../utils/queries.mjs';

const router = Router();

/* GET request */
router.get('/api/categories', async (req, res) => {
  const getCategoriesQuery = buildSelectQuery('categories');

  try {
    const result = await pool.query(getCategoriesQuery);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* POST request */
router.post('/api/categories', lettersOnly('category_name'), async (req, res) => {
  const { category_name } = req.body;
  const insertCategoryQuery = buildInsertQuery('categories', ['category_name']);
  const values = [category_name];

  try {
    const result = await pool.query(insertCategoryQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    handleRepeatedField(error, res, 'Category name')
  }
});

router.put('/api/categories/:id', lettersOnly('category_name'), async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;

  const updateCategoryQuery = buildUpdateQuery('categories', ['category_name']);
  const values = [id, category_name];

  try {
    const result = await pool.query(updateCategoryQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: `Category with id ${id} not found`,
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    handleRepeatedField(error, res, 'Pet')
  }
});

export default router;
