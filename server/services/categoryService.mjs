import { PetCategories } from '../models/PetCategories.mjs';

export class CategoryService {
  static async getAllCategories() {
    return await PetCategories.findAll();
  }

  static async createCategory(categoryName) {
    return await PetCategories.create(categoryName);
  }

  static async updateCategory(id, categoryName) {
    const updatedCategory = await PetCategories.update(id, categoryName);
    if (!updatedCategory) {
      throw new Error(`Category with id ${id} not found`);
    }
    return updatedCategory;
  }

  static async deleteCategory(categoryName) {
    const hasPets = await PetCategories.hasPets(categoryName);
    if (hasPets) {
      throw new Error(
        `Cannot delete category "${categoryName}". Category has pets associated with it.`
      );
    }

    const deletedCategory = await PetCategories.delete(categoryName);
    if (!deletedCategory) {
      throw new Error(`Category "${categoryName}" not found`);
    }
    return deletedCategory;
  }
}
