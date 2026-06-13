import express from "express";
import { check, param } from "express-validator";
import MedicosControlador from "../../controladores/medicosControlador.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const medicosControlador = new MedicosControlador();
const transformarDTO = new TransformarDTO();

router.get("/", medicosControlador.buscarTodos);

router.get(
  "/especialidad/:id_especialidad",
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

router.get(
  "/:id_medico/obras-sociales",
  [
    param("id_medico")
      .notEmpty()
      .withMessage("El id_medico es obligatorio.")
      .isInt()
      .withMessage("El id_medico debe ser un número entero."),
    validarCampos,
  ],
  medicosControlador.buscarObrasSociales,
);

router.put(
  "/:id_medico/especialidad",
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

router.delete(
  "/:id_medico/obras-sociales/:id_obra_social",
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
  medicosControlador.eliminarMedicoObraSocial,
);

router.get(
  "/:id_medico",
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

router.post(
  "/:id_medico/obras-sociales",
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
  medicosControlador.asociarMedicoObrasSociales,
);

export { router };
