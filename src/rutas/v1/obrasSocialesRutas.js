import apicache from "apicache";
import express from "express";
import { check, param } from "express-validator";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

import ObrasSocialesControlador from "../../controladores/obrasSocialesControlador.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";

const router = express.Router();

const cache = apicache.middleware;

const obrasSocialesControlador = new ObrasSocialesControlador();
const transformarDTO = new TransformarDTO();

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   get:
 *     summary: Listar todas las obras sociales activas
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras sociales obtenida correctamente.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/",
  autorizarUsuarios([3]),
  cache("5 minutes"),
  obrasSocialesControlador.buscarTodas,
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id_obra_social}:
 *   get:
 *     summary: Obtener una obra social por ID
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     responses:
 *       200:
 *         description: Obra social encontrada.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Obra social no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  [
    param("id_obra_social", "El parámetro debe ser entero").isInt(),
    validarCampos,
  ],
  obrasSocialesControlador.buscarPorId,
);

/**
 * @swagger
 * /api/v1/obras-sociales:
 *   post:
 *     summary: Crear una nueva obra social
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - porcentaje_descuento
 *               - es_particular
 *             properties:
 *               nombre:
 *                 type: string
 *                 maxLength: 120
 *                 example: OSDE
 *               descripcion:
 *                 type: string
 *                 maxLength: 120
 *                 example: Obra social prepaga
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 0.1
 *               es_particular:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Obra social creada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post(
  "/",
  autorizarUsuarios([3]),
  [
    check("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio.")
      .isLength({ max: 120 })
      .withMessage("El nombre no debe ser mayor a 120 caracteres."),
    check("descripcion")
      .notEmpty()
      .withMessage("La descripción es obligatoria.")
      .isLength({ max: 120 })
      .withMessage("La descripción no debe ser mayor a 120 caracteres."),
    check("porcentaje_descuento")
      .notEmpty()
      .withMessage("El porcentaje_descuento es obligatorio.")
      .isFloat({ min: 0 })
      .withMessage(
        "El porcentaje_descuento debe ser numérico y mayor o igual a 0.",
      ),
    check("es_particular")
      .notEmpty()
      .withMessage("El es_particular es obligatorio.")
      .custom((value) => {
        return [true, false, 0, 1, "0", "1", "true", "false"].includes(value);
      })
      .withMessage("es_particular debe ser booleano o 0/1."),
    validarCampos,
  ],
  transformarDTO.obrasSocialesCrearDTO,
  obrasSocialesControlador.crear,
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id_obra_social}:
 *   put:
 *     summary: Modificar una obra social existente
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 maxLength: 120
 *                 example: Swiss Medical
 *               descripcion:
 *                 type: string
 *                 maxLength: 120
 *                 example: Obra social actualizada
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 0.15
 *               es_particular:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Obra social modificada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Obra social no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  [
    param("id_obra_social", "El parámetro debe ser entero").isInt(),
    check("nombre")
      .optional()
      .notEmpty()
      .withMessage("El nombre no puede estar vacío.")
      .isLength({ max: 120 })
      .withMessage("El nombre no debe ser mayor a 120 caracteres."),
    check("descripcion")
      .optional()
      .notEmpty()
      .withMessage("La descripción no puede estar vacía.")
      .isString()
      .withMessage("La descripción debe ser cádena de caracteres.")
      .isLength({ max: 120 })
      .withMessage("La descripción no debe ser mayor a 120 caracteres."),
    check("porcentaje_descuento")
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage("El porcentaje_descuento debe ser numérico entre 0 y 100."),
    check("es_particular")
      .optional()
      .custom((value) => {
        return [true, false, 0, 1, "0", "1", "true", "false"].includes(value);
      })
      .withMessage("es_particular debe ser booleano o 0/1."),
    validarCampos,
  ],
  transformarDTO.obrasSocialesActualizarDTO,
  obrasSocialesControlador.modificar,
);

/**
 * @swagger
 * /api/v1/obras-sociales/{id_obra_social}:
 *   delete:
 *     summary: Eliminar una obra social mediante soft delete
 *     tags:
 *       - Obras Sociales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_obra_social
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social a eliminar
 *     responses:
 *       200:
 *         description: Obra social eliminada correctamente.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Obra social no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete(
  "/:id_obra_social",
  autorizarUsuarios([3]),
  [
    param("id_obra_social", "El parámetro debe ser entero").isInt(),
    validarCampos,
  ],
  obrasSocialesControlador.eliminar,
);

export { router };
