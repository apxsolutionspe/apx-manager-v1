import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import { createDashboardService } from "./dashboardService.js";

const createMemoryStorage = () => {
  const items = new Map();

  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: (key) => items.delete(key),
  };
};

test("calcula indicadores diarios, mensuales y totales desde LocalStorage", () => {
  const storageService = createLocalStorageService(createMemoryStorage());
  const cliente = storageService.create("clientes", { nombre: "Apex Prime X" });
  const currentDate = new Date("2026-05-10T12:00:00.000Z");

  storageService.create("ventas", {
    fecha: "2026-05-10",
    clienteId: cliente.id,
    montoTotal: 1000,
  });
  storageService.create("ventas", {
    fecha: "2026-05-09",
    clienteId: cliente.id,
    montoTotal: 600,
  });
  storageService.create("ventas", {
    fecha: "2026-04-30",
    clienteId: cliente.id,
    montoTotal: 250,
  });
  storageService.create("gastos", {
    fecha: "2026-05-10",
    concepto: "Internet",
    monto: 200,
  });
  storageService.create("gastos", {
    fecha: "2026-05-02",
    concepto: "Software",
    monto: 100,
  });

  const dashboard = createDashboardService(storageService, currentDate).getDashboardData();

  assert.equal(dashboard.metrics.ingresosDia, 1000);
  assert.equal(dashboard.metrics.gastosDia, 200);
  assert.equal(dashboard.metrics.utilidadDia, 800);
  assert.equal(dashboard.metrics.ingresosMes, 1600);
  assert.equal(dashboard.metrics.gastosMes, 300);
  assert.equal(dashboard.metrics.gananciaMensual, 1300);
  assert.equal(dashboard.metrics.clientesRegistrados, 1);
  assert.equal(dashboard.metrics.ventasRegistradas, 3);
});

test("devuelve tablas cortas ordenadas por fecha reciente", () => {
  const storageService = createLocalStorageService(createMemoryStorage());
  const currentDate = new Date("2026-05-10T12:00:00.000Z");

  for (let index = 1; index <= 7; index += 1) {
    storageService.create("ventas", {
      fecha: `2026-05-0${index}`,
      clienteId: "CLI-00001",
      montoTotal: index * 100,
    });
    storageService.create("gastos", {
      fecha: `2026-05-0${index}`,
      concepto: `Gasto ${index}`,
      monto: index * 10,
    });
  }

  const dashboard = createDashboardService(storageService, currentDate).getDashboardData();

  assert.equal(dashboard.latestVentas.length, 5);
  assert.equal(dashboard.latestGastos.length, 5);
  assert.equal(dashboard.latestVentas[0].fecha, "2026-05-07");
  assert.equal(dashboard.latestGastos[0].fecha, "2026-05-07");
});
