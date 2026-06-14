import Medicos from "../db/medicos.js";
import MedicosObrasSociales from "../db/medicosObrasSociales.js";
import ObrasSocialesRespuestaDTO from "../dtos/obrasSocialesRespuestaDTO.js";

export default class MedicosObrasSocialesServicio {
  constructor() {
    this.medicos = new Medicos();
    this.medicosObrasSociales = new MedicosObrasSociales();
  }

  asociarMedicoObrasSociales = async (id_medico, obras_sociales) => {
    const medico = await this.medicos.buscarPorId(id_medico);

    if (medico.length === 0) {
      return null;
    }

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
