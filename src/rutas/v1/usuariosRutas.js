import express from "express";
import { upload } from "../../config/multer.js";

import { check, param } from "express-validator";
import UsuariosControlador from "../../controladores/usuariosControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const transformarDTO = new TransformarDTO();
const router = express.Router();
const usuariosControlador = new UsuariosControlador();

router.put(
  "/:id_usuario",
  autorizarUsuarios([3]),
  upload.single("foto"),
  [
    param("id_usuario", "El parámetro debe ser entero").isInt(),
    check("documento").optional(),
    check("apellido").optional(),
    check("nombres").optional(),
    check("email").optional(),
    check("foto_path").optional(),
    check("rol").optional(),
    validarCampos,
  ],
  transformarDTO.usuariosActualizarDTO,
  usuariosControlador.modificar,
);

export { router };
