import { pool } from '../config/db.mjs';
import { petFields } from '../constants/pet-fields.mjs';
import {
  sortPetsByCategoryQuery,
  getPetsByCategoryNameQuery,
  getCategoryIdByNameQuery,
  insertWithCategoryQuery,
} from '../utils/pets/queries.mjs';
import { buildUpdateQuery, buildDeleteQuery } from '../utils/queries.mjs';

export class Pet {
  static async findAll() {
    const result = await pool.query(sortPetsByCategoryQuery(['pets.*']));
    return result.rows;
  }

  static async findByCategory(categoryName) {
    const result = await pool.query(
      getPetsByCategoryNameQuery(['p.*, c.category_name']),
      [categoryName]
    );
    return result.rows;
  }

  static async create(categoryName, petData) {
    const categoryResult = await pool.query(getCategoryIdByNameQuery(['id']), [
      categoryName,
    ]);
    if (categoryResult.rows.length === 0) return null;

    const category_id = categoryResult.rows[0].id;
    const values = [
      category_id,
      ...petFields.slice(1).map((field) => petData[field]),
    ];
    const result = await pool.query(
      insertWithCategoryQuery('pets', petFields),
      values
    );
    return result.rows[0];
  }

  static async update(id, updateFields) {
    const values = [id, ...updateFields.map((field) => req.body[field])];
    const result = await pool.query(
      buildUpdateQuery('pets', updateFields),
      values
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(buildDeleteQuery('pets', 'id', '*'), [id]);
    return result.rows[0];
  }
}
