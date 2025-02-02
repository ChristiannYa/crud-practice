import { Router } from 'express';
import { pool } from '../config/db.mjs';
import { validatePetAge } from '../middleware/index.mjs';
import { handleRepeatedField } from '../utils/repeatedField.mjs';
import {
  buildSelectQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from '../utils/queries.mjs';
import {
  sortPetsByCategoryQuery,
  getPetsByCategoryNameQuery,
  insertWithCategoryQuery,
} from '../utils/pets/queries.mjs';

const router = Router();
const petFields = [
  'category_id',
  'pet_name',
  'pet_breed',
  'pet_age',
  'pet_weight',
  'last_vet_visit',
];

/* GET request - Get ALL pets (sorted by category) */
router.get('/api/pets', async (req, res) => {
  try {
    const result = await pool.query(sortPetsByCategoryQuery(['pets.*']));
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* GET request - Get pets by category_name */
router.get('/api/pets/:category_name', async (req, res) => {
  const { category_name } = req.params;

  try {
    const petsResult = await pool.query(getPetsByCategoryNameQuery(['p.*']), [
      category_name,
    ]);

    if (petsResult.rows.length === 0) {
      return res.status(404).json({
        error: `No pets found in category '${category_name}'`,
      });
    }

    res.status(200).json(petsResult.rows);
  } catch (error) {
    console.error(`Error fetching pets by category ${category_name}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* POST request - Add a new pet */
router.post('/api/pets', validatePetAge, async (req, res) => {
  const { category_name, ...petData } = req.body;

  /**
    * Get the category id from the category_name

    If user were to choose 'dogs' as a pet category:
    SELECT id FROM categories WHERE LOWER(category_name) = LOWER('dogs')
  */
  try {
    const categoryResult = await pool.query(getCategoryIdByNameQuery(['id']), [
      category_name,
    ]);

    if (categoryResult.rows.length === 0) {
      return res.status(404).json({
        error: `Category '${category_name}' not found`,
      });
    }

    const category_id = categoryResult.rows[0].id;
    const values = [
      category_id,
      ...petFields.slice(1).map((field) => petData[field]),
    ];
    const insertPetQuery = insertWithCategoryQuery('pets', petFields);
    const dbResult = await pool.query(insertPetQuery, values);

    res.status(201).json(dbResult.rows[0]);
  } catch (error) {
    console.error('Error adding pet:', error);
    handleRepeatedField(error, res, 'Pet');
  }
});

/* PATCH request - Edit a pet's field */
router.patch('/api/pets/:id', async (req, res) => {
  if (req.body.pet_age) {
    validatePetAge(req, res, () => {});
  }

  const { id } = req.params;
  const updateFields = Object.keys(req.body);
  const values = [id, ...updateFields.map((field) => req.body[field])];

  const patchPetQuery = buildUpdateQuery('pets', updateFields);

  try {
    const result = await pool.query(patchPetQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: `Pet with id ${id} not found`,
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    handleRepeatedField(error, res, 'Pet');
  }
});

/* DELETE request - Delete a pet */
router.delete('/api/pets/:id', async (req, res) => {
  const { id } = req.params;
  const deletePetQuery = buildDeleteQuery('pets', 'id', '*');

  try {
    const result = await pool.query(deletePetQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: `Pet with id ${id} not found`,
      });
    }

    res.status(200).json({
      message: `Successfully deleted pet:`,
      deletedPet: result.rows[0],
    });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

/* 
  - Notes

  1. Added a unique_pet constraint using the query tool
  to the pets table to prevent duplicate values

    ALTER TABLE pets 
    ADD CONSTRAINT unique_pet 
    UNIQUE (pet_name, pet_breed, pet_age, pet_weight, last_vet_visit);
  
  2. PostgreSQL unique violation error '23505'
  3. Status 400 = Bad Request
  4. Status 409 = Conflict
*/
