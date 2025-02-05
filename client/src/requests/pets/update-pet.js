import apiClient from '../utils/api-client';

const updatePet = async (id, petData) => {
  try {
    return await apiClient(`/pets/${id}`, 'PATCH', petData);
  } catch (error) {
    throw new Error(error.message || 'Error updating pet');
  }
};

export default updatePet;
