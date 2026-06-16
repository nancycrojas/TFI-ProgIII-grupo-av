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

/**
 * @swagger
 * /api/v1/usuarios/{id_usuario}:
 *   put:
 *     summary: Modificar datos de un usuario y opcionalmente subir una foto
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a modificar
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documento:
 *                 type: string
 *                 example: "30123456"
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *               nombres:
 *                 type: string
 *                 example: Juan Carlos
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan.perez@mail.com
 *               rol:
 *                 type: integer
 *                 example: 2
 *                 description: 1 médico, 2 paciente, 3 administrador
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del usuario
 *     responses:
 *       200:
 *         description: Usuario modificado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no enviado o inválido.
 *       403:
 *         description: Usuario sin permisos.
 *       404:
 *         description: Usuario no encontrado.
 *       415:
 *         description: Content-Type no soportado.
 *       500:
 *         description: Error interno del servidor.
 */
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
    check("rol").optional(),
    validarCampos,
  ],
  transformarDTO.usuariosActualizarDTO,
  usuariosControlador.modificar,
);

export { router };
