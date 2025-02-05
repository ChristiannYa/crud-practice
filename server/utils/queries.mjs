/**
 * Builds an INSERT query for a given table and fields.
 * @param {string} table - The table name.
 * @param {string[]} fields - The fields to insert.
 * @returns {string} - The generated SQL query.
 */
export const buildInsertQuery = (table, fields) => `
  INSERT INTO ${table} (${fields.join(', ')})
  VALUES (${fields.map((_, index) => `$${index + 1}`).join(', ')})
  RETURNING *
`;

/**
 * Builds a SELECT query for a given table and fields.
 * @param {string} table - The table name.
 * @param {string[]} fields - The fields to select (defaults to '*').
 * @param {string} conditionalField - The field to use in the WHERE clause.
 * @returns {string} - The generated SQL query
 */
export const buildSelectQuery = (table, fields = ['*'], conditionalField) => {
  const whereClause = conditionalField ? `WHERE ${conditionalField} = $1` : '';

  return `
    SELECT ${fields.join(', ')}
    FROM ${table}
    ${whereClause}
    ORDER BY id ASC
  `;
};

/**
 * Builds an UPDATE query for a given table and fields
 * @param {string} table - The table name
 * @param {string[]} fields - The fields to update
 * @returns {string} - The generated SQL query
 */
export const buildUpdateQuery = (table, fields) => `
  UPDATE ${table}
  SET ${fields.map((field, index) => `${field} = $${index + 2}`).join(', ')},
  updated_at = CURRENT_TIMESTAMP
  WHERE id = $1
  RETURNING *
`;

export const buildUpdatePetQuery = (fields) => `
  UPDATE pets p
  SET ${fields.map((field, index) => `${field} = $${index + 2}`).join(', ')},
  updated_at = CURRENT_TIMESTAMP
  FROM categories c
  WHERE p.id = $1 AND p.category_id = c.id
  RETURNING p.*, c.category_name
`;

/**
 * Builds a DELETE query for a given table
 * @param {string} table - The table name
 * @param {string} field - The field to use in WHERE clause
 * @returns {string} - The generated SQL query
 */
export const buildDeleteQuery = (table, field, returningField = '*') => `
  DELETE FROM ${table}
  WHERE ${field} = $1
  RETURNING ${returningField}
`;
