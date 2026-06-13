import express from "express";

import { testConexion } from "./db/test-conexion.js";
import { validarContentType } from "./middlewares/validarContentType.js";
import { router as V1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";
import { router as v1MedicosRutas } from "./rutas/v1/medicoRutas.js";
import { router as V1ObrasSocialesRutas } from "./rutas/v1/obrasSocialesRutas.js";

const app = express();

await testConexion();

app.use(validarContentType);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ estado: true, msg: "API OK" });
});

app.use("/api/v1/especialidades", V1EspecialidadesRutas);
app.use("/api/v1/obras-sociales", V1ObrasSocialesRutas);
app.use("/api/v1/medicos", v1MedicosRutas);

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`servidor iniciado OK en puerto ${PUERTO}`);
});
