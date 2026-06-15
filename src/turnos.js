import express from "express";
import fs from "fs";
import morgan from "morgan";
import passport from "passport";

// IMPORTAMOS LA ESTRATEGIA A USAR Y LA FORMA DE VALIDAR.
import { estrategia, validacion } from "./config/passport.js";

import { testConexion } from "./db/test-conexion.js";
import { validarContentType } from "./middlewares/validarContentType.js";
import { router as V1AuthRutas } from "./rutas/v1/authRutas.js";
import { router as V1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as V1MedicosRutas } from "./rutas/v1/medicoRutas.js";
import { router as V1MedicosObrasSocialesRutas } from "./rutas/v1/medicosObrasSocialesRutas.js";
import { router as V1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";
import { router as V1TurnosReservas } from "./rutas/v1/turnosReservasRutas.js";

const app = express();

await testConexion();

// CONFIGURACION PASSPORT
passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

let log = fs.createWriteStream("./accesos.log", {
  flags: "a",
});

app.use(morgan("dev"));
app.use(morgan("combined", { stream: log }));

app.use(validarContentType);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ estado: true, msg: "API OK" });
});

// RUTAS QUE NECESITAN AUTORIZACIÓN
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

app.use("/api/v1/auth", V1AuthRutas);

export default app;
