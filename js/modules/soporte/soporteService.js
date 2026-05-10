import { localStorageService } from "../../storage/localStorage.js";
import { isRequired } from "../../utils/validators.js";

const COLLECTION_NAME = "soporte";

export const SOPORTE_ESTADOS = [
  "Recibido",
  "Diagnosticado",
  "En reparación",
  "Listo",
  "Entregado",
  "Sin solución",
];

export const GARANTIA_OPCIONES = ["Sin garantia", "Con garantia"];

const LEGACY_ESTADO_MAP = {
  "En reparacion": "En reparación",
  "Sin solucion": "Sin solución",
};

const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

export const calculateTotalSoporte = (costoServicio, costoRepuestos) =>
  parseAmount(costoServicio) + parseAmount(costoRepuestos);

const normalizeSoporte = (soporteData) => {
  const costoServicio = parseAmount(soporteData.costoServicio);
  const costoRepuestos = parseAmount(soporteData.costoRepuestos);

  return {
    fecha: soporteData.fecha || new Date().toISOString().slice(0, 10),
    clienteId: soporteData.clienteId ?? "",
    equipoId: soporteData.equipoId ?? "",
    diagnostico: soporteData.diagnostico?.trim() ?? "",
    solucionAplicada: soporteData.solucionAplicada?.trim() ?? "",
    costoServicio,
    costoRepuestos,
    total: calculateTotalSoporte(costoServicio, costoRepuestos),
    estado: LEGACY_ESTADO_MAP[soporteData.estado] ?? soporteData.estado ?? SOPORTE_ESTADOS[0],
    tecnicoResponsable: soporteData.tecnicoResponsable?.trim() ?? "",
    garantia: soporteData.garantia ?? GARANTIA_OPCIONES[0],
    observaciones: soporteData.observaciones?.trim() ?? "",
  };
};

export const validateSoporte = (soporteData) => {
  const errors = {};

  if (!isRequired(soporteData.fecha)) {
    errors.fecha = "La fecha es obligatoria.";
  }

  if (!isRequired(soporteData.clienteId)) {
    errors.clienteId = "Selecciona un cliente.";
  }

  if (!isRequired(soporteData.equipoId)) {
    errors.equipoId = "Selecciona un equipo.";
  }

  if (!isRequired(soporteData.diagnostico)) {
    errors.diagnostico = "El diagnostico es obligatorio.";
  }

  if (parseAmount(soporteData.costoServicio) < 0) {
    errors.costoServicio = "El costo de servicio no puede ser negativo.";
  }

  if (parseAmount(soporteData.costoRepuestos) < 0) {
    errors.costoRepuestos = "El costo de repuestos no puede ser negativo.";
  }

  if (!SOPORTE_ESTADOS.includes(soporteData.estado)) {
    errors.estado = "El estado no es valido.";
  }

  if (!isRequired(soporteData.tecnicoResponsable)) {
    errors.tecnicoResponsable = "El tecnico responsable es obligatorio.";
  }

  if (!GARANTIA_OPCIONES.includes(soporteData.garantia)) {
    errors.garantia = "La garantia no es valida.";
  }

  return errors;
};

export const createSoporteService = (storageService = localStorageService) => {
  const getClientes = () =>
    storageService
      .getAll("clientes")
      .sort((firstClient, secondClient) => firstClient.nombre.localeCompare(secondClient.nombre));

  const getEquipos = () =>
    storageService
      .getAll("equipos")
      .sort((firstEquipment, secondEquipment) =>
        new Date(secondEquipment.fechaRecepcion) - new Date(firstEquipment.fechaRecepcion),
      );

  const findClienteById = (clienteId) =>
    getClientes().find((cliente) => cliente.id === clienteId) ?? null;

  const findEquipoById = (equipoId) =>
    getEquipos().find((equipo) => equipo.id === equipoId) ?? null;

  const getSoportes = () =>
    storageService
      .getAll(COLLECTION_NAME)
      .sort((firstSupport, secondSupport) => new Date(secondSupport.fecha) - new Date(firstSupport.fecha));

  const findSoporteById = (soporteId) => storageService.findById(COLLECTION_NAME, soporteId);

  const createSoporte = (soporteData) => {
    const normalizedSoporte = normalizeSoporte(soporteData);
    const errors = validateSoporte(normalizedSoporte);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.create(COLLECTION_NAME, normalizedSoporte),
    };
  };

  const updateSoporte = (soporteId, soporteData) => {
    const normalizedSoporte = normalizeSoporte(soporteData);
    const errors = validateSoporte(normalizedSoporte);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.update(COLLECTION_NAME, soporteId, normalizedSoporte),
    };
  };

  const deleteSoporte = (soporteId) => storageService.delete(COLLECTION_NAME, soporteId);

  return {
    createSoporte,
    deleteSoporte,
    findClienteById,
    findEquipoById,
    findSoporteById,
    getClientes,
    getEquipos,
    getSoportes,
    updateSoporte,
  };
};

const soporteService = createSoporteService();

export const createSoporte = soporteService.createSoporte;
export const deleteSoporte = soporteService.deleteSoporte;
export const findClienteById = soporteService.findClienteById;
export const findEquipoById = soporteService.findEquipoById;
export const findSoporteById = soporteService.findSoporteById;
export const getClientes = soporteService.getClientes;
export const getEquipos = soporteService.getEquipos;
export const getSoportes = soporteService.getSoportes;
export const updateSoporte = soporteService.updateSoporte;
