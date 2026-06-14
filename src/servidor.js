import app from "./turnos.js";

process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`servidor iniciado OK en puerto ${PUERTO}`);
});
