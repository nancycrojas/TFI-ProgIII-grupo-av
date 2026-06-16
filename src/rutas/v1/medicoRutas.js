import apicache from "apicache";
import express from "express";
import { check, param } from "express-validator";
import MedicosControlador from "../../controladores/medicosControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const cache = apicache.middleware;

const medicosControlador = new MedicosControlador();

router.get(
  "/",
  autorizarUsuarios([2, 3]),
  cache("5 minutes"),
  medicosControlador.buscarTodos,
);

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
