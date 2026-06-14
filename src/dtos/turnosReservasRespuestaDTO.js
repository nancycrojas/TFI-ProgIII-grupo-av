export default class TurnosReservasRespuestaDTO {
  constructor(objeto) {
    this.id_turno_reserva = objeto.id_turno_reserva;
    this.id_medico = objeto.id_medico;
    this.id_paciente = objeto.id_paciente;
    this.id_obra_social = objeto.id_obra_social;
    this.fecha_hora = objeto.fecha_hora;
    this.valor_total = objeto.valor_total;
  }
}
