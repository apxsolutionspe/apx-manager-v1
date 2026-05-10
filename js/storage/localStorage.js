import { APP_SETTINGS } from "../config/settings.js";

export const STORAGE_COLLECTIONS = {
  clientes: { key: "clientes", prefix: "CLI" },
  servicios: { key: "servicios", prefix: "SER" },
  ventas: { key: "ventas", prefix: "VEN" },
  gastos: { key: "gastos", prefix: "GAS" },
  ordenes: { key: "ordenes", prefix: "ORD" },
  equipos: { key: "equipos", prefix: "EQP" },
  soporte: { key: "soporte", prefix: "SOP" },
};

const COLLECTION_KEYS = Object.keys(STORAGE_COLLECTIONS);

const getBrowserStorage = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  return window.localStorage;
};

const isStorageAvailable = (storage = getBrowserStorage()) => {
  if (!storage) {
    return false;
  }

  try {
    const testKey = "__apx_storage_test__";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const buildStorageKey = (collectionName) => `apx-manager:${collectionName}`;

const parseStoredCollection = (rawValue) => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const assertValidCollection = (collectionName) => {
  if (!COLLECTION_KEYS.includes(collectionName)) {
    throw new Error(`Coleccion no registrada: ${collectionName}`);
  }
};

const normalizeRecord = (record) => {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("El registro debe ser un objeto valido.");
  }

  return record;
};

const getNextId = (collectionName, records) => {
  const { prefix } = STORAGE_COLLECTIONS[collectionName];
  const nextNumber =
    records.reduce((highestNumber, record) => {
      if (!record?.id || typeof record.id !== "string") {
        return highestNumber;
      }

      const [, rawNumber] = record.id.split("-");
      const currentNumber = Number(rawNumber);
      return Number.isInteger(currentNumber) ? Math.max(highestNumber, currentNumber) : highestNumber;
    }, 0) + 1;

  return `${prefix}-${String(nextNumber).padStart(5, "0")}`;
};

export const createLocalStorageService = (storage = getBrowserStorage()) => {
  const ensureAvailableStorage = () => {
    if (!isStorageAvailable(storage)) {
      throw new Error("LocalStorage no esta disponible.");
    }
  };

  const getAll = (collectionName) => {
    assertValidCollection(collectionName);
    ensureAvailableStorage();

    return parseStoredCollection(storage.getItem(buildStorageKey(collectionName)));
  };

  const saveAll = (collectionName, records) => {
    assertValidCollection(collectionName);
    ensureAvailableStorage();

    if (!Array.isArray(records)) {
      throw new Error("saveAll requiere un arreglo de registros.");
    }

    storage.setItem(buildStorageKey(collectionName), JSON.stringify(records));
    return records;
  };

  const findById = (collectionName, id) =>
    getAll(collectionName).find((record) => record.id === id) ?? null;

  const create = (collectionName, data) => {
    const records = getAll(collectionName);
    const currentTimestamp = new Date().toISOString();
    const recordData = normalizeRecord(data);
    const newRecord = {
      ...recordData,
      id: recordData.id ?? getNextId(collectionName, records),
      createdAt: recordData.createdAt ?? currentTimestamp,
      updatedAt: currentTimestamp,
    };

    saveAll(collectionName, [...records, newRecord]);
    return newRecord;
  };

  const read = (collectionName, id) => findById(collectionName, id);

  const update = (collectionName, id, data) => {
    const records = getAll(collectionName);
    const recordData = normalizeRecord(data);
    let updatedRecord = null;

    const updatedRecords = records.map((record) => {
      if (record.id !== id) {
        return record;
      }

      updatedRecord = {
        ...record,
        ...recordData,
        id: record.id,
        updatedAt: new Date().toISOString(),
      };

      return updatedRecord;
    });

    if (!updatedRecord) {
      return null;
    }

    saveAll(collectionName, updatedRecords);
    return updatedRecord;
  };

  const remove = (collectionName, id) => {
    const records = getAll(collectionName);
    const filteredRecords = records.filter((record) => record.id !== id);

    if (filteredRecords.length === records.length) {
      return false;
    }

    saveAll(collectionName, filteredRecords);
    return true;
  };

  return {
    create,
    read,
    update,
    delete: remove,
    findById,
    getAll,
    saveAll,
  };
};

export const localStorageService = createLocalStorageService();

export const getStorageItem = (key) => {
  const storage = getBrowserStorage();

  if (!isStorageAvailable(storage)) {
    return null;
  }

  const rawValue = storage.getItem(key);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
};

export const setStorageItem = (key, value) => {
  const storage = getBrowserStorage();

  if (!isStorageAvailable(storage)) {
    return;
  }

  storage.setItem(key, JSON.stringify(value));
};

export const removeStorageItem = (key) => {
  const storage = getBrowserStorage();

  if (!isStorageAvailable(storage)) {
    return;
  }

  storage.removeItem(key);
};

export const createInitialState = () => ({
  appName: APP_SETTINGS.name,
  version: APP_SETTINGS.version,
  environment: APP_SETTINGS.environment,
  initializedAt: new Date().toISOString(),
});
