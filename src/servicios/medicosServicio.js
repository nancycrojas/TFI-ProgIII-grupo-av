import Especialidades from "../db/especialidades.js";
import Medicos from "../db/medicos.js";
import MedicosRespuestaDTO from "../dtos/medicosRespuestaDTO.js";

export default class MedicosServicio {
  constructor() {
    this.medicos = new Medicos();
    this.especialidades = new Especialidades();
  }

  buscarTodos = async () => {
    const datos = await this.medicos.buscarTodos();
    return datos.map((row) => new MedicosRespuestaDTO(row));
  };

  buscarPorId = async (id_medico) => {
    const datos = await this.medicos.buscarPorId(id_medico);

    return datos.map((row) => new MedicosRespuestaDTO(row));
  };

  buscarPorEspecialidad = async (id_especialidad) => {
    const datos = await this.medicos.buscarPorEspecialidad(id_especialidad);

    return datos.map((row) => new MedicosRespuestaDTO(row));
  };

  modificarEspecialidad = async (id_medico, id_especialidad) => {
    const medico = await this.medicos.buscarPorId(id_medico);

    if (medico.length === 0) {
      return null;
    }

    const especialidad = await this.especialidades.buscarPorId(id_especialidad);

    if (especialidad.length === 0) {
      return null;
    }

    return this.medicos.modificarEspecialidad(id_medico, id_especialidad);
  };
}
