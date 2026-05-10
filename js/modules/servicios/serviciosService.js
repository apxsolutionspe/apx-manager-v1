import { localStorageService } from "../../storage/localStorage.js";
import { isRequired } from "../../utils/validators.js";

const COLLECTION_NAME = "servicios";

export const SERVICIO_ESTADOS = ["Activo", "Inactivo"];
export const SERVICIO_CATEGORIAS = ["Tecnico", "Instalacion", "Mantenimiento", "Consultoria", "Otro"];

const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

export const calculateGananciaEstimada = (precioBase, costoEstimado) =>
  parseAmount(precioBase) - parseAmount(costoEstimado);

const normalizeServicio = (servicioData) => {
  const precioBase = parseAmount(servicioData.precioBase);
  const costoEstimado = parseAmount(servicioData.costoEstimado);

  return {
    nombreServicio: servicioData.nombreServicio?.trim() ?? "",
    categoria: servicioData.categoria ?? SERVICIO_CATEGORIAS[0],
    descripcion: servicioData.descripcion?.trim() ?? "",
    precioBase,
    costoEstimado,
    gananciaEstimada: calculateGananciaEstimada(precioBase, costoEstimado),
    estado: servicioData.estado ?? SERVICIO_ESTADOS[0],
  };
};

export const validateServicio = (servicioData) => {
  const errors = {};

  if (!isRequired(servicioData.nombreServicio)) {
    errors.nombreServicio = "El nombre del servicio es obligatorio.";
  }

  if (!SERVICIO_CATEGORIAS.includes(servicioData.categoria)) {
    errors.categoria = "La categoria no es valida.";
  }

  if (parseAmount(servicioData.precioBase) < 0) {
    errors.precioBase = "El precio base no puede ser negativo.";
  }

  if (parseAmount(servicioData.costoEstimado) < 0) {
    errors.costoEstimado = "El costo estimado no puede ser negativo.";
  }

  if (!SERVICIO_ESTADOS.includes(servicioData.estado)) {
    errors.estado = "El estado no es valido.";
  }

  return errors;
};

export const createServiciosService = (storageService = localStorageService) => {
  const getServicios = () =>
    storageService
      .getAll(COLLECTION_NAME)
      .sort((firstService, secondService) =>
        firstService.nombreServicio.localeCompare(secondService.nombreServicio),
      );

  const findServicioById = (servicioId) => storageService.findById(COLLECTION_NAME, servicioId);

  const searchServicios = (searchTerm = "") => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return getServicios();
    }

    return getServicios().filter((servicio) =>
      [servicio.id, servicio.nombreServicio, servicio.categoria, servicio.descripcion, servicio.estado]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedTerm)),
    );
  };

  const createServicio = (servicioData) => {
    const normalizedServicio = normalizeServicio(servicioData);
    const errors = validateServicio(normalizedServicio);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.create(COLLECTION_NAME, normalizedServicio),
    };
  };

  const updateServicio = (servicioId, servicioData) => {
    const normalizedServicio = normalizeServicio(servicioData);
    const errors = validateServicio(normalizedServicio);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.update(COLLECTION_NAME, servicioId, normalizedServicio),
    };
  };

  const deleteServicio = (servicioId) => storageService.delete(COLLECTION_NAME, servicioId);

  return {
    createServicio,
    deleteServicio,
    findServicioById,
    getServicios,
    searchServicios,
    updateServicio,
  };
};

const serviciosService = createServiciosService();

export const createServicio = serviciosService.createServicio;
export const deleteServicio = serviciosService.deleteServicio;
export const findServicioById = serviciosService.findServicioById;
export const getServicios = serviciosService.getServicios;
export const searchServicios = serviciosService.searchServicios;
export const updateServicio = serviciosService.updateServicio;
