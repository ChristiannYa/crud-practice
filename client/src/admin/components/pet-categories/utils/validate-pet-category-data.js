const MIN_LENGTH = 3;
const MAX_LENGTH = 50;

export const validatePetCategoryData = (categoryData) => {
  for (const [field, value] of Object.entries(categoryData)) {
    switch (field) {
      case 'category_name':
        if (!value) {
          throw new Error('Category name is required');
        }
        if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
          throw new Error(
            `Category name must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`
          );
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          throw new Error('Category name must contain only letters and spaces');
        }
        break;
    }
  }
};
