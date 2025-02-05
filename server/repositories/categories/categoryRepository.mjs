/**
 * Builds a query to check for pets in a category
 * @param {string} categoryIdentifier - The field to identify the category (e.g., 'id' or 'category_name')
 * @returns {string} - The generated SQL query
 */
export const buildCheckPetsQuery = (categoryIdentifier) => `
  SELECT COUNT(*) 
  FROM pets 
  WHERE category_id = (
    SELECT id 
    FROM categories 
    WHERE ${categoryIdentifier} = $1
  )
`;
