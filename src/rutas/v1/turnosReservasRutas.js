import express from "express";
import { check, param } from "express-validator";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

import TurnosReservasControlador from "../../controladores/turnosReservasControlador.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";

const router = express.Router();

const turnosReservasControlador = new TurnosReservasControlador();
const transformarDTO = new TransformarDTO();

router.get(
  "/",
  autorizarUsuarios([1, 2, 3]),
  turnosReservasControlador.buscarTodas,
);

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
