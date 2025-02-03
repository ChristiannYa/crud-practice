const addPet = async (petData) => {
  try {
    const response = await fetch('http://localhost:3000/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to add pet');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error adding pet');
  }
};

export default addPet;
