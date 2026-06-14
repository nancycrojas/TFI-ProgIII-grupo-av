import apicache from "apicache";
import express from "express";
import { check, param } from "express-validator";
import { validarCampos } from "../../middlewares/validarCampos.js";

import ObrasSocialesControlador from "../../controladores/obrasSocialesControlador.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";

const router = express.Router();

const cache = apicache.middleware;

const obrasSocialesControlador = new ObrasSocialesControlador();
const transformarDTO = new TransformarDTO();

router.get("/", cache("5 minutes"), obrasSocialesControlador.buscarTodas);

router.get(
  "/:id_obra_social",
  [
    param("id_obra_social", "El parámetro debe ser entero").isInt(),
    validarCampos,
  ],
  obrasSocialesControlador.buscarPorId,
);

router.post(
  "/",
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

router.put(
  "/:id_obra_social",
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

router.delete(
  "/:id_obra_social",
  [
    param("id_obra_social", "El parámetro debe ser entero").isInt(),
    validarCampos,
  ],
  obrasSocialesControlador.eliminar,
);

export { router };
