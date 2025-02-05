import { PetService } from '../services/petService.mjs';
import { handleRepeatedField } from '../utils/repeatedField.mjs';

const petService = new PetService();

/* GET request - all pets */
export const getAllPets = async (req, res) => {
  try {
    const pets = await petService.getAllPets();
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
    const pets = await petService.getPetsByCategory(category_name);
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
    const newPet = await petService.createPet(category_name, petData);
    res.status(201).json(newPet);
  } catch (error) {
    handleRepeatedField(error, res, 'Pet');
  }
};

/* PATCH request - update a pet */
export const updatePet = async (req, res) => {
  const { id } = req.params;
  const updateFields = Object.keys(req.body);
  try {
    const updatedPet = await petService.updatePet(id, updateFields, req.body);
    res.status(200).json(updatedPet);
  } catch (error) {
    handleRepeatedField(error, res, 'Pet');
  }
};

/* DELETE request - delete a pet */
export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPet = await petService.deletePet(id);
    res.status(200).json({
      message: 'Successfully deleted pet:',
      deletedPet,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
