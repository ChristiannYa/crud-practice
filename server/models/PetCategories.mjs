import { pool } from '../config/db.mjs';
import {
  buildSelectQuery,
  buildInsertQuery,
  buildUpdateQuery,
  buildDeleteQuery,
} from '../repositories/base/baseRepository.mjs';
import { buildCheckPetsQuery } from '../repositories/categories/categoryRepository.mjs';

export class PetCategories {
  static async findAll() {
    const result = await pool.query(buildSelectQuery('categories'));
    return result.rows;
  }

  static async create(categoryName) {
    const result = await pool.query(
      buildInsertQuery('categories', ['category_name']),
      [categoryName]
    );
    return result.rows[0];
  }

  static async update(id, categoryName) {
    const result = await pool.query(
      buildUpdateQuery('categories', ['category_name']),
      [id, categoryName]
    );
    return result.rows[0];
  }

  static async delete(categoryName) {
    const petsResult = await pool.query(buildCheckPetsQuery('category_name'), [
      categoryName,
    ]);
    if (petsResult.rows[0].count > 0) return null;

    const result = await pool.query(
      buildDeleteQuery('categories', 'category_name', 'category_name'),
      [categoryName]
    );
    return result.rows[0];
  }

  static async hasPets(categoryName) {
    const result = await pool.query(buildCheckPetsQuery('category_name'), [
      categoryName,
    ]);
    return result.rows[0].count > 0;
  }
}
