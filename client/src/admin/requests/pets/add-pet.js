const addPet = async (petData) => {
  try {
    const response = await fetch('http://localhost:3000/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category_name: petData.category_name,
        pet_name: petData.pet_name,
        pet_breed: petData.pet_breed,
        pet_age: petData.pet_age,
        pet_weight: petData.pet_weight,
        last_vet_visit: petData.last_vet_visit,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const newPet = await response.json();
    return newPet;
  } catch (error) {
    console.error('Error adding pet:', error);
    throw error;
  }
};

export default addPet;
