import { petFields } from '../constants/pet-fields.mjs';

export class Pet {
  constructor(data) {
    this.id = data.id;
    this.category_id = data.category_id;
    this.category_name = data.category_name;
    this.pet_name = data.pet_name;
    this.pet_breed = data.pet_breed;
    this.pet_age = data.pet_age;
    this.pet_weight = data.pet_weight;
    this.last_vet_visit = data.last_vet_visit;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  validate() {
    if (!this.pet_name || !this.pet_breed) {
      throw new Error('Pet name and breed are required');
    }

    if (this.pet_age <= 0) {
      throw new Error('Pet age must be greater than 0');
    }

    if (!this.pet_weight) {
      throw new Error('Pet weight is required');
    }

    if (!this.last_vet_visit) {
      throw new Error('Last vet visit date is required');
    }

    return true;
  }

  toJSON() {
    return {
      id: this.id,
      category_id: this.category_id,
      category_name: this.category_name,
      pet_name: this.pet_name,
      pet_breed: this.pet_breed,
      pet_age: this.pet_age,
      pet_weight: this.pet_weight,
      last_vet_visit: this.last_vet_visit,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  static getFields() {
    return petFields;
  }
}
