import express from "express";
import { check, param } from "express-validator";

import PacientesControlador from "../../controladores/pacientesControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const pacientesControlador = new PacientesControlador();

/**
 * @swagger
 * /api/v1/pacientes/por-obra-social:
 *   get:
 *     summary: Generar informe PDF de pacientes por obra social
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado correctamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/por-obra-social",
  autorizarUsuarios([3]),
  pacientesControlador.porObraSocial,
);

/**
 * @swagger
 * /api/v1/pacientes:
 *   get:
 *     summary: Listar todos los pacientes activos
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes obtenida correctamente.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", autorizarUsuarios([3]), pacientesControlador.buscarTodos);

/**
 * @swagger
 * /api/v1/pacientes/{id_paciente}:
 *   get:
 *     summary: Obtener un paciente por ID
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Paciente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/:id_paciente",
  autorizarUsuarios([3]),
  [
    param("id_paciente")
      .notEmpty()
      .withMessage("El id_paciente es obligatorio.")
      .isInt()
      .withMessage("El id_paciente debe ser un número entero."),
    validarCampos,
  ],
  pacientesControlador.buscarPorId,
);

/**
 * @swagger
 * /api/v1/pacientes/{id_paciente}/obra-social:
 *   put:
 *     summary: Asociar o modificar la obra social de un paciente
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_obra_social
 *             properties:
 *               id_obra_social:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Obra social del paciente modificada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Paciente u obra social no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put(
  "/:id_paciente/obra-social",
  autorizarUsuarios([3]),
  [
    param("id_paciente")
      .notEmpty()
      .withMessage("El id_paciente es obligatorio.")
      .isInt()
      .withMessage("El id_paciente debe ser un número entero."),

    check("id_obra_social")
      .notEmpty()
      .withMessage("El id_obra_social es obligatorio.")
      .isInt()
      .withMessage("El id_obra_social debe ser un número entero."),

    validarCampos,
  ],
  pacientesControlador.modificarObraSocial,
);

export { router };
