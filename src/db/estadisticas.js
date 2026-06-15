import { pool } from "./conexion.js";

export default class Estadisticas {
  // turnosPorEspecialidad = async () => {
  //   const sql = `CALL sp_turnos_por_especialidad()`;
  //   const [resultado] = await pool.query(sql);

  //   console.log(resultado[0]);
  //   return resultado[0];
  // };

  pacientesPorObraSocial = async () => {
    const sql = `CALL sp_pacientes_por_obra_social()`;
    const [resultado] = await pool.query(sql);
    return resultado[0];
  };
}
