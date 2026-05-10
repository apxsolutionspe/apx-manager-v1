import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import { createGastosService, validateGasto } from "./gastosService.js";

const createMemoryStorage = () => {
  const items = new Map();

  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: (key) => items.delete(key),
  };
};

const createTestService = () => {
  const storageService = createLocalStorageService(createMemoryStorage());
  return createGastosService(storageService);
};

test("registra y lista gastos", () => {
  const service = createTestService();

  const result = service.createGasto({
    fecha: "2026-05-10",
    concepto: "Compra de materiales",
    categoria: "Materiales",
    monto: 250,
    metodoPago: "Transferencia",
    comprobante: "F001-120",
    observaciones: "Insumos operativos",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.id, "GAS-00001");
  assert.equal(service.getGastos().length, 1);
});

test("edita, elimina y filtra gastos por fecha y categoria", () => {
  const service = createTestService();
  const created = service.createGasto({
    fecha: "2026-05-10",
    concepto: "Internet oficina",
    categoria: "Internet",
    monto: 120,
    metodoPago: "Tarjeta",
  }).data;

  service.createGasto({
    fecha: "2026-05-11",
    concepto: "Licencia de software",
    categoria: "Software",
    monto: 300,
    metodoPago: "Transferencia",
  });

  const updated = service.updateGasto(created.id, {
    fecha: "2026-05-12",
    concepto: "Internet principal",
    categoria: "Internet",
    monto: 140,
    metodoPago: "Tarjeta",
  });

  assert.equal(updated.ok, true);
  assert.equal(service.findGastoById(created.id).monto, 140);
  assert.equal(service.filterGastos({ fecha: "2026-05-12" }).length, 1);
  assert.equal(service.filterGastos({ categoria: "Software" }).length, 1);
  assert.equal(service.deleteGasto(created.id), true);
  assert.equal(service.findGastoById(created.id), null);
});

test("valida campos requeridos del gasto", () => {
  const errors = validateGasto({
    fecha: "",
    concepto: "",
    categoria: "No existe",
    monto: 0,
    metodoPago: "Metodo invalido",
  });

  assert.equal(errors.fecha, "La fecha es obligatoria.");
  assert.equal(errors.concepto, "El concepto es obligatorio.");
  assert.equal(errors.categoria, "La categoria no es valida.");
  assert.equal(errors.monto, "El monto debe ser mayor a cero.");
  assert.equal(errors.metodoPago, "El metodo de pago no es valido.");
});
