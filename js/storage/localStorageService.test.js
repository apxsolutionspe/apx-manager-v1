import assert from "node:assert/strict";
import test from "node:test";
import { createLocalStorageService } from "./localStorage.js";

const createMemoryStorage = () => {
  const items = new Map();

  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: (key) => items.delete(key),
    clear: () => items.clear(),
  };
};

test("crea registros con ID secuencial segun la coleccion", () => {
  const service = createLocalStorageService(createMemoryStorage());

  const firstClient = service.create("clientes", { nombre: "Apex Cliente 1" });
  const secondClient = service.create("clientes", { nombre: "Apex Cliente 2" });
  const sale = service.create("ventas", { total: 1500 });

  assert.equal(firstClient.id, "CLI-00001");
  assert.equal(secondClient.id, "CLI-00002");
  assert.equal(sale.id, "VEN-00001");
});

test("lee, busca, actualiza y elimina registros por ID", () => {
  const service = createLocalStorageService(createMemoryStorage());
  const createdClient = service.create("clientes", { nombre: "Cliente inicial" });

  assert.equal(service.read("clientes", createdClient.id).nombre, "Cliente inicial");
  assert.equal(service.findById("clientes", createdClient.id).id, createdClient.id);

  const updatedClient = service.update("clientes", createdClient.id, { nombre: "Cliente actualizado" });

  assert.equal(updatedClient.nombre, "Cliente actualizado");
  assert.equal(updatedClient.id, createdClient.id);
  assert.equal(service.delete("clientes", createdClient.id), true);
  assert.equal(service.findById("clientes", createdClient.id), null);
});

test("guarda y obtiene colecciones completas", () => {
  const service = createLocalStorageService(createMemoryStorage());
  const records = [
    { id: "SER-00010", nombre: "Mantenimiento" },
    { id: "SER-00011", nombre: "Instalacion" },
  ];

  service.saveAll("servicios", records);

  assert.deepEqual(service.getAll("servicios"), records);
});

test("valida colecciones y formatos de entrada", () => {
  const service = createLocalStorageService(createMemoryStorage());

  assert.throws(() => service.getAll("inventario"), /Coleccion no registrada/);
  assert.throws(() => service.create("clientes", null), /registro debe ser un objeto/);
  assert.throws(() => service.saveAll("clientes", {}), /arreglo de registros/);
});
