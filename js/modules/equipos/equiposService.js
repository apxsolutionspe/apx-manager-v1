import { localStorageService } from "../../storage/localStorage.js";
import { isRequired } from "../../utils/validators.js";

const COLLECTION_NAME = "equipos";

export const EQUIPO_TIPOS = ["Laptop", "Desktop", "Servidor", "Impresora", "Red", "Movil", "Otro"];
export const EQUIPO_ESTADOS_FISICOS = ["Bueno", "Regular", "Dañado", "Incompleto"];

const normalizeEquipo = (equipoData) => ({
  fechaRecepcion: equipoData.fechaRecepcion || new Date().toISOString().slice(0, 10),
  clienteId: equipoData.clienteId ?? "",
  tipoEquipo: equipoData.tipoEquipo ?? EQUIPO_TIPOS[0],
  marca: equipoData.marca?.trim() ?? "",
  modelo: equipoData.modelo?.trim() ?? "",
  serie: equipoData.serie?.trim() ?? "",
  accesorios: equipoData.accesorios?.trim() ?? "",
  estadoFisico: equipoData.estadoFisico ?? EQUIPO_ESTADOS_FISICOS[0],
  problemaReportado: equipoData.problemaReportado?.trim() ?? "",
  observaciones: equipoData.observaciones?.trim() ?? "",
});

export const validateEquipo = (equipoData) => {
  const errors = {};

  if (!isRequired(equipoData.fechaRecepcion)) {
    errors.fechaRecepcion = "La fecha de recepcion es obligatoria.";
  }

  if (!isRequired(equipoData.clienteId)) {
    errors.clienteId = "Selecciona un cliente.";
  }

  if (!EQUIPO_TIPOS.includes(equipoData.tipoEquipo)) {
    errors.tipoEquipo = "El tipo de equipo no es valido.";
  }

  if (!isRequired(equipoData.marca)) {
    errors.marca = "La marca es obligatoria.";
  }

  if (!isRequired(equipoData.modelo)) {
    errors.modelo = "El modelo es obligatorio.";
  }

  if (!isRequired(equipoData.serie)) {
    errors.serie = "La serie es obligatoria.";
  }

  if (!EQUIPO_ESTADOS_FISICOS.includes(equipoData.estadoFisico)) {
    errors.estadoFisico = "El estado fisico no es valido.";
  }

  if (!isRequired(equipoData.problemaReportado)) {
    errors.problemaReportado = "El problema reportado es obligatorio.";
  }

  return errors;
};

export const createEquiposService = (storageService = localStorageService) => {
  const getClientes = () =>
    storageService
      .getAll("clientes")
      .sort((firstClient, secondClient) => firstClient.nombre.localeCompare(secondClient.nombre));

  const findClienteById = (clienteId) =>
    getClientes().find((cliente) => cliente.id === clienteId) ?? null;

  const getEquipos = () =>
    storageService
      .getAll(COLLECTION_NAME)
      .sort((firstEquipment, secondEquipment) =>
        new Date(secondEquipment.fechaRecepcion) - new Date(firstEquipment.fechaRecepcion),
      );

  const findEquipoById = (equipoId) => storageService.findById(COLLECTION_NAME, equipoId);

  const searchEquipos = (searchTerm = "") => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return getEquipos();
    }

    return getEquipos().filter((equipo) => {
      const cliente = findClienteById(equipo.clienteId);

      return [equipo.serie, equipo.clienteId, cliente?.nombre, cliente?.telefono, cliente?.correo]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedTerm));
    });
  };

  const createEquipo = (equipoData) => {
    const normalizedEquipo = normalizeEquipo(equipoData);
    const errors = validateEquipo(normalizedEquipo);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.create(COLLECTION_NAME, normalizedEquipo),
    };
  };

  const updateEquipo = (equipoId, equipoData) => {
    const normalizedEquipo = normalizeEquipo(equipoData);
    const errors = validateEquipo(normalizedEquipo);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.update(COLLECTION_NAME, equipoId, normalizedEquipo),
    };
  };

  const deleteEquipo = (equipoId) => storageService.delete(COLLECTION_NAME, equipoId);

  return {
    createEquipo,
    deleteEquipo,
    findClienteById,
    findEquipoById,
    getClientes,
    getEquipos,
    searchEquipos,
    updateEquipo,
  };
};

const equiposService = createEquiposService();

export const createEquipo = equiposService.createEquipo;
export const deleteEquipo = equiposService.deleteEquipo;
export const findClienteById = equiposService.findClienteById;
export const findEquipoById = equiposService.findEquipoById;
export const getClientes = equiposService.getClientes;
export const getEquipos = equiposService.getEquipos;
export const searchEquipos = equiposService.searchEquipos;
export const updateEquipo = equiposService.updateEquipo;
