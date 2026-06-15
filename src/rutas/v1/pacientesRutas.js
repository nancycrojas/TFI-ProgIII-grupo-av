import express from "express";
import { check, param } from "express-validator";

import PacientesControlador from "../../controladores/pacientesControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const pacientesControlador = new PacientesControlador();

router.get("/", autorizarUsuarios([3]), pacientesControlador.buscarTodos);

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
