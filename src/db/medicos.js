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

  buscarRelacionMedicoObraSocial = async (id_medico, id_obra_social) => {
    const sql = `
    SELECT * 
    FROM medicos_obras_sociales
    WHERE id_medico = ?
    AND id_obra_social = ?
    AND activo = 1
  `;

    const [relacion] = await pool.execute(sql, [id_medico, id_obra_social]);

    return relacion;
  };

  // relacionarConObraSocial = async (id_medico, obras_sociales) => {
  //   const conexion = await pool.getConnection();

  //   try {
  //     await conexion.beginTransaction();

  //     for (const os of obras_sociales) {
  //       const sql = `INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?,?);`;
  //       await conexion.execute(sql, [id_medico, os.id_obra_social]);
  //     }

  //     await conexion.commit();

  //     return true;
  //   } catch (error) {
  //     await conexion.rollback();
  //     console.log("Error al relacionar médico con obras sociales", error);
  //     return false;
  //   } finally {
  //     conexion.release();
  //   }
  // };

  relacionarConObraSocial = async (id_medico, obras_sociales) => {
    const conexion = await pool.getConnection();

    try {
      await conexion.beginTransaction();

      for (const os of obras_sociales) {
        const sqlBuscar = `
        SELECT *
        FROM medicos_obras_sociales
        WHERE id_medico = ?
        AND id_obra_social = ?
      `;

        const [relaciones] = await conexion.execute(sqlBuscar, [
          id_medico,
          os.id_obra_social,
        ]);

        if (relaciones.length > 0) {
          const relacion = relaciones[0];

          if (relacion.activo === 0) {
            const sqlReactivar = `
            UPDATE medicos_obras_sociales
            SET activo = 1
            WHERE id_medico_obra_social = ?
          `;

            await conexion.execute(sqlReactivar, [
              relacion.id_medico_obra_social,
            ]);
          }

          // Si ya existe y está activa, no hago nada.
        } else {
          const sqlInsert = `
          INSERT INTO medicos_obras_sociales 
          (id_medico, id_obra_social) 
          VALUES (?, ?)
        `;

          await conexion.execute(sqlInsert, [id_medico, os.id_obra_social]);
        }
      }

      await conexion.commit();

      return true;
    } catch (error) {
      await conexion.rollback();

      console.log("Error al relacionar médico con obras sociales", error);

      return false;
    } finally {
      conexion.release();
    }
  };

  buscarObrasSociales = async (id_medico) => {
    const sql = `
    SELECT os.*
    FROM medicos_obras_sociales mos
    INNER JOIN obras_sociales os 
      ON mos.id_obra_social = os.id_obra_social
    WHERE mos.id_medico = ?
    AND mos.activo = 1
    AND os.activo = 1
  `;

    const [obrasSociales] = await pool.execute(sql, [id_medico]);

    return obrasSociales;
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

  eliminarMedicoObraSocial = async (id_medico, id_obra_social) => {
    const sql = `
    UPDATE medicos_obras_sociales
    SET activo = 0
    WHERE id_medico = ?
    AND id_obra_social = ?
    AND activo = 1
  `;

    const [result] = await pool.execute(sql, [id_medico, id_obra_social]);

    if (result.affectedRows === 0) {
      return null;
    }

    return true;
  };
}
