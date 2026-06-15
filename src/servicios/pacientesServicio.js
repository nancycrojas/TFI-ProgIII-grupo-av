import Pacientes from "../db/pacientes.js";
import ObrasSocialesServicio from "./obrasSocialesServicio.js";

export default class PacientesServicio {
  constructor() {
    this.pacientes = new Pacientes();
    this.obrasSociales = new ObrasSocialesServicio();
  }

  buscarTodos = async () => {
    return this.pacientes.buscarTodos();
  };

  buscarPorId = (id_paciente) => {
    return this.pacientes.buscarPorId(id_paciente);
  };

  modificarObraSocial = async (id_paciente, id_obra_social) => {
    const paciente = await this.pacientes.buscarPorId(id_paciente);

    if (!paciente) {
      return null;
    }

    const obraSocial =
      await this.obrasSociales.buscarDatosParaTurno(id_obra_social);

    if (!obraSocial) {
      return null;
    }

    return this.pacientes.modificarObraSocial(id_paciente, id_obra_social);
  };
}
