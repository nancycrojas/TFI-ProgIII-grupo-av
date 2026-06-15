import { pool } from "./conexion.js";

export default class TurnosReservas {
  crear = async (turnoReserva) => {
    const { id_medico, id_paciente, id_obra_social, fecha_hora, valor_total } =
      turnoReserva;
    const sql = `INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total)
             VALUES (?,?,?,?,?)`;
    const [result] = await pool.execute(sql, [
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valor_total,
    ]);
    if (result.affectedRows === 0) {
      return null;
    }
    return result.insertId;
  };

  buscarPorMedico = async (id_medico) => {
    const sql = `
    SELECT *
    FROM turnos_reservas
    WHERE id_medico = ?
    AND activo = 1
    ORDER BY fecha_hora ASC
  `;

    const [turnosReservas] = await pool.execute(sql, [id_medico]);

    return turnosReservas;
  };

  buscarPorPaciente = async (id_paciente) => {
    const sql = `
    SELECT *
    FROM turnos_reservas
    WHERE id_paciente = ?
    AND activo = 1
    ORDER BY fecha_hora ASC
  `;

    const [turnosReservas] = await pool.execute(sql, [id_paciente]);

    return turnosReservas;
  };

  buscarPorId = async (id_turno_reserva) => {
    const sql = `
    SELECT *
    FROM turnos_reservas
    WHERE id_turno_reserva = ?
    AND activo = 1
  `;

    const [turnoReserva] = await pool.execute(sql, [id_turno_reserva]);

    return turnoReserva[0];
  };

  marcarAtendido = async (id_turno_reserva) => {
    const sql = `
    UPDATE turnos_reservas
    SET atentido = 1
    WHERE id_turno_reserva = ?
    AND activo = 1
  `;

    const [result] = await pool.execute(sql, [id_turno_reserva]);

    if (result.affectedRows === 0) {
      return null;
    }

    return true;
  };

  buscarTodas = async () => {
    const sql = `
    SELECT *
    FROM turnos_reservas
    WHERE activo = 1
    ORDER BY fecha_hora ASC
  `;

    const [turnosReservas] = await pool.execute(sql);

    return turnosReservas;
  };
}
