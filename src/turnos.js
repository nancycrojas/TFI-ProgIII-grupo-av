import express from "express";

import { router as V1EspecialidadesRutas } from "./rutas/v1/especialidadesRutas.js";

import { testConexion } from "./db/test-conexion.js";

const app = express();

await testConexion();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ estado: true, msg: "API OK" });
});

app.use("/api/v1/especialidades", V1EspecialidadesRutas);

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`servidor iniciado OK en puerto ${PUERTO}`);
});
