import { localStorageService } from "../../storage/localStorage.js";
import { isRequired, isValidEmail } from "../../utils/validators.js";

const COLLECTION_NAME = "clientes";

export const CLIENTE_ESTADOS = ["Activo", "Inactivo", "Prospecto"];
export const CLIENTE_TIPOS = ["Empresa", "Persona", "Gobierno", "Otro"];

const normalizeCliente = (clienteData) => ({
  nombre: clienteData.nombre?.trim() ?? "",
  telefono: clienteData.telefono?.trim() ?? "",
  correo: clienteData.correo?.trim() ?? "",
  direccion: clienteData.direccion?.trim() ?? "",
  tipoCliente: clienteData.tipoCliente ?? CLIENTE_TIPOS[0],
  fechaRegistro: clienteData.fechaRegistro || new Date().toISOString().slice(0, 10),
  estado: clienteData.estado ?? CLIENTE_ESTADOS[0],
  observaciones: clienteData.observaciones?.trim() ?? "",
});

export const validateCliente = (clienteData) => {
  const errors = {};

  if (!isRequired(clienteData.nombre)) {
    errors.nombre = "El nombre es obligatorio.";
  }

  if (!isRequired(clienteData.telefono)) {
    errors.telefono = "El telefono es obligatorio.";
  }

  if (isRequired(clienteData.correo) && !isValidEmail(clienteData.correo)) {
    errors.correo = "El correo no tiene un formato valido.";
  }

  if (!CLIENTE_TIPOS.includes(clienteData.tipoCliente)) {
    errors.tipoCliente = "El tipo de cliente no es valido.";
  }

  if (!CLIENTE_ESTADOS.includes(clienteData.estado)) {
    errors.estado = "El estado no es valido.";
  }

  return errors;
};

export const createClientesService = (storageService = localStorageService) => {
  const getClientes = () =>
    storageService
      .getAll(COLLECTION_NAME)
      .sort((firstClient, secondClient) => firstClient.nombre.localeCompare(secondClient.nombre));

  const findClienteById = (clienteId) => storageService.findById(COLLECTION_NAME, clienteId);

  const searchClientes = (searchTerm = "") => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return getClientes();
    }

    return getClientes().filter((cliente) =>
      [cliente.id, cliente.nombre, cliente.telefono, cliente.correo, cliente.tipoCliente, cliente.estado]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedTerm)),
    );
  };

  const createCliente = (clienteData) => {
    const normalizedCliente = normalizeCliente(clienteData);
    const errors = validateCliente(normalizedCliente);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.create(COLLECTION_NAME, normalizedCliente),
    };
  };

  const updateCliente = (clienteId, clienteData) => {
    const normalizedCliente = normalizeCliente(clienteData);
    const errors = validateCliente(normalizedCliente);

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      data: storageService.update(COLLECTION_NAME, clienteId, normalizedCliente),
    };
  };

  const deleteCliente = (clienteId) => storageService.delete(COLLECTION_NAME, clienteId);

  return {
    createCliente,
    deleteCliente,
    findClienteById,
    getClientes,
    searchClientes,
    updateCliente,
  };
};

const clientesService = createClientesService();

export const createCliente = clientesService.createCliente;
export const deleteCliente = clientesService.deleteCliente;
export const findClienteById = clientesService.findClienteById;
export const getClientes = clientesService.getClientes;
export const searchClientes = clientesService.searchClientes;
export const updateCliente = clientesService.updateCliente;
