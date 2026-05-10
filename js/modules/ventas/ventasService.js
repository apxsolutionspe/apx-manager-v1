import { localStorageService } from "../../storage/localStorage.js";
import { isRequired } from "../../utils/validators.js";

const COLLECTION_NAME = "ventas";

export const METODOS_PAGO = ["Efectivo", "Transferencia", "Tarjeta", "Yape/Plin", "Credito"];
export const ESTADOS_PAGO = ["Pendiente", "Pagado", "Parcial", "Anulado"];

const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

export const calculateMontoTotal = (cantidad, precioUnitario) =>
  parseAmount(cantidad) * parseAmount(precioUnitario);

const normalizeVenta = (ventaData) => {
  const cantidad = parseAmount(ventaData.cantidad);
  const precioUnitario = parseAmount(ventaData.precioUnitario);

  return {
    fecha: ventaData.fecha || new Date().toISOString().slice(0, 10),
    clienteId: ventaData.clienteId ?? "",
    servicioId: ventaData.servicioId ?? "",
    descripcion: ventaData.descripcion?.trim() ?? "",
    cantidad,
    precioUnitario,
    montoTotal: calculateMontoTotal(cantidad, precioUnitario),
    metodoPago: ventaData.metodoPago ?? METODOS_PAGO[0],
    estadoPago: ventaData.estadoPago ?? ESTADOS_PAGO[0],
    observaciones: ventaData.observaciones?.trim() ?? "",
  };
};

export const validateVenta = (ventaData) => {
  const errors = {};

  if (!isRequired(ventaData.fecha)) {
    errors.fecha = "La fecha es obligatoria.";
  }

  if (!isRequired(ventaData.clienteId)) {
    errors.clienteId = "Selecciona un cliente.";
  }

  if (!isRequired(ventaData.servicioId)) {
    errors.servicioId = "Selecciona un servicio.";
  }

  if (parseAmount(ventaData.cantidad) <= 0) {
    errors.cantidad = "La cantidad debe ser mayor a cero.";
  }

  if (parseAmount(ventaData.precioUnitario) < 0) {
    errors.precioUnitario = "El precio unitario no puede ser negativo.";
  }

  if (!METODOS_PAGO.includes(ventaData.metodoPago)) {
    errors.metodoPago = "El metodo de pago no es valido.";
  }

  if (!ESTADOS_PAGO.includes(ventaData.estadoPago)) {
    errors.estadoPago = "El estado de pago no es valido.";
  }

  return errors;
};

export const createVentasService = (storageService = localStorageService) => {
  const getClientes = () =>
    storageService
      .getAll("clientes")
      .sort((firstClient, secondClient) => firstClient.nombre.localeCompare(secondClient.nombre));

  const getServicios = () =>
    storageService
      .getAll("servicios")
      .sort((firstService, secondService) =>
        firstService.nombreServicio.localeCompare(secondService.nombreServicio),
      );

  const findClienteById = (clienteId) =>
    getClientes().find((cliente) => cliente.id === clienteId) ?? null;

  const findServicioById = (servicioId) =>
    getServicios().find((servicio) => servicio.id === servicioId) ?? null;

  const getVentas = () =>
    storageService
      .getAll(COLLECTION_NAME)
      .sort((firstSale, secondSale) => new Date(secondSale.fecha) - new Date(firstSale.fecha));

  const findVentaById = (ventaId) => storageService.findById(COLLECTION_NAME, ventaId);

  const filterVentas = ({ fecha = "", clienteSearch = "" } = {}) => {
    const normalizedClientSearch = clienteSearch.trim().toLowerCase();

    return getVentas().filter((venta) => {
      const cliente = findClienteById(venta.clienteId);
      const matchesDate = fecha ? venta.fecha === fecha : true;
      const matchesClient = normalizedClientSearch
        ? [venta.clienteId, cliente?.nombre, cliente?.telefono, cliente?.correo]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(normalizedClientSearch))
        : true;

      return matchesDate && matchesClient;
    });
  };

  const createVenta = (ventaData) => {
    const normalizedVenta = normalizeVenta(ventaData);
    const errors = validateVenta(normalizedVenta);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.create(COLLECTION_NAME, normalizedVenta),
    };
  };

  const updateVenta = (ventaId, ventaData) => {
    const normalizedVenta = normalizeVenta(ventaData);
    const errors = validateVenta(normalizedVenta);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.update(COLLECTION_NAME, ventaId, normalizedVenta),
    };
  };

  const deleteVenta = (ventaId) => storageService.delete(COLLECTION_NAME, ventaId);

  return {
    createVenta,
    deleteVenta,
    filterVentas,
    findClienteById,
    findServicioById,
    findVentaById,
    getClientes,
    getServicios,
    getVentas,
    updateVenta,
  };
};

const ventasService = createVentasService();

export const createVenta = ventasService.createVenta;
export const deleteVenta = ventasService.deleteVenta;
export const filterVentas = ventasService.filterVentas;
export const findClienteById = ventasService.findClienteById;
export const findServicioById = ventasService.findServicioById;
export const findVentaById = ventasService.findVentaById;
export const getClientes = ventasService.getClientes;
export const getServicios = ventasService.getServicios;
export const getVentas = ventasService.getVentas;
export const updateVenta = ventasService.updateVenta;
