import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import { createReportesService } from "./reportesService.js";

const createMemoryStorage = () => {
  const items = new Map();

  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: (key) => items.delete(key),
  };
};

const seedReportData = () => {
  const storageService = createLocalStorageService(createMemoryStorage());
  const cliente = storageService.create("clientes", { nombre: "Apex Prime X", telefono: "999111222" });
  const cliente2 = storageService.create("clientes", { nombre: "Cliente Frecuente", telefono: "999333444" });
  const servicio = storageService.create("servicios", { nombreServicio: "Mantenimiento" });
  const servicio2 = storageService.create("servicios", { nombreServicio: "Instalacion" });
  const equipo = storageService.create("equipos", {
    fechaRecepcion: "2026-05-10",
    clienteId: cliente.id,
    tipoEquipo: "Laptop",
    marca: "Lenovo",
    modelo: "ThinkPad",
    serie: "SN-001",
  });

  storageService.create("ventas", {
    fecha: "2026-05-10",
    clienteId: cliente.id,
    servicioId: servicio.id,
    cantidad: 2,
    montoTotal: 1000,
  });
  storageService.create("ventas", {
    fecha: "2026-05-11",
    clienteId: cliente2.id,
    servicioId: servicio2.id,
    cantidad: 1,
    montoTotal: 400,
  });
  storageService.create("gastos", { fecha: "2026-05-10", concepto: "Internet", monto: 150 });
  storageService.create("gastos", { fecha: "2026-05-11", concepto: "Software", monto: 100 });
  storageService.create("gastos", { fecha: "2026-05-12", concepto: "Transporte", monto: 80 });
  storageService.create("ordenes", {
    fecha: "2026-05-10",
    clienteId: cliente.id,
    tipoServicio: "Soporte",
    estado: "Pendiente",
  });
  storageService.create("soporte", {
    fecha: "2026-05-10",
    clienteId: cliente.id,
    equipoId: equipo.id,
    estado: "En reparación",
  });
  storageService.create("soporte", {
    fecha: "2026-05-11",
    clienteId: cliente.id,
    equipoId: equipo.id,
    estado: "Sin solucion",
  });

  return storageService;
};

test("calcula reportes consolidados desde LocalStorage", () => {
  const service = createReportesService(seedReportData());
  const data = service.getReportesData();

  assert.equal(data.resumen.ingresosTotal, 1400);
  assert.equal(data.resumen.gastosTotal, 330);
  assert.equal(data.resumen.utilidadTotal, 1070);
  assert.equal(data.ingresosPorDia.length, 2);
  assert.equal(data.gastosPorDia.length, 3);
  assert.equal(data.utilidadDiaria.find((row) => row.fecha === "2026-05-12").total, -80);
  assert.equal(data.gananciaMensual[0].total, 1070);
  assert.equal(data.serviciosMasVendidos[0].nombre, "Mantenimiento");
  assert.equal(data.clientesFrecuentes.length, 2);
  assert.equal(data.ordenesPendientes.length, 1);
  assert.equal(data.equiposEnSoporte.length, 1);
});

test("aplica filtros simples por fecha", () => {
  const service = createReportesService(seedReportData());
  const data = service.getReportesData({ fechaInicio: "2026-05-11", fechaFin: "2026-05-11" });

  assert.equal(data.resumen.ingresosTotal, 400);
  assert.equal(data.resumen.gastosTotal, 100);
  assert.equal(data.resumen.utilidadTotal, 300);
  assert.equal(data.ingresosPorDia[0].fecha, "2026-05-11");
  assert.equal(data.gastosPorDia[0].fecha, "2026-05-11");
});
