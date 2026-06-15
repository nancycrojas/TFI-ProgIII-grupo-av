import TurnosReservas from "../db/turnosReservas.js";
import TurnosReservasRespuestaDTO from "../dtos/turnosReservasRespuestaDTO.js";
import MedicosServicio from "../servicios/medicosServicio.js";
import ObrasSocialesServicio from "../servicios/obrasSocialesServicio.js";
import PacientesServicio from "../servicios/pacientesServicio.js";

export default class TurnosReservasServicio {
  constructor() {
    this.turnosReservas = new TurnosReservas();
    this.medicos = new MedicosServicio();
    this.pacientes = new PacientesServicio();
    this.obrasSociales = new ObrasSocialesServicio();
  }

  crear = async (turnoReserva) => {
    const medico = await this.medicos.buscarDatosParaTurno(
      turnoReserva.id_medico,
    );

    if (!medico) {
      return null;
    }

    const paciente = await this.pacientes.buscarPorId(turnoReserva.id_paciente);

    if (!paciente) {
      return null;
    }

    const obra_social = await this.obrasSociales.buscarDatosParaTurno(
      paciente.id_obra_social,
    );

    if (!obra_social) {
      return null;
    }

    const valorConsulta = Number(medico.valor_consulta);
    const porcentajeDescuento = Number(obra_social.porcentaje_descuento);
    const esParticular = Number(obra_social.es_particular);

    let valor = valorConsulta;

    if (esParticular === 0) {
      valor = valorConsulta - porcentajeDescuento * valorConsulta;
    }

    turnoReserva.valor_total = valor;
    turnoReserva.id_obra_social = paciente.id_obra_social;

    const id_nuevo = await this.turnosReservas.crear(turnoReserva);

    const turnoReservaCreado = {
      id_turno_reserva: id_nuevo,
      id_medico: turnoReserva.id_medico,
      id_paciente: turnoReserva.id_paciente,
      id_obra_social: turnoReserva.id_obra_social,
      fecha_hora: turnoReserva.fecha_hora,
      valor_total: turnoReserva.valor_total,
    };

    return new TurnosReservasRespuestaDTO(turnoReservaCreado);
  };

  buscarPorMedico = async (id_medico) => {
    const medico = await this.medicos.buscarDatosParaTurno(id_medico);

    if (!medico) {
      return null;
    }

    return this.turnosReservas.buscarPorMedico(id_medico);
  };

  buscarPorPaciente = async (id_paciente) => {
    const paciente = await this.pacientes.buscarPorId(id_paciente);

    if (!paciente) {
      return null;
    }

    return this.turnosReservas.buscarPorPaciente(id_paciente);
  };

  marcarAtendido = async (id_turno_reserva) => {
    const turnoReserva =
      await this.turnosReservas.buscarPorId(id_turno_reserva);

    if (!turnoReserva) {
      return null;
    }

    if (Number(turnoReserva.atentido) === 1) {
      return true;
    }

    return this.turnosReservas.marcarAtendido(id_turno_reserva);
  };
}
