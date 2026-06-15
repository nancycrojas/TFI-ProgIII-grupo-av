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

  eliminar = async (id_turno_reserva) => {
    const sql = `
    UPDATE turnos_reservas
    SET activo = 0
    WHERE id_turno_reserva = ?
    AND activo = 1
  `;

    const [result] = await pool.execute(sql, [id_turno_reserva]);

    if (result.affectedRows === 0) {
      return null;
    }

    return true;
  };

  turnosDeUnMedico = async (id_usuario) => {
    const sql = `SELECT 
      tr.id_turno_reserva,
      tr.fecha_hora,
      tr.valor_total,
      tr.atentido,
      p.id_paciente,
      CONCAT(up.nombres, ' ', up.apellido) AS paciente,
      os.nombre AS obra_social
    FROM usuarios AS u
    INNER JOIN medicos AS m 
      ON m.id_usuario = u.id_usuario
    INNER JOIN turnos_reservas AS tr 
      ON tr.id_medico = m.id_medico
    LEFT JOIN pacientes AS p 
      ON p.id_paciente = tr.id_paciente
    LEFT JOIN usuarios AS up 
      ON up.id_usuario = p.id_usuario
    LEFT JOIN obras_sociales AS os 
      ON os.id_obra_social = tr.id_obra_social
    WHERE u.id_usuario = ?
    AND tr.activo = 1
    ORDER BY tr.fecha_hora ASC`;
    const [turnos] = await pool.execute(sql, [id_usuario]);
    return turnos;
  };

  turnosDeUnPaciente = async (id_usuario) => {
    const sql = `SELECT 
      tr.id_turno_reserva,
      tr.fecha_hora,
      tr.valor_total,
      tr.atentido,
      m.id_medico,
      CONCAT(um.nombres, ' ', um.apellido) AS medico,
      e.nombre AS especialidad,
      os.nombre AS obra_social
    FROM usuarios AS u
    INNER JOIN pacientes AS p 
      ON p.id_usuario = u.id_usuario
    INNER JOIN turnos_reservas AS tr 
      ON tr.id_paciente = p.id_paciente
    LEFT JOIN medicos AS m 
      ON m.id_medico = tr.id_medico
    LEFT JOIN usuarios AS um 
      ON um.id_usuario = m.id_usuario
    LEFT JOIN especialidades AS e 
      ON e.id_especialidad = m.id_especialidad
    LEFT JOIN obras_sociales AS os 
      ON os.id_obra_social = tr.id_obra_social
    WHERE u.id_usuario = ?
    AND tr.activo = 1
    ORDER BY tr.fecha_hora ASC`;
    const [turnos] = await pool.execute(sql, [id_usuario]);
    return turnos;
  };
}
