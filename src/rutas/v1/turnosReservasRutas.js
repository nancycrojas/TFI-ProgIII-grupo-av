import express from "express";
import { check, param } from "express-validator";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

import TurnosReservasControlador from "../../controladores/turnosReservasControlador.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";

const router = express.Router();

const turnosReservasControlador = new TurnosReservasControlador();
const transformarDTO = new TransformarDTO();

/**
 * @swagger
 * /api/v1/turnos-reservas/por-especialidad:
 *   get:
 *     summary: Generar informe PDF de turnos por especialidad
 *     tags:
 *       - Turnos Reservas
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
  "/por-especialidad",
  autorizarUsuarios([3]),
  turnosReservasControlador.porEspecialidad,
);

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   get:
 *     summary: Listar turnos según el rol del usuario autenticado
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     description: >
 *       Si el usuario es médico, lista sus turnos propios.
 *       Si el usuario es paciente, lista sus turnos propios.
 *       Si el usuario es administrador, lista todos los turnos activos.
 *     responses:
 *       200:
 *         description: Lista de turnos obtenida correctamente.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/",
  autorizarUsuarios([1, 2, 3]),
  turnosReservasControlador.buscarTodas,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/medico/{id_medico}:
 *   get:
 *     summary: Listar turnos de un médico
 *     tags:
 *       - Turnos Reservas
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
 *         description: Lista de turnos del médico obtenida correctamente.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Médico no encontrado o sin turnos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/medico/:id_medico",
  autorizarUsuarios([3]),
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),
    validarCampos,
  ],
  turnosReservasControlador.buscarPorMedico,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/paciente/{id_paciente}:
 *   get:
 *     summary: Listar turnos de un paciente
 *     tags:
 *       - Turnos Reservas
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
 *         description: Lista de turnos del paciente obtenida correctamente.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Paciente no encontrado o sin turnos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/paciente/:id_paciente",
  autorizarUsuarios([3]),
  [
    param("id_paciente")
      .notEmpty()
      .withMessage("El id_paciente es obligatorio.")
      .isInt()
      .withMessage("El id_paciente debe ser un número entero."),
    validarCampos,
  ],
  turnosReservasControlador.buscarPorPaciente,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/{id_turno_reserva}:
 *   get:
 *     summary: Obtener un turno por ID
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_turno_reserva
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno encontrado.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Turno no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/:id_turno_reserva",
  autorizarUsuarios([3]),
  [
    param("id_turno_reserva")
      .notEmpty()
      .withMessage("El id_turno_reserva es obligatorio.")
      .isInt()
      .withMessage("El id_turno_reserva debe ser un número entero."),
    validarCampos,
  ],
  turnosReservasControlador.buscarPorId,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/{id_turno_reserva}/atendido:
 *   patch:
 *     summary: Marcar un turno como atendido
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_turno_reserva
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno a marcar como atendido
 *     responses:
 *       200:
 *         description: Turno marcado como atendido correctamente.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Turno no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch(
  "/:id_turno_reserva/atendido",
  autorizarUsuarios([1]),
  [
    param("id_turno_reserva")
      .notEmpty()
      .withMessage("El id_turno_reserva es obligatorio.")
      .isInt()
      .withMessage("El id_turno_reserva debe ser un número entero."),
    validarCampos,
  ],
  turnosReservasControlador.marcarAtendido,
);

/**
 * @swagger
 * /api/v1/turnos-reservas/{id_turno_reserva}:
 *   delete:
 *     summary: Eliminar un turno mediante soft delete
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_turno_reserva
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno a eliminar
 *     responses:
 *       200:
 *         description: Turno eliminado correctamente.
 *       400:
 *         description: Parámetro inválido.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Turno no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete(
  "/:id_turno_reserva",
  autorizarUsuarios([3]),
  [
    param("id_turno_reserva")
      .notEmpty()
      .withMessage("El id_turno_reserva es obligatorio.")
      .isInt()
      .withMessage("El id_turno_reserva debe ser un número entero."),
    validarCampos,
  ],
  turnosReservasControlador.eliminar,
);

/**
 * @swagger
 * /api/v1/turnos-reservas:
 *   post:
 *     summary: Registrar un nuevo turno
 *     tags:
 *       - Turnos Reservas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_medico
 *               - id_paciente
 *               - fecha_hora
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               id_paciente:
 *                 type: integer
 *                 example: 2
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-20 15:30:00"
 *     responses:
 *       201:
 *         description: Turno registrado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Médico, paciente u obra social no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post(
  "/",
  autorizarUsuarios([2, 3]),
  [
    check("id_medico").notEmpty().withMessage("El id_medico es obligatorio."),
    check("id_paciente")
      .notEmpty()
      .withMessage("El id_paciente es obligatoria."),
    check("fecha_hora").notEmpty().withMessage("La fecha_hora es obligatorio."),
    validarCampos,
  ],
  transformarDTO.turnosReservasCrearDTO,
  turnosReservasControlador.crear,
);

export { router };
