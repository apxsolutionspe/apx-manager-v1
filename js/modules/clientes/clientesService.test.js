import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "../../storage/localStorage.js";
import { createClientesService, validateCliente } from "./clientesService.js";

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
  return createClientesService(storageService);
};

test("crea, lista y busca clientes", () => {
  const service = createTestService();

  const firstResult = service.createCliente({
    nombre: "Apex Prime X",
    telefono: "999111222",
    correo: "contacto@apx.test",
    direccion: "Lima",
    tipoCliente: "Empresa",
    fechaRegistro: "2026-05-10",
    estado: "Activo",
    observaciones: "Cliente corporativo",
  });

  service.createCliente({
    nombre: "Cliente Persona",
    telefono: "999333444",
    tipoCliente: "Persona",
    estado: "Prospecto",
  });

  assert.equal(firstResult.ok, true);
  assert.equal(firstResult.data.id, "CLI-00001");
  assert.equal(service.getClientes().length, 2);
  assert.equal(service.searchClientes("prime")[0].nombre, "Apex Prime X");
});

test("edita y elimina clientes", () => {
  const service = createTestService();
  const created = service.createCliente({
    nombre: "Cliente inicial",
    telefono: "999111222",
    tipoCliente: "Empresa",
    estado: "Activo",
  }).data;

  const updated = service.updateCliente(created.id, {
    nombre: "Cliente editado",
    telefono: "999111222",
    tipoCliente: "Empresa",
    estado: "Inactivo",
  });

  assert.equal(updated.ok, true);
  assert.equal(service.findClienteById(created.id).nombre, "Cliente editado");
  assert.equal(service.deleteCliente(created.id), true);
  assert.equal(service.findClienteById(created.id), null);
});

test("valida campos requeridos y correo", () => {
  const errors = validateCliente({
    nombre: "",
    telefono: "",
    correo: "correo-invalido",
    tipoCliente: "Empresa",
    estado: "Activo",
  });

  assert.equal(errors.nombre, "El nombre es obligatorio.");
  assert.equal(errors.telefono, "El telefono es obligatorio.");
  assert.equal(errors.correo, "El correo no tiene un formato valido.");
});
