import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import { calculateMontoTotal, createVentasService, validateVenta } from "./ventasService.js";

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
    correo: "ventas@apx.test",
  });
  const servicio = storageService.create("servicios", {
    nombreServicio: "Mantenimiento",
    precioBase: 500,
  });

  return {
    cliente,
    servicio,
    service: createVentasService(storageService),
  };
};

test("registra ventas con monto total calculado", () => {
  const { cliente, servicio, service } = createSeededService();

  const result = service.createVenta({
    fecha: "2026-05-10",
    clienteId: cliente.id,
    servicioId: servicio.id,
    descripcion: "Venta de mantenimiento",
    cantidad: 3,
    precioUnitario: 500,
    metodoPago: "Transferencia",
    estadoPago: "Pagado",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.id, "VEN-00001");
  assert.equal(result.data.montoTotal, 1500);
  assert.equal(calculateMontoTotal(4, 125), 500);
});

test("lista, edita, elimina, filtra por fecha y busca por cliente", () => {
  const { cliente, servicio, service } = createSeededService();
  const created = service.createVenta({
    fecha: "2026-05-10",
    clienteId: cliente.id,
    servicioId: servicio.id,
    cantidad: 1,
    precioUnitario: 500,
    metodoPago: "Efectivo",
    estadoPago: "Pendiente",
  }).data;

  const updated = service.updateVenta(created.id, {
    fecha: "2026-05-11",
    clienteId: cliente.id,
    servicioId: servicio.id,
    cantidad: 2,
    precioUnitario: 450,
    metodoPago: "Tarjeta",
    estadoPago: "Parcial",
  });

  assert.equal(updated.ok, true);
  assert.equal(service.findVentaById(created.id).montoTotal, 900);
  assert.equal(service.filterVentas({ fecha: "2026-05-11" }).length, 1);
  assert.equal(service.filterVentas({ clienteSearch: "prime" }).length, 1);
  assert.equal(service.deleteVenta(created.id), true);
  assert.equal(service.findVentaById(created.id), null);
});

test("valida campos obligatorios y montos", () => {
  const errors = validateVenta({
    fecha: "",
    clienteId: "",
    servicioId: "",
    cantidad: 0,
    precioUnitario: -1,
    metodoPago: "Efectivo",
    estadoPago: "Pagado",
  });

  assert.equal(errors.fecha, "La fecha es obligatoria.");
  assert.equal(errors.clienteId, "Selecciona un cliente.");
  assert.equal(errors.servicioId, "Selecciona un servicio.");
  assert.equal(errors.cantidad, "La cantidad debe ser mayor a cero.");
  assert.equal(errors.precioUnitario, "El precio unitario no puede ser negativo.");
});
