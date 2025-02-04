import { PetCategories } from '../models/PetCategories.mjs';
import { handleRepeatedField } from '../utils/repeatedField.mjs';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await PetCategories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await PetCategories.create(category_name);
    res.status(201).json(newCategory);
  } catch (error) {
    handleRepeatedField(error, res, 'Category name');
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const updatedCategory = await PetCategories.update(id, category_name);
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

export const deleteCategory = async (req, res) => {
  const { category_name } = req.params;
  try {
    const hasPets = await PetCategories.hasPets(category_name);
    if (hasPets) {
      return res.status(409).json({
        error: `Cannot delete category "${category_name}". Category has pets associated with it.`,
      });
    }

    const deletedCategory = await PetCategories.delete(category_name);
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
