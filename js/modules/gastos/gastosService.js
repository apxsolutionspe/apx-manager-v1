import { localStorageService } from "../../storage/localStorage.js";
import { isRequired } from "../../utils/validators.js";

const COLLECTION_NAME = "gastos";

export const GASTO_CATEGORIAS = [
  "Materiales",
  "Internet",
  "Software",
  "Transporte",
  "Equipos",
  "Publicidad",
  "Mantenimiento",
  "Otros",
];

export const GASTO_METODOS_PAGO = ["Efectivo", "Transferencia", "Tarjeta", "Yape/Plin", "Credito"];

const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

const normalizeGasto = (gastoData) => ({
  fecha: gastoData.fecha || new Date().toISOString().slice(0, 10),
  concepto: gastoData.concepto?.trim() ?? "",
  categoria: gastoData.categoria ?? GASTO_CATEGORIAS[0],
  monto: parseAmount(gastoData.monto),
  metodoPago: gastoData.metodoPago ?? GASTO_METODOS_PAGO[0],
  comprobante: gastoData.comprobante?.trim() ?? "",
  observaciones: gastoData.observaciones?.trim() ?? "",
});

export const validateGasto = (gastoData) => {
  const errors = {};

  if (!isRequired(gastoData.fecha)) {
    errors.fecha = "La fecha es obligatoria.";
  }

  if (!isRequired(gastoData.concepto)) {
    errors.concepto = "El concepto es obligatorio.";
  }

  if (!GASTO_CATEGORIAS.includes(gastoData.categoria)) {
    errors.categoria = "La categoria no es valida.";
  }

  if (parseAmount(gastoData.monto) <= 0) {
    errors.monto = "El monto debe ser mayor a cero.";
  }

  if (!GASTO_METODOS_PAGO.includes(gastoData.metodoPago)) {
    errors.metodoPago = "El metodo de pago no es valido.";
  }

  return errors;
};

export const createGastosService = (storageService = localStorageService) => {
  const getGastos = () =>
    storageService
      .getAll(COLLECTION_NAME)
      .sort((firstExpense, secondExpense) => new Date(secondExpense.fecha) - new Date(firstExpense.fecha));

  const findGastoById = (gastoId) => storageService.findById(COLLECTION_NAME, gastoId);

  const filterGastos = ({ fecha = "", categoria = "" } = {}) =>
    getGastos().filter((gasto) => {
      const matchesDate = fecha ? gasto.fecha === fecha : true;
      const matchesCategory = categoria ? gasto.categoria === categoria : true;

      return matchesDate && matchesCategory;
    });

  const createGasto = (gastoData) => {
    const normalizedGasto = normalizeGasto(gastoData);
    const errors = validateGasto(normalizedGasto);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.create(COLLECTION_NAME, normalizedGasto),
    };
  };

  const updateGasto = (gastoId, gastoData) => {
    const normalizedGasto = normalizeGasto(gastoData);
    const errors = validateGasto(normalizedGasto);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.update(COLLECTION_NAME, gastoId, normalizedGasto),
    };
  };

  const deleteGasto = (gastoId) => storageService.delete(COLLECTION_NAME, gastoId);

  return {
    createGasto,
    deleteGasto,
    filterGastos,
    findGastoById,
    getGastos,
    updateGasto,
  };
};

const gastosService = createGastosService();

export const createGasto = gastosService.createGasto;
export const deleteGasto = gastosService.deleteGasto;
export const filterGastos = gastosService.filterGastos;
export const findGastoById = gastosService.findGastoById;
export const getGastos = gastosService.getGastos;
export const updateGasto = gastosService.updateGasto;
