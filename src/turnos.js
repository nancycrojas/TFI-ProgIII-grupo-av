import express from "express";
import fs from "fs";
import morgan from "morgan";

import { testConexion } from "./db/test-conexion.js";
import { validarContentType } from "./middlewares/validarContentType.js";
import { router as V1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as v1MedicosRutas } from "./rutas/v1/medicoRutas.js";
import { router as V1MedicosObrasSocialesRutas } from "./rutas/v1/medicosObrasSocialesRutas.js";
import { router as V1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";
import { router as v1TurnosReservas } from "./rutas/v1/turnosReservasRutas.js";

const app = express();

await testConexion();

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

app.use("/api/v1/especialidades", V1EspecialidadesRutas);
app.use("/api/v1/obras-sociales", V1ObrasSocialesRutas);
app.use("/api/v1/medicos", v1MedicosRutas);
app.use("/api/v1/medicos", V1MedicosObrasSocialesRutas);
app.use("/api/v1/turnos-reservas", v1TurnosReservas);

export default app;
