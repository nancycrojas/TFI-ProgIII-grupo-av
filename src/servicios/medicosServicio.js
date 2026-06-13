import Especialidades from "../db/especialidades.js";
import Medicos from "../db/medicos.js";
import MedicosObrasSociales from "../db/medicosObrasSociales.js";
import MedicosRespuestaDTO from "../dtos/medicosRespuestaDTO.js";
import ObrasSocialesRespuestaDTO from "../dtos/obrasSocialesRespuestaDTO.js";

export default class MedicosServicio {
  constructor() {
    this.medicos = new Medicos();
    this.medicosObrasSociales = new MedicosObrasSociales();
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

  asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
    const idsUnicos = [
      ...new Set(obras_sociales.map((os) => os.id_obra_social)),
    ];

    const obrasSocialesNuevas = [];

    for (const id_obra_social of idsUnicos) {
      const existe =
        await this.medicosObrasSociales.buscarRelacionMedicoObraSocial(
          id_medico,
          id_obra_social,
        );

      if (existe.length === 0) {
        obrasSocialesNuevas.push({ id_obra_social });
      }
    }

    if (obrasSocialesNuevas.length === 0) {
      return false;
    }

    return this.medicosObrasSociales.relacionarConObraSocial(
      id_medico,
      obrasSocialesNuevas,
    );
  };

  buscarObrasSociales = async (id_medico) => {
    const medico = await this.medicos.buscarPorId(id_medico);

    if (medico.length === 0) {
      return null;
    }

    const datos =
      await this.medicosObrasSociales.buscarObrasSociales(id_medico);

    return datos.map((row) => new ObrasSocialesRespuestaDTO(row));
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

  eliminarMedicoObraSocial = async (id_medico, id_obra_social) => {
    const relacion =
      await this.medicosObrasSociales.buscarRelacionMedicoObraSocial(
        id_medico,
        id_obra_social,
      );

    if (relacion.length === 0) {
      return null;
    }

    return this.medicosObrasSociales.eliminarMedicoObraSocial(
      id_medico,
      id_obra_social,
    );
  };
}
