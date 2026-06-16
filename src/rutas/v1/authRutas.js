import express from "express";
import AuthController from "../../controladores/authControlador.js";

import { check } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasenia
 *             properties:
 *               email:
 *                 type: string
 *                 example: medico@mail.com
 *               contrasenia:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login correcto. Devuelve token JWT.
 *       400:
 *         description: Solicitud incorrecta.
 */
router.post(
  "/login",
  [
    check("email")
      .notEmpty()
      .withMessage("El correo electrónico es requerido!")
      .isEmail()
      .withMessage("Revisar el formato del correo electrónico."),
    check("contrasenia").notEmpty().withMessage("La contraseña es requerida."),
    validarCampos,
  ],
  authController.login,
);

export { router };
