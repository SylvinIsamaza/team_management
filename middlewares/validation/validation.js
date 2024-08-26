import validation from "../../validation/validation.js";

export const validateEmailMiddleware = (req, res, next) => {
  const { email } = req.body;

  const validationResult = validation.validateEmail(email);
  if (!validationResult.valid) {
    next(validationResult);
  }
  next();
};
