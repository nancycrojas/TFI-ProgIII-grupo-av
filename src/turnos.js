import cors from "cors";
import express from "express";
import fs from "fs";
import morgan from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import { estrategia, validacion } from "./config/passport.js";
import { testConexion } from "./db/test-conexion.js";
import { validarContentType } from "./middlewares/validarContentType.js";
import { router as V1AuthRutas } from "./rutas/v1/authRutas.js";
import { router as V1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as V1MedicosRutas } from "./rutas/v1/medicoRutas.js";
import { router as V1MedicosObrasSocialesRutas } from "./rutas/v1/medicosObrasSocialesRutas.js";
import { router as V1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";
import { router as V1PacientesRutas } from "./rutas/v1/pacientesRutas.js";
import { router as V1TurnosReservas } from "./rutas/v1/turnosReservasRutas.js";
import { router as V1Usuarios } from "./rutas/v1/usuariosRutas.js";

const app = express();

await testConexion();

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

let log = fs.createWriteStream("./accesos.log", {
  flags: "a",
});

app.use(morgan("dev"));
app.use(morgan("combined", { stream: log }));

app.use(validarContentType);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ estado: true, msg: "API OK" });
});

app.use(
  "/api/v1/especialidades",
  passport.authenticate("jwt", { session: false }),
  V1EspecialidadesRutas,
);
app.use(
  "/api/v1/turnos-reservas",
  passport.authenticate("jwt", { session: false }),
  V1TurnosReservas,
);
app.use(
  "/api/v1/medicos",
  passport.authenticate("jwt", { session: false }),
  V1MedicosRutas,
);
app.use(
  "/api/v1/medicos",
  passport.authenticate("jwt", { session: false }),
  V1MedicosObrasSocialesRutas,
);
app.use(
  "/api/v1/obras-sociales",
  passport.authenticate("jwt", { session: false }),
  V1ObrasSocialesRutas,
);
app.use(
  "/api/v1/pacientes",
  passport.authenticate("jwt", { session: false }),
  V1PacientesRutas,
);
app.use(
  "/api/v1/usuarios",
  passport.authenticate("jwt", { session: false }),
  V1Usuarios,
);

app.use("/api/v1/auth", V1AuthRutas);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
