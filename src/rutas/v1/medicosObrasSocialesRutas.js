import express from "express";
import { check, param } from "express-validator";

import MedicosObrasSocialesControlador from "../../controladores/medicosObrasSocialesControlador.js";

import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const medicosObrasSocialesControlador = new MedicosObrasSocialesControlador();

const transformarDTO = new TransformarDTO();

/**
 * @swagger
 * /api/v1/medicos/{id_medico}/obras-sociales:
 *   get:
 *     summary: Listar obras sociales asociadas a un médico
 *     tags:
 *       - Médicos Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Lista de obras sociales asociadas al médico.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Médico no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/:id_medico/obras-sociales",
  autorizarUsuarios([3]),
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),
    validarCampos,
  ],
  medicosObrasSocialesControlador.buscarObrasSociales,
);

/**
 * @swagger
 * /api/v1/medicos/{id_medico}/obras-sociales:
 *   post:
 *     summary: Asociar obras sociales a un médico
 *     tags:
 *       - Médicos Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - obras_sociales
 *             properties:
 *               obras_sociales:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - id_obra_social
 *                   properties:
 *                     id_obra_social:
 *                       type: integer
 *                       example: 1
 *           example:
 *             obras_sociales:
 *               - id_obra_social: 1
 *               - id_obra_social: 2
 *     responses:
 *       201:
 *         description: Obras sociales asociadas correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Médico u obra social no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post(
  "/:id_medico/obras-sociales",
  autorizarUsuarios([3]),
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),
    check("obras_sociales")
      .isArray({ min: 1 })
      .withMessage(
        "obras_sociales debe ser un array con al menos un elemento.",
      ),
    check("obras_sociales.*.id_obra_social")
      .notEmpty()
      .withMessage("Cada obra social debe tener id_obra_social.")
      .isInt()
      .withMessage("id_obra_social debe ser un número entero."),
    validarCampos,
  ],
  transformarDTO.medicosAsociarDTO,
  medicosObrasSocialesControlador.asociarMedicoObrasSociales,
);

/**
 * @swagger
 * /api/v1/medicos/{id_medico}/obras-sociales/{id_obra_social}:
 *   delete:
 *     summary: Eliminar asociación entre médico y obra social
 *     tags:
 *       - Médicos Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     responses:
 *       200:
 *         description: Asociación eliminada correctamente.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Asociación no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete(
  "/:id_medico/obras-sociales/:id_obra_social",
  autorizarUsuarios([3]),
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),

    param("id_obra_social")
      .notEmpty()
      .withMessage("El id_obra_social es obligatorio.")
      .isInt()
      .withMessage("El id_obra_social debe ser un número entero."),

    validarCampos,
  ],
  medicosObrasSocialesControlador.eliminarMedicoObraSocial,
);

export { router };
