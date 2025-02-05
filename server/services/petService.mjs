import { Pet } from '../models/Pet.mjs';

export class PetService {
  static async getAllPets() {
    return await Pet.findAll();
  }

  static async getPetsByCategory(categoryName) {
    const pets = await Pet.findByCategory(categoryName);
    if (pets.length === 0) {
      throw new Error(`No pets found in category '${categoryName}'`);
    }
    return pets;
  }

  static async createPet(categoryName, petData) {
    const newPet = await Pet.create(categoryName, petData);
    if (!newPet) {
      throw new Error(`Category '${categoryName}' not found`);
    }
    return newPet;
  }

  static async updatePet(id, updateFields, data) {
    const updatedPet = await Pet.update(id, updateFields, data);
    if (!updatedPet) {
      throw new Error(`Pet with id ${id} not found`);
    }
    return updatedPet;
  }

  static async deletePet(id) {
    const deletedPet = await Pet.delete(id);
    if (!deletedPet) {
      throw new Error(`Pet with id ${id} not found`);
    }
    return deletedPet;
  }
}
