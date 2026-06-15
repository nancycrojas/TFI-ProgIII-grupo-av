import express from "express";
import { check, param } from "express-validator";

import MedicosObrasSocialesControlador from "../../controladores/medicosObrasSocialesControlador.js";

import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const medicosObrasSocialesControlador = new MedicosObrasSocialesControlador();

const transformarDTO = new TransformarDTO();

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
