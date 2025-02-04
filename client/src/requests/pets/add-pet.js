import apiClient from '../utils/api-client';

const addPet = async (petData) => {
  try {
    return await apiClient('/pets', 'POST', petData);
  } catch (error) {
    throw new Error(error.message || 'Error adding pet');
  }
};

export default addPet;
