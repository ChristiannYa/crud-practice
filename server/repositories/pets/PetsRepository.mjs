import { pool } from '../../config/db.mjs';
import { petFields } from '../../constants/pet-fields.mjs';

export class PetsRepository {
  async findAll() {
    const result = await pool.query(this.sortPetsByCategoryQuery(['pets.*']));
    return result.rows;
  }

  async findByCategory(categoryName) {
    const result = await pool.query(
      this.getPetsByCategoryNameQuery(['p.*, c.category_name']),
      [categoryName]
    );
    return result.rows;
  }

  async create(categoryName, petData) {
    const categoryResult = await pool.query(
      this.getCategoryIdByNameQuery(['id']),
      [categoryName]
    );
    if (categoryResult.rows.length === 0) return null;

    const category_id = categoryResult.rows[0].id;
    const values = [
      category_id,
      ...petFields.slice(1).map((field) => petData[field]),
    ];
    const result = await pool.query(
      this.insertWithCategoryQuery('pets', petFields),
      values
    );
    return result.rows[0];
  }

  async update(id, updateFields, data) {
    const values = [id, ...updateFields.map((field) => data[field])];
    const result = await pool.query(
      this.buildUpdatePetQuery(updateFields),
      values
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(this.buildDeleteQuery('pets', 'id', '*'), [
      id,
    ]);
    return result.rows[0];
  }

  /* Query Methods */
  getPetsByCategoryNameQuery(fields) {
    return `
      SELECT ${fields.join(', ')}
      FROM pets p
      JOIN categories c ON p.category_id = c.id
      WHERE LOWER(c.category_name) = LOWER($1)
      ORDER BY p.id ASC
    `;
  }

  getCategoryIdByNameQuery(fields) {
    return `
      SELECT ${fields.join(', ')} FROM categories
      WHERE LOWER(category_name) = LOWER($1)
    `;
  }

  sortPetsByCategoryQuery(fields) {
    return `
      SELECT ${fields.join(', ')}, categories.category_name
      FROM pets
      JOIN categories ON pets.category_id = categories.id
    `;
  }

  insertWithCategoryQuery(table, fields) {
    return `
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
  }

  buildUpdatePetQuery(fields) {
    return `
      UPDATE pets p
      SET ${fields
        .map((field, index) => `${field} = $${index + 2}`)
        .join(', ')},
      updated_at = CURRENT_TIMESTAMP
      FROM categories c
      WHERE p.id = $1 AND p.category_id = c.id
      RETURNING p.*, c.category_name
    `;
  }

  buildDeleteQuery(table, field, returningField = '*') {
    return `
      DELETE FROM ${table}
      WHERE ${field} = $1
      RETURNING ${returningField}
    `;
  }
}
