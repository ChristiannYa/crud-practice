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


export const buildUpdateQuery = (table, fields) => `
  UPDATE ${table}
  SET ${fields.map((field, index) => `${field} = $${index + 2}`).join(', ')},
  updated_at = CURRENT_TIMESTAMP
  WHERE id = $1
  RETURNING *
`;
