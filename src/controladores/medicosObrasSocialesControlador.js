import MedicosObrasSocialesServicio from "../servicios/medicosObrasSocialesServicio.js";

export default class MedicosObrasSocialesControlador {
  constructor() {
    this.medicosObrasSociales = new MedicosObrasSocialesServicio();
  }

  asociarMedicoObrasSociales = async (req, res) => {
    try {
      const { id_medico, obras_sociales } = req.dto;

      const relacion =
        await this.medicosObrasSociales.asociarMedicoObrasSociales(
          id_medico,
          obras_sociales,
        );

      if (relacion === null) {
        return res.status(404).json({
          estado: false,
          msg: "Médico no encontrado.",
        });
      }

      if (!relacion) {
        return res.status(400).json({
          estado: false,
          msg: "No se crearon las relaciones",
        });
      }

      return res.status(201).json({
        estado: true,
        msg: "Médico y obras sociales relacionadas",
      });
    } catch (error) {
      console.log(`Error en POST /medicos/:id_medico/obras-sociales ${error}`);
      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  buscarObrasSociales = async (req, res) => {
    try {
      const id_medico = req.params.id_medico;

      const obrasSociales =
        await this.medicosObrasSociales.buscarObrasSociales(id_medico);

      if (obrasSociales === null) {
        return res.status(404).json({
          estado: false,
          msg: "Médico no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Obras sociales del médico encontradas.",
        obrasSociales: obrasSociales,
      });
    } catch (error) {
      console.log(`Error en GET /medicos/:id_medico/obras-sociales ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  eliminarMedicoObraSocial = async (req, res) => {
    try {
      const { id_medico, id_obra_social } = req.params;

      const resultado =
        await this.medicosObrasSociales.eliminarMedicoObraSocial(
          id_medico,
          id_obra_social,
        );

      if (resultado === null) {
        return res.status(404).json({
          estado: false,
          msg: "Relación médico-obra social no encontrada.",
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.log(
        `Error en DELETE /medicos/:id_medico/obras-sociales/:id_obra_social ${error}`,
      );

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };
}
