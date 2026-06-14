import MedicosServicio from "../servicios/medicosServicio.js";

export default class MedicosControlador {
  constructor() {
    this.medicos = new MedicosServicio();
  }

  buscarTodos = async (req, res) => {
    try {
      const medicos = await this.medicos.buscarTodos();

      res.status(200).json({
        estado: true,
        msg: "Médicos encontrados.",
        medicos: medicos,
      });
    } catch (error) {
      console.log(`Error en GET /medicos ${error}`);
      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const id_medico = req.params.id_medico;

      const medico = await this.medicos.buscarPorId(id_medico);

      if (medico.length === 0) {
        return res.status(404).json({
          estado: false,
          msg: "Médico no encontrado.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Médico encontrado.",
        medico: medico,
      });
    } catch (error) {
      console.log(`Error en GET /medicos/:id_medico ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  buscarPorEspecialidad = async (req, res) => {
    try {
      const id_especialidad = req.params.id_especialidad;

      const medicos = await this.medicos.buscarPorEspecialidad(id_especialidad);

      return res.status(200).json({
        estado: true,
        msg: "Médicos encontrados.",
        medicos: medicos,
      });
    } catch (error) {
      console.log(
        `Error en GET /medicos/especialidad/:id_especialidad ${error}`,
      );

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };

  modificarEspecialidad = async (req, res) => {
    try {
      const id_medico = req.params.id_medico;
      const { id_especialidad } = req.body;

      const resultado = await this.medicos.modificarEspecialidad(
        id_medico,
        id_especialidad,
      );

      if (resultado === null) {
        return res.status(404).json({
          estado: false,
          msg: "Médico o especialidad no encontrada.",
        });
      }

      return res.status(200).json({
        estado: true,
        msg: "Especialidad del médico modificada.",
      });
    } catch (error) {
      console.log(`Error en PUT /medicos/:id_medico/especialidad ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno.",
      });
    }
  };
}
