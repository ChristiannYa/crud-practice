const deletePet = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/pets/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete pet');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error deleting pet');
  }
};

export default deletePet;
