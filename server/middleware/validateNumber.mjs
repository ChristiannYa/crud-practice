export const validateNumber = (paramName) => (req, res, next) => {
  const value = req.params[paramName] || req.body[paramName];
  const parsedValue = parseInt(value);

  if (isNaN(parsedValue)) {
    return res.status(400).json({
      error: `${paramName} must be a valid number`,
    });
  };

  // Store the parsed value back
  if (req.params[paramName]) {
    req.params[paramName] = parsedValue;
  } else {
    req.body[paramName] = parsedValue;
  };

  /*
    IF there is a value in the URL parameters (req.params)
      put the parsed number back into the URL parameters
    ELSE
      put the parsed number back into the request body
  */

  next();
};
