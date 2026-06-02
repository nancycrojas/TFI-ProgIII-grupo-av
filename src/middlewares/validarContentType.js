export const validarContentType = (req, res, next) => {
  if (
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(415).json({
      estado: false,
      mensaje: "Content-Type debe ser application/json",
    });
  }
  next();
};
