import apicache from "apicache";
import express from "express";
import { check, param } from "express-validator";
import EspecialidadesControlador from "../../controladores/especialidadesControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const cache = apicache.middleware;

const especialidadesControlador = new EspecialidadesControlador();

/**
 * @swagger
 * /api/v1/especialidades:
 *   get:
 *     summary: Listar especialidades activas
 *     tags:
 *       - Especialidades
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 */
router.get(
  "/",
  autorizarUsuarios([2, 3]),
  cache("5 minutes"),
  especialidadesControlador.buscarTodas,
);

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   get:
 *     summary: Obtener una especialidad por ID
 *     tags:
 *       - Especialidades
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
 *         description: Especialidad encontrada.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Especialidad no encontrada.
 */
router.get(
  "/:id_especialidad",
  autorizarUsuarios([2, 3]),
  [
    param("id_especialidad", "El parámetro debe ser entero").isInt(),
    validarCampos,
  ],
  especialidadesControlador.buscarPorId,
);

/**
 * @swagger
 * /api/v1/especialidades:
 *   post:
 *     summary: Crear una nueva especialidad
 *     tags:
 *       - Especialidades
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
 *             properties:
 *               nombre:
 *                 type: string
 *                 maxLength: 120
 *                 example: Cardiología
 *     responses:
 *       201:
 *         description: Especialidad creada correctamente.
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
      .withMessage("El nombre es obligatorio")
      .isLength({ max: 120 })
      .withMessage("El nombre no debe ser mayor a 120 caracteres"),
    validarCampos,
  ],
  especialidadesControlador.crear,
);

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   put:
 *     summary: Modificar una especialidad existente
 *     tags:
 *       - Especialidades
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 maxLength: 120
 *                 example: Dermatología
 *     responses:
 *       200:
 *         description: Especialidad modificada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Especialidad no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put(
  "/:id_especialidad",
  autorizarUsuarios([3]),
  [
    param("id_especialidad", "El parámetro debe ser entero").isInt(),
    check("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ max: 120 })
      .withMessage("El nombre no debe ser mayor a 120 caracteres"),
    validarCampos,
  ],
  especialidadesControlador.modificar,
);

/**
 * @swagger
 * /api/v1/especialidades/{id_especialidad}:
 *   delete:
 *     summary: Eliminar una especialidad mediante soft delete
 *     tags:
 *       - Especialidades
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_especialidad
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad a eliminar
 *     responses:
 *       200:
 *         description: Especialidad eliminada correctamente.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Especialidad no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete(
  "/:id_especialidad",
  autorizarUsuarios([3]),
  [
    param("id_especialidad", "El parámetro debe ser entero").isInt(),
    validarCampos,
  ],
  especialidadesControlador.borrar,
);

export { router };
