let notFoundError = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
};
export default notFoundError;
