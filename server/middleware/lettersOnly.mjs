export const lettersOnly = (fieldName) => (req, res, next) => {
  const lettersOnly = /^[A-Za-z\s]+$/;
  const value = req.body[fieldName];

  if (!lettersOnly.test(value)) {
    return res.status(400).json({
      error: `${fieldName} must contain only letters`,
    });
  }

  next();
};