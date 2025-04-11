import apiClient from '../utils/api-client';

const getPets = async (petData) => {
  try {
    return await apiClient('/pets', 'GET', petData);
  } catch (error) {
    throw new Error(error.message || 'Error fetching pets');
  }
};

export default getPets;
