import PacientesServicio from "../servicios/pacientesServicio.js";

export default class PacientesControlador {
  constructor() {
    this.pacientes = new PacientesServicio();
  }

  buscarTodos = async (req, res) => {
    try {
      const pacientes = await this.pacientes.buscarTodos();

      return res.status(200).json({
        estado: true,
        msg: "Pacientes encontrados.",
        pacientes: pacientes,
      });
    } catch (error) {
      console.log(`Error en GET /pacientes ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const { id_paciente } = req.params;

      const paciente = await this.pacientes.buscarPorId(id_paciente);

      if (!paciente) {
        return res.status(404).json({
          estado: false,
          msg: "Paciente no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Paciente encontrado.",
        paciente: paciente,
      });
    } catch (error) {
      console.log(`Error en GET /pacientes/:id_paciente ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  modificarObraSocial = async (req, res) => {
    try {
      const { id_paciente } = req.params;
      const { id_obra_social } = req.body;

      const resultado = await this.pacientes.modificarObraSocial(
        id_paciente,
        id_obra_social,
      );

      if (resultado === null) {
        return res.status(404).json({
          estado: false,
          msg: "Paciente u obra social no encontrada.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Obra social del paciente modificada.",
      });
    } catch (error) {
      console.log(`Error en PUT /pacientes/:id_paciente/obra-social ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };
}
