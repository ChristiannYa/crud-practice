const MIN_LENGTH = 3;
const MAX_LENGTH = 50;

export const validatePetData = (petData) => {
  let age;
  let visitDate;

  for (const [field, value] of Object.entries(petData)) {
    switch (field) {
      case 'category_name':
        if (!value) {
          throw new Error('Please select a category');
        }
        break;

      case 'pet_name':
      case 'pet_breed':
        if (!value) {
          throw new Error(
            `Pet ${
              field.replace('pet_', '').charAt(0).toUpperCase() +
              field.replace('pet_', '').slice(1)
            } is required`
          );
        }
        if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
          throw new Error(
            `${field.replace(
              'pet_',
              ''
            )} must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`
          );
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          throw new Error(
            `${field.replace('pet_', '')} must contain only letters and spaces`
          );
        }
        break;

      case 'pet_age':
        if (!value) {
          throw new Error('Age is required');
        }
        age = parseFloat(value);
        if (isNaN(age)) {
          throw new Error('Age must be a valid number');
        }
        if (age <= 0) {
          throw new Error('Age must be greater than 0');
        }
        break;

      case 'pet_weight':
        if (!value) {
          throw new Error('Weight is required');
        }
        break;

      case 'last_vet_visit':
        if (!value) {
          throw new Error('Last vet visit date is required');
        }
        visitDate = new Date(value);
        if (isNaN(visitDate.getTime())) {
          throw new Error('Invalid vet visit date');
        }
        break;
    }
  }
};
