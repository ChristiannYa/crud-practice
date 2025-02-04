import apiClient from '../utils/api-client';

const deletePet = async (id) => {
  try {
    return await apiClient(`/pets/${id}`, 'DELETE');
  } catch (error) {
    throw new Error(error.message || 'Error deleting pet');
  }
};

export default deletePet;
