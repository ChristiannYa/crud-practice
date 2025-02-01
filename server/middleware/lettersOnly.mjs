export const lettersOnly = (field) => (req, res, next) => {
  const value = req.body[field];
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 50; // Make sure to adjust this value based on the databse

  if (!value) {
    return res.status(400).json({
      error: `${field} is required`,
    });
  }

  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return res.status(400).json({
      error: `${field} must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`,
    });
  }

  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return res.status(400).json({
      error: `${field} must contain only letters and spaces`,
    });
  }

  next();
};
