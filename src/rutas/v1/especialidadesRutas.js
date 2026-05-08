import express from "express";
import { check, param } from "express-validator";
import EspecialidadesControlador from "../../controladores/especialidadesControlador.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const router = express.Router();

const especialidadesControlador = new EspecialidadesControlador();

router.get("/", especialidadesControlador.buscarTodas);
router.get(
  "/:id_especialidad",
  [
    param("id_especialidad", "El parámetro debe ser entero").isInt(),
    validarCampos,
  ],
  especialidadesControlador.buscarPorId,
);
router.post(
  "/",
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

router.put(
  "/:id_especialidad",
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

router.delete(
  "/:id_especialidad",
  [
    param("id_especialidad", "El parámetro debe ser entero").isInt(),
    validarCampos,
  ],
  especialidadesControlador.borrar,
);

export { router };
