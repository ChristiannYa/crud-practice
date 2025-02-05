import { CategoryService } from '../services/categoryService.mjs';
import { handleRepeatedField } from '../utils/repeatedField.mjs';

/* GET request - all categories */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
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

/* PUT request - update a category */
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const updatedCategory = await CategoryService.updateCategory(
      id,
      category_name
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    handleRepeatedField(error, res, 'Category');
  }
};

/* DELETE request - delete a category */
export const deleteCategory = async (req, res) => {
  const { category_name } = req.params;
  try {
    const deletedCategory = await CategoryService.deleteCategory(category_name);
    res.status(200).json({
      message: `Successfully deleted "${deletedCategory.category_name}" category from the table "categories"`,
    });
  } catch (error) {
    if (error.message.includes('has pets associated')) {
      return res.status(409).json({ error: error.message });
    }

    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};
