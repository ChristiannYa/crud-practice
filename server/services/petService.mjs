import { Pet } from '../models/Pet.mjs';
import { PetsRepository } from '../repositories/pets/PetsRepository.mjs';

export class PetService {
  constructor() {
    this.repository = new PetsRepository();
  }

  async getAllPets() {
    return await this.repository.findAll();
  }

  async getPetsByCategory(categoryName) {
    const pets = await this.repository.findByCategory(categoryName);
    if (pets.length === 0) {
      throw new Error(`No pets found in category '${categoryName}'`);
    }
    return pets;
  }

  async createPet(categoryName, petData) {
    const pet = new Pet(petData);
    pet.validate();

    const newPet = await this.repository.create(categoryName, petData);
    if (!newPet) {
      throw new Error(`Category '${categoryName}' not found`);
    }
    return newPet;
  }

  async updatePet(id, updateFields, data) {
    const updatedPet = await this.repository.update(id, updateFields, data);
    if (!updatedPet) {
      throw new Error(`Pet with id ${id} not found`);
    }
    return updatedPet;
  }

  async deletePet(id) {
    const deletedPet = await this.repository.delete(id);
    if (!deletedPet) {
      throw new Error(`Pet with id ${id} not found`);
    }
    return deletedPet;
  }
}
