import Especialidades from "../db/especialidades.js";

export default class EspecialidadesServicio {
  constructor() {
    this.especialidades = new Especialidades();
  }

  buscarTodas = () => {
    return this.especialidades.buscarTodas();
  };

  buscarPorId = (id_especialidad) => {
    return this.especialidades.buscarPorId(id_especialidad);
  };

  crear = (nombre) => {
    return this.especialidades.crear(nombre);
  };

  modificar = async (id_especialidad, nombre) => {
    const especialidad = await this.especialidades.buscarPorId(id_especialidad);

    if (!especialidad) {
      return null;
    }

    return this.especialidades.modificar(id_especialidad, nombre);
  };

  borrar = async (id_especialidad) => {
    const especialidad = await this.especialidades.buscarPorId(id_especialidad);

    if (!especialidad) {
      return null;
    }

    return this.especialidades.borrar(id_especialidad);
  };
}
