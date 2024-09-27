let validation = (schemaValidation) => {
  return (req, res, next) => {
    let data = schemaValidation.validate(req.body);
    let err = data.error;
    if (err) {
      res.status(400).json({
        success: false,
        message: err.details[0].message,
      });
    } else {
      next();
    }
  };
};
export default validation;
