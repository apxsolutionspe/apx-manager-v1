import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import { createEquiposService, validateEquipo } from "./equiposService.js";

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
    correo: "soporte@apx.test",
  });

  return {
    cliente,
    service: createEquiposService(storageService),
  };
};

test("registra y lista equipos recibidos", () => {
  const { cliente, service } = createSeededService();

  const result = service.createEquipo({
    fechaRecepcion: "2026-05-10",
    clienteId: cliente.id,
    tipoEquipo: "Laptop",
    marca: "Lenovo",
    modelo: "ThinkPad",
    serie: "SN-001",
    accesorios: "Cargador",
    estadoFisico: "Bueno",
    problemaReportado: "No enciende",
    observaciones: "Ingreso por soporte",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.id, "EQP-00001");
  assert.equal(service.getEquipos().length, 1);
});

test("edita, elimina y busca equipos por cliente o serie", () => {
  const { cliente, service } = createSeededService();
  const created = service.createEquipo({
    fechaRecepcion: "2026-05-10",
    clienteId: cliente.id,
    tipoEquipo: "Desktop",
    marca: "HP",
    modelo: "EliteDesk",
    serie: "HP-ABC-999",
    estadoFisico: "Regular",
    problemaReportado: "Lentitud",
  }).data;

  const updated = service.updateEquipo(created.id, {
    fechaRecepcion: "2026-05-11",
    clienteId: cliente.id,
    tipoEquipo: "Desktop",
    marca: "HP",
    modelo: "EliteDesk G5",
    serie: "HP-ABC-999",
    estadoFisico: "Dañado",
    problemaReportado: "No inicia sistema",
  });

  assert.equal(updated.ok, true);
  assert.equal(service.findEquipoById(created.id).modelo, "EliteDesk G5");
  assert.equal(service.searchEquipos("prime").length, 1);
  assert.equal(service.searchEquipos("HP-ABC").length, 1);
  assert.equal(service.deleteEquipo(created.id), true);
  assert.equal(service.findEquipoById(created.id), null);
});

test("valida campos requeridos del equipo recibido", () => {
  const errors = validateEquipo({
    fechaRecepcion: "",
    clienteId: "",
    tipoEquipo: "Invalido",
    marca: "",
    modelo: "",
    serie: "",
    estadoFisico: "No existe",
    problemaReportado: "",
  });

  assert.equal(errors.fechaRecepcion, "La fecha de recepcion es obligatoria.");
  assert.equal(errors.clienteId, "Selecciona un cliente.");
  assert.equal(errors.tipoEquipo, "El tipo de equipo no es valido.");
  assert.equal(errors.marca, "La marca es obligatoria.");
  assert.equal(errors.modelo, "El modelo es obligatorio.");
  assert.equal(errors.serie, "La serie es obligatoria.");
  assert.equal(errors.estadoFisico, "El estado fisico no es valido.");
  assert.equal(errors.problemaReportado, "El problema reportado es obligatorio.");
});
