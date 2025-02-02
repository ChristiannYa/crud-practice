export const getPetsByCategoryNameQuery = (fields) => `
  SELECT ${fields.join(', ')}
  FROM pets p
  JOIN categories c ON p.category_id = c.id
  WHERE LOWER(c.category_name) = LOWER($1)
  ORDER BY p.id ASC
`;

export const getCategoryIdByNameQuery = (fields) => `
  SELECT ${fields.join(', ')} FROM categories
  WHERE LOWER(category_name) = LOWER($1)
`;

export const sortPetsByCategoryQuery = (fields) => `
  SELECT ${fields.join(', ')}, categories.category_name
  FROM pets
  JOIN categories ON pets.category_id = categories.id
`;

export const insertWithCategoryQuery = (table, fields) => `
  WITH inserted_pet AS (
    INSERT INTO ${table} (${fields.join(', ')})
    VALUES (${fields.map((_, index) => `$${index + 1}`).join(', ')})
    RETURNING *
  )
  SELECT
    p.id,
    p.category_id,
    c.category_name,
    p.pet_name,
    p.pet_breed,
    p.pet_age,
    p.pet_weight,
    p.last_vet_visit,
    p.created_at,
    p.updated_at
  FROM inserted_pet p
  JOIN categories c ON p.category_id = c.id
`;
