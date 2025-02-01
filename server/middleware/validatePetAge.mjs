/**
 * Middleware to validate that the pet age is a number greater than 0
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The nes middleware function
 */
export const validatePetAge = (req, res, next) => {
  const petAge = req.body.pet_age;

  // Check if pet_age is a valid number
  if (isNaN(petAge)) {
    return res.status(400).json({
      error: 'pet age must be a valid number'
    })
  };

  // Convert pet_age to a number
  const parsedPetAge = parseFloat(petAge);
  
  // Check if pet_age is greater than 0
  if (parsedPetAge <= 0) {
    return res.status(400).json({
      error: 'pet age must be greater than 0'
    })
  };

  // If validation passes, store the parsed value and proceed
  req.body.pet_age = parsedPetAge;

  next();
};