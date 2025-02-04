import { Pet } from '../../models/Pet.mjs';

describe('Pet Model', () => {
  test('findAll returns all pets', async () => {
    const pets = await Pet.findAll();
    expect(Array.isArray(pets)).toBe(true);
  });

  test('findByCategory returns pets in specific category', async () => {
    // Get all pets to find an existing category
    const allPets = await Pet.findAll();
    const existingCategory = allPets[0].category_name;

    const pets = await Pet.findByCategory(existingCategory);
    expect(pets.length).toBeGreaterThan(0);
    expect(pets.every((pet) => pet.category_name === existingCategory)).toBe(
      true
    );
  });

  test('createPet adds a new pet successfully', async () => {
    const newPetData = {
      pet_name: 'TestDog',
      pet_breed: 'TestBreed',
      pet_age: 3,
      pet_weight: 15,
      last_vet_visit: '2024-03-20',
    };

    const createdPet = await Pet.create('Dogs', newPetData);

    expect(createdPet).toHaveProperty('id');
    expect(createdPet.pet_name).toBe('TestDog');
    expect(createdPet.pet_breed).toBe('TestBreed');
  });
});
