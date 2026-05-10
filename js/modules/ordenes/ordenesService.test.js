import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import { calculateSaldo, createOrdenesService, validateOrden } from "./ordenesService.js";

const createMemoryStorage = () => {
  const items = new Map();

  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: (key) => items.delete(key),
  };
};

const createSeededService = () => {
  const storageService = createLocalStorageService(createMemoryStorage());
  const cliente = storageService.create("clientes", {
    nombre: "Apex Prime X",
    telefono: "999111222",
  });

  return {
    cliente,
    service: createOrdenesService(storageService),
  };
};

test("crea ordenes con saldo calculado", () => {
  const { cliente, service } = createSeededService();

  const result = service.createOrden({
    fecha: "2026-05-10",
    clienteId: cliente.id,
    tipoServicio: "Mantenimiento",
    descripcionTrabajo: "Revision general",
    montoEstimado: 800,
    adelanto: 250,
    fechaEntrega: "2026-05-12",
    estado: "Pendiente",
    prioridad: "Alta",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.id, "ORD-00001");
  assert.equal(result.data.saldo, 550);
  assert.equal(calculateSaldo(1000, 300), 700);
});

test("lista, edita, elimina y filtra ordenes por estado", () => {
  const { cliente, service } = createSeededService();
  const created = service.createOrden({
    fecha: "2026-05-10",
    clienteId: cliente.id,
    tipoServicio: "Instalacion",
    descripcionTrabajo: "Instalar equipo",
    montoEstimado: 1000,
    adelanto: 100,
    estado: "Pendiente",
    prioridad: "Media",
  }).data;

  service.createOrden({
    fecha: "2026-05-11",
    clienteId: cliente.id,
    tipoServicio: "Soporte",
    descripcionTrabajo: "Caso tecnico",
    montoEstimado: 300,
    adelanto: 0,
    estado: "Entregado",
    prioridad: "Baja",
  });

  const updated = service.updateOrden(created.id, {
    fecha: "2026-05-10",
    clienteId: cliente.id,
    tipoServicio: "Instalacion premium",
    descripcionTrabajo: "Instalar equipo avanzado",
    montoEstimado: 1200,
    adelanto: 400,
    estado: "En proceso",
    prioridad: "Urgente",
  });

  assert.equal(updated.ok, true);
  assert.equal(service.findOrdenById(created.id).saldo, 800);
  assert.equal(service.filterOrdenes({ estado: "En proceso" }).length, 1);
  assert.equal(service.filterOrdenes({ estado: "Entregado" }).length, 1);
  assert.equal(service.deleteOrden(created.id), true);
  assert.equal(service.findOrdenById(created.id), null);
});

test("valida campos requeridos de la orden", () => {
  const errors = validateOrden({
    fecha: "",
    clienteId: "",
    tipoServicio: "",
    descripcionTrabajo: "",
    montoEstimado: -1,
    adelanto: -5,
    estado: "No existe",
    prioridad: "Invalida",
  });

  assert.equal(errors.fecha, "La fecha es obligatoria.");
  assert.equal(errors.clienteId, "Selecciona un cliente.");
  assert.equal(errors.tipoServicio, "El tipo de servicio es obligatorio.");
  assert.equal(errors.descripcionTrabajo, "La descripcion del trabajo es obligatoria.");
  assert.equal(errors.montoEstimado, "El monto estimado no puede ser negativo.");
  assert.equal(errors.adelanto, "El adelanto no puede ser negativo.");
  assert.equal(errors.estado, "El estado no es valido.");
  assert.equal(errors.prioridad, "La prioridad no es valida.");
});
