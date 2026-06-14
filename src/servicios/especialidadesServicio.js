import apicache from "apicache";
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

  crear = async (especialidad) => {
    const nuevo_id = await this.especialidades.crear(especialidad);

    apicache.clear();

    return this.buscarPorId(nuevo_id);
  };

  modificar = async (id_especialidad, especialidad) => {
    const existe = await this.especialidades.buscarPorId(id_especialidad);

    if (existe.length === 0) {
      return null;
    }

    const modificado = await this.especialidades.modificar(
      id_especialidad,
      especialidad,
    );

    apicache.clear();

    return this.buscarPorId(modificado);
  };

  borrar = async (id_especialidad) => {
    const existe = await this.especialidades.buscarPorId(id_especialidad);

    if (existe.length === 0) {
      return null;
    }

    const resultado = await this.especialidades.borrar(id_especialidad);

    apicache.clear();

    return resultado;
  };
}
