import EspecialidadesServicio from "../servicios/especialidadesServicio.js";

export default class EspecialidadesControlador {
  constructor() {
    this.especialidades = new EspecialidadesServicio();
  }

  buscarTodas = async (req, res) => {
    try {
      const especialidades = await this.especialidades.buscarTodas();

      res.status(200).json({ estado: true, especialidades: especialidades });
    } catch (error) {
      console.log(`Error en GET /especialidades ${error}`);
      res.status(500).json({ estado: false, msg: "Error interno" });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const id_especialidad = req.params.id_especialidad;
      const especialidad =
        await this.especialidades.buscarPorId(id_especialidad);

      if (especialidad.length === 0) {
        return res.status(404).json({
          estado: false,
          msg: "Especialidad no encontrada.",
        });
      }

      res.status(200).json({
        estado: true,
        especialidad: especialidad,
      });
    } catch (error) {
      console.log(`Error en GET /especialidades/:id ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };

  crear = async (req, res) => {
    try {
      const { nombre } = req.body;

      const especialidad = {
        nombre: nombre,
      };

      const nuevaEspecialidad = await this.especialidades.crear(especialidad);

      if (!nuevaEspecialidad || nuevaEspecialidad.length === 0) {
        return res.status(400).json({
          estado: false,
          msg: "No se pudo crear la especialidad",
        });
      }

      res.status(201).json({
        estado: true,
        msg: "Especialidad creada",
        especialidad: nuevaEspecialidad,
      });
    } catch (error) {
      console.log(`Error en POST /especialidades ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };

  modificar = async (req, res) => {
    try {
      const id_especialidad = req.params.id_especialidad;
      const { nombre } = req.body;

      const especialidad = {
        nombre: nombre,
      };

      const especialidadModificada = await this.especialidades.modificar(
        id_especialidad,
        especialidad,
      );

      if (especialidadModificada === null) {
        return res.status(404).json({
          estado: false,
          msg: "Especialidad no encontrada",
        });
      }

      res.status(200).json({
        estado: true,
        msg: "Especialidad modificada",
        especialidad: especialidadModificada,
      });
    } catch (error) {
      console.log(`Error en PUT /especialidades/:id ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };

  borrar = async (req, res) => {
    try {
      const id_especialidad = req.params.id_especialidad;

      const resultado = await this.especialidades.borrar(id_especialidad);

      if (resultado === null) {
        return res.status(404).json({
          estado: false,
          msg: "Especialidad no encontrada",
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.log(`Error en DELETE /especialidades/:id ${error}`);

      res.status(500).json({
        estado: false,
        msg: "Error interno",
      });
    }
  };
}
