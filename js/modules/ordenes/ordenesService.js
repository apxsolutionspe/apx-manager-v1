import { localStorageService } from "../../storage/localStorage.js";
import { isRequired } from "../../utils/validators.js";

const COLLECTION_NAME = "ordenes";

export const ORDEN_ESTADOS = ["Pendiente", "En proceso", "Terminado", "Entregado", "Cancelado"];
export const ORDEN_PRIORIDADES = ["Baja", "Media", "Alta", "Urgente"];

const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

export const calculateSaldo = (montoEstimado, adelanto) =>
  parseAmount(montoEstimado) - parseAmount(adelanto);

const normalizeOrden = (ordenData) => {
  const montoEstimado = parseAmount(ordenData.montoEstimado);
  const adelanto = parseAmount(ordenData.adelanto);

  return {
    fecha: ordenData.fecha || new Date().toISOString().slice(0, 10),
    clienteId: ordenData.clienteId ?? "",
    tipoServicio: ordenData.tipoServicio?.trim() ?? "",
    descripcionTrabajo: ordenData.descripcionTrabajo?.trim() ?? "",
    montoEstimado,
    adelanto,
    saldo: calculateSaldo(montoEstimado, adelanto),
    fechaEntrega: ordenData.fechaEntrega ?? "",
    estado: ordenData.estado ?? ORDEN_ESTADOS[0],
    prioridad: ordenData.prioridad ?? ORDEN_PRIORIDADES[1],
    observaciones: ordenData.observaciones?.trim() ?? "",
  };
};

export const validateOrden = (ordenData) => {
  const errors = {};

  if (!isRequired(ordenData.fecha)) {
    errors.fecha = "La fecha es obligatoria.";
  }

  if (!isRequired(ordenData.clienteId)) {
    errors.clienteId = "Selecciona un cliente.";
  }

  if (!isRequired(ordenData.tipoServicio)) {
    errors.tipoServicio = "El tipo de servicio es obligatorio.";
  }

  if (!isRequired(ordenData.descripcionTrabajo)) {
    errors.descripcionTrabajo = "La descripcion del trabajo es obligatoria.";
  }

  if (parseAmount(ordenData.montoEstimado) < 0) {
    errors.montoEstimado = "El monto estimado no puede ser negativo.";
  }

  if (parseAmount(ordenData.adelanto) < 0) {
    errors.adelanto = "El adelanto no puede ser negativo.";
  }

  if (!ORDEN_ESTADOS.includes(ordenData.estado)) {
    errors.estado = "El estado no es valido.";
  }

  if (!ORDEN_PRIORIDADES.includes(ordenData.prioridad)) {
    errors.prioridad = "La prioridad no es valida.";
  }

  return errors;
};

export const createOrdenesService = (storageService = localStorageService) => {
  const getClientes = () =>
    storageService
      .getAll("clientes")
      .sort((firstClient, secondClient) => firstClient.nombre.localeCompare(secondClient.nombre));

  const findClienteById = (clienteId) =>
    getClientes().find((cliente) => cliente.id === clienteId) ?? null;

  const getOrdenes = () =>
    storageService
      .getAll(COLLECTION_NAME)
      .sort((firstOrder, secondOrder) => new Date(secondOrder.fecha) - new Date(firstOrder.fecha));

  const findOrdenById = (ordenId) => storageService.findById(COLLECTION_NAME, ordenId);

  const filterOrdenes = ({ estado = "" } = {}) =>
    getOrdenes().filter((orden) => (estado ? orden.estado === estado : true));

  const createOrden = (ordenData) => {
    const normalizedOrden = normalizeOrden(ordenData);
    const errors = validateOrden(normalizedOrden);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.create(COLLECTION_NAME, normalizedOrden),
    };
  };

  const updateOrden = (ordenId, ordenData) => {
    const normalizedOrden = normalizeOrden(ordenData);
    const errors = validateOrden(normalizedOrden);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.update(COLLECTION_NAME, ordenId, normalizedOrden),
    };
  };

  const deleteOrden = (ordenId) => storageService.delete(COLLECTION_NAME, ordenId);

  return {
    createOrden,
    deleteOrden,
    filterOrdenes,
    findClienteById,
    findOrdenById,
    getClientes,
    getOrdenes,
    updateOrden,
  };
};

const ordenesService = createOrdenesService();

export const createOrden = ordenesService.createOrden;
export const deleteOrden = ordenesService.deleteOrden;
export const filterOrdenes = ordenesService.filterOrdenes;
export const findClienteById = ordenesService.findClienteById;
export const findOrdenById = ordenesService.findOrdenById;
export const getClientes = ordenesService.getClientes;
export const getOrdenes = ordenesService.getOrdenes;
export const updateOrden = ordenesService.updateOrden;
