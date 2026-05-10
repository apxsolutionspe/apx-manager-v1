import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import { calculateTotalSoporte, createSoporteService, validateSoporte } from "./soporteService.js";

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
  const equipo = storageService.create("equipos", {
    fechaRecepcion: "2026-05-10",
    clienteId: cliente.id,
    tipoEquipo: "Laptop",
    marca: "Lenovo",
    modelo: "ThinkPad",
    serie: "SN-001",
  });

  return {
    cliente,
    equipo,
    service: createSoporteService(storageService),
  };
};

test("crea soporte tecnico con total calculado", () => {
  const { cliente, equipo, service } = createSeededService();

  const result = service.createSoporte({
    fecha: "2026-05-10",
    clienteId: cliente.id,
    equipoId: equipo.id,
    diagnostico: "Falla de disco",
    solucionAplicada: "Cambio de SSD",
    costoServicio: 150,
    costoRepuestos: 220,
    estado: "Diagnosticado",
    tecnicoResponsable: "Tecnico APX",
    garantia: "Sin garantia",
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.id, "SOP-00001");
  assert.equal(result.data.total, 370);
  assert.equal(calculateTotalSoporte(100, 45), 145);
});

test("lista, edita y elimina casos de soporte", () => {
  const { cliente, equipo, service } = createSeededService();
  const created = service.createSoporte({
    fecha: "2026-05-10",
    clienteId: cliente.id,
    equipoId: equipo.id,
    diagnostico: "No enciende",
    costoServicio: 80,
    costoRepuestos: 0,
    estado: "Recibido",
    tecnicoResponsable: "Mesa tecnica",
    garantia: "Con garantia",
  }).data;

  const updated = service.updateSoporte(created.id, {
    fecha: "2026-05-11",
    clienteId: cliente.id,
    equipoId: equipo.id,
    diagnostico: "Fuente dañada",
    solucionAplicada: "Reemplazo de fuente",
    costoServicio: 120,
    costoRepuestos: 180,
    estado: "Listo",
    tecnicoResponsable: "Mesa tecnica",
    garantia: "Con garantia",
  });

  assert.equal(updated.ok, true);
  assert.equal(service.findSoporteById(created.id).total, 300);
  assert.equal(service.getClientes().length, 1);
  assert.equal(service.getEquipos().length, 1);
  assert.equal(service.deleteSoporte(created.id), true);
  assert.equal(service.findSoporteById(created.id), null);
});

test("mantiene estados de soporte segun el flujo operativo definido", () => {
  const { cliente, equipo, service } = createSeededService();

  const repairing = service.createSoporte({
    fecha: "2026-05-12",
    clienteId: cliente.id,
    equipoId: equipo.id,
    diagnostico: "Falla intermitente",
    costoServicio: 50,
    costoRepuestos: 0,
    estado: "En reparación",
    tecnicoResponsable: "Mesa tecnica",
    garantia: "Sin garantia",
  });

  const unresolved = service.createSoporte({
    fecha: "2026-05-13",
    clienteId: cliente.id,
    equipoId: equipo.id,
    diagnostico: "Placa irreparable",
    costoServicio: 50,
    costoRepuestos: 0,
    estado: "Sin solución",
    tecnicoResponsable: "Mesa tecnica",
    garantia: "Sin garantia",
  });

  assert.equal(repairing.ok, true);
  assert.equal(unresolved.ok, true);
});

test("valida campos requeridos de soporte tecnico", () => {
  const errors = validateSoporte({
    fecha: "",
    clienteId: "",
    equipoId: "",
    diagnostico: "",
    costoServicio: -1,
    costoRepuestos: -2,
    estado: "Estado invalido",
    tecnicoResponsable: "",
    garantia: "Garantia invalida",
  });

  assert.equal(errors.fecha, "La fecha es obligatoria.");
  assert.equal(errors.clienteId, "Selecciona un cliente.");
  assert.equal(errors.equipoId, "Selecciona un equipo.");
  assert.equal(errors.diagnostico, "El diagnostico es obligatorio.");
  assert.equal(errors.costoServicio, "El costo de servicio no puede ser negativo.");
  assert.equal(errors.costoRepuestos, "El costo de repuestos no puede ser negativo.");
  assert.equal(errors.estado, "El estado no es valido.");
  assert.equal(errors.tecnicoResponsable, "El tecnico responsable es obligatorio.");
  assert.equal(errors.garantia, "La garantia no es valida.");
});
