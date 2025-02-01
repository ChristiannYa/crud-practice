import { Router } from 'express';
import { pool } from '../config/db.mjs';
import { lettersOnly } from '../middleware/index.mjs';
import { handleRepeatedField } from '../utils/repeatedField.mjs';
import {
  buildSelectQuery,
  buildInsertQuery,
  buildUpdateQuery,
} from '../utils/queries.mjs';

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
router.post(
  '/api/categories',
  lettersOnly('category_name'),
  async (req, res) => {
    const { category_name } = req.body;
    const insertCategoryQuery = buildInsertQuery('categories', [
      'category_name',
    ]);
    const values = [category_name];

    try {
      const result = await pool.query(insertCategoryQuery, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      handleRepeatedField(error, res, 'Category name');
    }
  }
);

/* PUT request */
router.put(
  '/api/categories/:id',
  lettersOnly('category_name'),
  async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;

    const updateCategoryQuery = buildUpdateQuery('categories', [
      'category_name',
    ]);
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
      handleRepeatedField(error, res, 'Pet');
    }
  }
);

/* DELETE request */
router.delete('/api/categories/:category_name', async (req, res) => {
  const { category_name } = req.params;

  try {
    // First check if category has pets
    const checkPetsQuery =
      'SELECT COUNT(*) FROM pets WHERE category_id = (SELECT id FROM categories WHERE category_name = $1)';
    const petsResult = await pool.query(checkPetsQuery, [category_name]);

    if (petsResult.rows[0].count > 0) {
      return res.status(409).json({
        error: `Cannot delete category "${category_name}". Category has ${petsResult.rows[0].count} pets associated with it.`,
      });
    }

    // If no pets found, proceed with deletion
    const deleteCategoryQuery =
      'DELETE FROM categories WHERE category_name = $1 RETURNING category_name';
    const result = await pool.query(deleteCategoryQuery, [category_name]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: `Category "${category_name}" not found`,
      });
    }

    res.status(200).json({
      message: `Successfully deleted "${result.rows[0].category_name}" category from the table "categories"`,
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
