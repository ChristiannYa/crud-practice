import apiClient from '../utils/api-client';

const addPetCategory = async (categoryData) => {
  try {
    return await apiClient('/categories', 'POST', categoryData);
  } catch (error) {
    throw new Error(error.message || 'Error adding pet category');
  }
};

export default addPetCategory;
