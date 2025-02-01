import { pool } from '../config/db.mjs'; 

/**
 * Middleware to check if a resource exists in a given table.
 * @param {string} table - The table name.
 * @param {string} idField - The ID field to check (e.g., 'id', 'category_id').
 * @returns {Function} - Middleware function.
 */

export const checkResourceExists = (table, idField) => async (req, res, next) => {
  const id = req.params[idField];

  if (id <= 0) {
    return res.status(409).json({
      error: 'Please enter a number greater than 0'
    })
  };

  const checkExistsQuery = `
    SELECT ${idField}
    FROM ${table}
    WHERE ${idField} = $1
  `;

  try {
    const result = await pool.query(checkExistsQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: `404 - No resource found with ${idField} ${id}`,
      });
    }

    next();
  } catch (error) {
    console.error(`Error checking if resource exists in ${table}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};