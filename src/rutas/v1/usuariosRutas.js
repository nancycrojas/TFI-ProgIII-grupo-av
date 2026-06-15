import express from "express";
import multer from "multer";

import { check, param } from "express-validator";
import { storage } from "../../config/multer.js";
import UsuariosControlador from "../../controladores/usuariosControlador.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";
import TransformarDTO from "../../middlewares/transformarDTOs.js";
import { validarCampos } from "../../middlewares/validarCampos.js";

const upload = multer({ storage });
const transformarDTO = new TransformarDTO();
const router = express.Router();
const usuariosControlador = new UsuariosControlador();

router.put(
  "/:id_usuario",
  autorizarUsuarios([3]),
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
  upload.single("foto"),
  transformarDTO.usuariosActualizarDTO,
  usuariosControlador.modificar,
);

export { router };
