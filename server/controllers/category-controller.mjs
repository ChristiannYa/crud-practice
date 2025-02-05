import { CategoryService } from '../services/categoryService.mjs';
import { handleRepeatedField } from '../utils/repeatedField.mjs';

/* GET request - all categories */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* POST request - create a new category */
export const createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await CategoryService.createCategory(category_name);
    res.status(201).json(newCategory);
  } catch (error) {
    handleRepeatedField(error, res, 'Category name');
  }
};

/* PATCH request - update a category */
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const updatedCategory = await CategoryService.updateCategory(
      id,
      category_name
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ error: `Category with id ${id} not found` });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    handleRepeatedField(error, res, 'Category');
  }
};

/* DELETE request - delete a category */
export const deleteCategory = async (req, res) => {
  const { category_name } = req.params;
  try {
    const hasPets = await CategoryService.hasPets(category_name);
    if (hasPets) {
      return res.status(409).json({
        error: `Cannot delete category "${category_name}". Category has pets associated with it.`,
      });
    }

    const deletedCategory = await CategoryService.deleteCategory(category_name);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ error: `Category "${category_name}" not found` });
    }

    res.status(200).json({
      message: `Successfully deleted "${deletedCategory.category_name}" category from the table "categories"`,
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
