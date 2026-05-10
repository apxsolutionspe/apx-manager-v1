import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import {
  calculateGananciaEstimada,
  createServiciosService,
  validateServicio,
} from "./serviciosService.js";

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
  return createServiciosService(storageService);
};

test("crea, lista y busca servicios con ganancia calculada", () => {
  const service = createTestService();

  const result = service.createServicio({
    nombreServicio: "Mantenimiento preventivo",
    categoria: "Mantenimiento",
    descripcion: "Servicio mensual",
    precioBase: "500",
    costoEstimado: "180",
    estado: "Activo",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.id, "SER-00001");
  assert.equal(result.data.gananciaEstimada, 320);
  assert.equal(service.getServicios().length, 1);
  assert.equal(service.searchServicios("preventivo")[0].nombreServicio, "Mantenimiento preventivo");
});

test("edita y elimina servicios", () => {
  const service = createTestService();
  const created = service.createServicio({
    nombreServicio: "Instalacion",
    categoria: "Instalacion",
    precioBase: 300,
    costoEstimado: 100,
    estado: "Activo",
  }).data;

  const updated = service.updateServicio(created.id, {
    nombreServicio: "Instalacion premium",
    categoria: "Instalacion",
    precioBase: 450,
    costoEstimado: 125,
    estado: "Activo",
  });

  assert.equal(updated.ok, true);
  assert.equal(service.findServicioById(created.id).gananciaEstimada, 325);
  assert.equal(service.deleteServicio(created.id), true);
  assert.equal(service.findServicioById(created.id), null);
});

test("valida servicios y calcula ganancia estimada", () => {
  const errors = validateServicio({
    nombreServicio: "",
    categoria: "Categoria invalida",
    precioBase: -1,
    costoEstimado: -5,
    estado: "Activo",
  });

  assert.equal(calculateGananciaEstimada(1000, 350), 650);
  assert.equal(errors.nombreServicio, "El nombre del servicio es obligatorio.");
  assert.equal(errors.categoria, "La categoria no es valida.");
  assert.equal(errors.precioBase, "El precio base no puede ser negativo.");
  assert.equal(errors.costoEstimado, "El costo estimado no puede ser negativo.");
});
