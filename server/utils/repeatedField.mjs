export const handleRepeatedField = (error, res, entityType) => {
  if (error.code === '23505') {
    res.status(409).json({
      error: `${entityType} already exists`,
      details: error.detail,
    });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
