import { pool } from "./conexion.js";

export default class Medicos {
  buscarTodos = async () => {
    const sql = "SELECT * FROM v_medicos";
    const [medicos] = await pool.execute(sql);
    return medicos;
  };

  buscarPorId = async (id_medico) => {
    const sql = "SELECT * FROM v_medicos WHERE id_medico = ?";

    const [medico] = await pool.execute(sql, [id_medico]);

    return medico;
  };

  buscarPorEspecialidad = async (id_especialidad) => {
    const sql = `
    SELECT v.*
    FROM v_medicos v
    INNER JOIN medicos m ON v.id_medico = m.id_medico
    WHERE m.id_especialidad = ?
  `;

    const [medicos] = await pool.execute(sql, [id_especialidad]);

    return medicos;
  };

  modificarEspecialidad = async (id_medico, id_especialidad) => {
    const sql = `
    UPDATE medicos 
    SET id_especialidad = ? 
    WHERE id_medico = ?
  `;

    const [result] = await pool.execute(sql, [id_especialidad, id_medico]);

    if (result.affectedRows === 0) {
      return null;
    }

    return true;
  };

  buscarDatosParaTurno = async (id_medico) => {
    const sql = `
    SELECT id_medico, valor_consulta
    FROM medicos
    WHERE id_medico = ?
  `;

    const [medico] = await pool.execute(sql, [id_medico]);

    return medico[0];
  };
}
