export const validarContentType = (req, res, next) => {
  if (
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    !req.is("application/json") &&
    !req.is("multipart/form-data")
  ) {
    return res.status(415).json({
      estado: false,
      msg: "Content-Type debe ser application/json o multipart/form-data",
    });
  }
  next();
};
