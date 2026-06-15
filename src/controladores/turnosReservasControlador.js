import TurnosReservas from "../servicios/turnosReservasServicio.js";

export default class TurnosReservasControlador {
  constructor() {
    this.turnosReservas = new TurnosReservas();
  }

  crear = async (req, res) => {
    try {
      const turnoReserva = req.dto;

      const nuevoTurnoReserva = await this.turnosReservas.crear(turnoReserva);

      if (!nuevoTurnoReserva || nuevoTurnoReserva.length === 0) {
        return res.status(400).json({
          estado: false,
          mensaje: "No se pudo crear el turno.",
        });
      }

      return res.status(201).json({
        estado: true,
        msg: "Turno creado.",
        turnoReserva: nuevoTurnoReserva,
      });
    } catch (error) {
      console.log(`Error en POST /turnos-reservas ${error}`);
      res.status(500).json({
        estado: false,
        mensaje: "Error interno.",
      });
    }
  };

  buscarPorMedico = async (req, res) => {
    try {
      const { id_medico } = req.params;

      const turnosReservas =
        await this.turnosReservas.buscarPorMedico(id_medico);

      if (turnosReservas === null) {
        return res.status(404).json({
          estado: false,
          msg: "Médico no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Turnos del médico encontrados.",
        turnosReservas: turnosReservas,
      });
    } catch (error) {
      console.log(`Error en GET /turnos-reservas/medico/:id_medico ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  buscarPorPaciente = async (req, res) => {
    try {
      const { id_paciente } = req.params;

      const turnosReservas =
        await this.turnosReservas.buscarPorPaciente(id_paciente);

      if (turnosReservas === null) {
        return res.status(404).json({
          estado: false,
          msg: "Paciente no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Turnos del paciente encontrados.",
        turnosReservas: turnosReservas,
      });
    } catch (error) {
      console.log(
        `Error en GET /turnos-reservas/paciente/:id_paciente ${error}`,
      );

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  marcarAtendido = async (req, res) => {
    try {
      const { id_turno_reserva } = req.params;

      const resultado =
        await this.turnosReservas.marcarAtendido(id_turno_reserva);

      if (resultado === null) {
        return res.status(404).json({
          estado: false,
          msg: "Turno no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Turno marcado como atendido.",
      });
    } catch (error) {
      console.log(
        `Error en PATCH /turnos-reservas/:id_turno_reserva/atendido ${error}`,
      );

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  buscarTodas = async (req, res) => {
    try {
      const turnosReservas = await this.turnosReservas.buscarTodas(req.user);

      return res.status(200).json({
        estado: true,
        msg: "Turnos encontrados.",
        turnosReservas: turnosReservas,
      });
    } catch (error) {
      console.log(`Error en GET /turnos-reservas ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const { id_turno_reserva } = req.params;

      const turnoReserva =
        await this.turnosReservas.buscarPorId(id_turno_reserva);

      if (turnoReserva === null) {
        return res.status(404).json({
          estado: false,
          msg: "Turno no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Turno encontrado.",
        turnoReserva: turnoReserva,
      });
    } catch (error) {
      console.log(`Error en GET /turnos-reservas/:id_turno_reserva ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  eliminar = async (req, res) => {
    try {
      const { id_turno_reserva } = req.params;

      const resultado = await this.turnosReservas.eliminar(id_turno_reserva);

      if (resultado === null) {
        return res.status(404).json({
          estado: false,
          msg: "Turno no encontrado.",
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.log(
        `Error en DELETE /turnos-reservas/:id_turno_reserva ${error}`,
      );

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };
}
