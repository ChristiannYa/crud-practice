import { Pet } from '../models/Pet.mjs';
import { handleRepeatedField } from '../utils/repeatedField.mjs';

/* GET request - all pets */
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* GET request - pets by category */
export const getPetsByCategory = async (req, res) => {
  const { category_name } = req.params;
  try {
    const pets = await Pet.findByCategory(category_name);
    if (pets.length === 0) {
      return res
        .status(404)
        .json({ error: `No pets found in category '${category_name}'` });
    }
    res.status(200).json(pets);
  } catch (error) {
    console.error(`Error fetching pets by category ${category_name}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* POST request - create a new pet */
export const createPet = async (req, res) => {
  const { category_name, ...petData } = req.body;
  try {
    const newPet = await Pet.create(category_name, petData);
    if (!newPet) {
      return res
        .status(404)
        .json({ error: `Category '${category_name}' not found` });
    }
    res.status(201).json(newPet);
  } catch (error) {
    handleRepeatedField(error, res, 'Pet');
  }
};

/* PUT request - update a pet */
export const updatePet = async (req, res) => {
  const { id } = req.params;
  const updateFields = Object.keys(req.body);
  try {
    const updatedPet = await Pet.update(id, updateFields);
    if (!updatedPet) {
      return res.status(404).json({ error: `Pet with id ${id} not found` });
    }
    res.status(200).json(updatedPet);
  } catch (error) {
    handleRepeatedField(error, res, 'Pet');
  }
};

/* DELETE request - delete a pet */
export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPet = await Pet.delete(id);
    if (!deletedPet) {
      return res.status(404).json({ error: `Pet with id ${id} not found` });
    }
    res.status(200).json({
      message: 'Successfully deleted pet:',
      deletedPet,
    });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
