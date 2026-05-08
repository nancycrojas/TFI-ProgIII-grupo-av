import { pool } from "./conexion.js";

export default class Especialidades {
  buscarTodas = async () => {
    const sql = "SELECT * FROM especialidades WHERE activo = 1";

    const [especialidades] = await pool.query(sql);

    return especialidades;
  };

  buscarPorId = async (id_especialidad) => {
    const sql =
      "SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?";

    const [especialidades] = await pool.execute(sql, [id_especialidad]);

    return especialidades[0];
  };

  crear = async (nombre) => {
    const sql = "INSERT INTO especialidades (nombre, activo) VALUES (?, 1)";

    const [result] = await pool.execute(sql, [nombre]);

    return result;
  };

  modificar = async (id_especialidad, nombre) => {
    const sql =
      "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1";

    const [result] = await pool.execute(sql, [nombre, id_especialidad]);

    return result;
  };

  borrar = async (id_especialidad) => {
    const sql =
      "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ? AND activo = 1";

    const [result] = await pool.execute(sql, [id_especialidad]);

    return result;
  };
}
