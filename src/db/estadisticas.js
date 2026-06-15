import { pool } from "./conexion.js";

export default class Estadisticas {
  turnosPorEspecialidad = async () => {
    const [resultado] = await pool.query("CALL sp_turnos_por_especialidad()");
    return resultado[0];
  };

  pacientesPorObraSocial = async () => {
    const [resultado] = await pool.query("CALL sp_pacientes_por_obra_social()");
    return resultado[0];
  };
}
