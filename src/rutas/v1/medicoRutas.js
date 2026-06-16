import apicache from "apicache";
import express from "express";
import { check, param } from "express-validator";
import MedicosControlador from "../../controladores/medicosControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const cache = apicache.middleware;

const medicosControlador = new MedicosControlador();

/**
 * @swagger
 * /api/v1/medicos:
 *   get:
 *     summary: Listar todos los médicos activos
 *     tags:
 *       - Médicos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/",
  autorizarUsuarios([2, 3]),
  cache("5 minutes"),
  medicosControlador.buscarTodos,
);

/**
 * @swagger
 * /api/v1/medicos/especialidad/{id_especialidad}:
 *   get:
 *     summary: Listar médicos por especialidad
 *     tags:
 *       - Médicos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Lista de médicos de la especialidad indicada.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: No se encontraron médicos para esa especialidad.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/especialidad/:id_especialidad",
  autorizarUsuarios([2, 3]),
  [
    param("id_especialidad")
      .notEmpty()
      .withMessage("El id_especialidad es obligatorio.")
      .isInt()
      .withMessage("El id_especialidad debe ser un número entero."),
    validarCampos,
  ],
  medicosControlador.buscarPorEspecialidad,
);

/**
 * @swagger
 * /api/v1/medicos/{id_medico}/especialidad:
 *   put:
 *     summary: Asociar o modificar la especialidad de un médico
 *     tags:
 *       - Médicos
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
 *               - id_especialidad
 *             properties:
 *               id_especialidad:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Especialidad del médico modificada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Médico o especialidad no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put(
  "/:id_medico/especialidad",
  autorizarUsuarios([3]),
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),

    check("id_especialidad")
      .notEmpty()
      .withMessage("El id_especialidad es obligatorio.")
      .isInt()
      .withMessage("El id_especialidad debe ser un número entero."),

    validarCampos,
  ],
  medicosControlador.modificarEspecialidad,
);

/**
 * @swagger
 * /api/v1/medicos/{id_medico}:
 *   get:
 *     summary: Obtener un médico por ID
 *     tags:
 *       - Médicos
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
 *         description: Médico encontrado.
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
  "/:id_medico",
  autorizarUsuarios([3]),
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),
    validarCampos,
  ],
  medicosControlador.buscarPorId,
);

export { router };
