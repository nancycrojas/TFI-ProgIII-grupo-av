import { pool } from "./conexion.js";

export default class Pacientes {
  buscarTodos = async () => {
    const sql = `
      SELECT 
        p.id_paciente,
        p.id_usuario,
        u.nombres,
        u.apellido,
        u.email,
        p.id_obra_social,
        os.nombre AS obra_social
      FROM pacientes AS p
      INNER JOIN usuarios AS u
        ON u.id_usuario = p.id_usuario
      LEFT JOIN obras_sociales AS os
        ON os.id_obra_social = p.id_obra_social
      WHERE u.activo = 1
      ORDER BY u.apellido ASC, u.nombres ASC
    `;

    const [pacientes] = await pool.execute(sql);

    return pacientes;
  };

  buscarPorId = async (id_paciente) => {
    const sql = `
      SELECT 
        p.id_paciente,
        p.id_usuario,
        u.nombres,
        u.apellido,
        u.email,
        p.id_obra_social,
        os.nombre AS obra_social
      FROM pacientes AS p
      INNER JOIN usuarios AS u
        ON u.id_usuario = p.id_usuario
      LEFT JOIN obras_sociales AS os
        ON os.id_obra_social = p.id_obra_social
      WHERE p.id_paciente = ?
      AND u.activo = 1
    `;

    const [paciente] = await pool.execute(sql, [id_paciente]);

    return paciente[0];
  };

  modificarObraSocial = async (id_paciente, id_obra_social) => {
    const sql = `
      UPDATE pacientes
      SET id_obra_social = ?
      WHERE id_paciente = ?
    `;

    const [result] = await pool.execute(sql, [id_obra_social, id_paciente]);

    if (result.affectedRows === 0) {
      return null;
    }

    return true;
  };
}
