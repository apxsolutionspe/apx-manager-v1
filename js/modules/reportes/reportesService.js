import { localStorageService } from "../../storage/localStorage.js";

const TERMINAL_SUPPORT_STATES = ["Entregado", "Sin solución", "Sin solucion"];

const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

const normalizeFilters = ({ fechaInicio = "", fechaFin = "" } = {}) => ({
  fechaInicio,
  fechaFin,
});

const isWithinDateRange = (dateValue, filters) => {
  if (!dateValue) {
    return false;
  }

  if (filters.fechaInicio && dateValue < filters.fechaInicio) {
    return false;
  }

  if (filters.fechaFin && dateValue > filters.fechaFin) {
    return false;
  }

  return true;
};

const sumBy = (records, fieldName) =>
  records.reduce((total, record) => total + parseAmount(record[fieldName]), 0);

const groupSumByDate = (records, amountField) => {
  const grouped = new Map();

  records.forEach((record) => {
    const currentValue = grouped.get(record.fecha) ?? 0;
    grouped.set(record.fecha, currentValue + parseAmount(record[amountField]));
  });

  return [...grouped.entries()]
    .map(([fecha, total]) => ({ fecha, total }))
    .sort((first, second) => second.fecha.localeCompare(first.fecha));
};

const groupSumByMonth = (records, amountField) => {
  const grouped = new Map();

  records.forEach((record) => {
    const monthKey = record.fecha?.slice(0, 7);

    if (!monthKey) {
      return;
    }

    const currentValue = grouped.get(monthKey) ?? 0;
    grouped.set(monthKey, currentValue + parseAmount(record[amountField]));
  });

  return [...grouped.entries()]
    .map(([mes, total]) => ({ mes, total }))
    .sort((first, second) => second.mes.localeCompare(first.mes));
};

const mergeTotalsByKey = ({ primaryRows, secondaryRows, keyName }) => {
  const keys = new Set([
    ...primaryRows.map((row) => row[keyName]),
    ...secondaryRows.map((row) => row[keyName]),
  ]);

  return [...keys]
    .map((key) => {
      const primaryRow = primaryRows.find((row) => row[keyName] === key);
      const secondaryRow = secondaryRows.find((row) => row[keyName] === key);

      return {
        [keyName]: key,
        total: (primaryRow?.total ?? 0) - (secondaryRow?.total ?? 0),
      };
    })
    .sort((first, second) => second[keyName].localeCompare(first[keyName]));
};

const getNameById = (records, id, fieldName, fallback) =>
  records.find((record) => record.id === id)?.[fieldName] ?? fallback;

const getTopServices = (ventas, servicios) => {
  const grouped = new Map();

  ventas.forEach((venta) => {
    const current = grouped.get(venta.servicioId) ?? {
      servicioId: venta.servicioId,
      nombre: getNameById(servicios, venta.servicioId, "nombreServicio", "Servicio no encontrado"),
      cantidad: 0,
      total: 0,
    };

    grouped.set(venta.servicioId, {
      ...current,
      cantidad: current.cantidad + parseAmount(venta.cantidad),
      total: current.total + parseAmount(venta.montoTotal),
    });
  });

  return [...grouped.values()]
    .sort((first, second) => second.cantidad - first.cantidad || second.total - first.total)
    .slice(0, 5);
};

const getFrequentCustomers = (ventas, clientes) => {
  const grouped = new Map();

  ventas.forEach((venta) => {
    const current = grouped.get(venta.clienteId) ?? {
      clienteId: venta.clienteId,
      nombre: getNameById(clientes, venta.clienteId, "nombre", "Cliente no encontrado"),
      ventas: 0,
      total: 0,
    };

    grouped.set(venta.clienteId, {
      ...current,
      ventas: current.ventas + 1,
      total: current.total + parseAmount(venta.montoTotal),
    });
  });

  return [...grouped.values()]
    .sort((first, second) => second.ventas - first.ventas || second.total - first.total)
    .slice(0, 5);
};

const getPendingOrders = (ordenes, clientes) =>
  ordenes
    .filter((orden) => ["Pendiente", "En proceso"].includes(orden.estado))
    .map((orden) => ({
      ...orden,
      clienteNombre: getNameById(clientes, orden.clienteId, "nombre", "Cliente no encontrado"),
    }))
    .sort((first, second) => first.fecha.localeCompare(second.fecha))
    .slice(0, 8);

const getEquipmentInSupport = (soportes, equipos, clientes) =>
  soportes
    .filter((soporte) => !TERMINAL_SUPPORT_STATES.includes(soporte.estado))
    .map((soporte) => {
      const equipo = equipos.find((currentEquipo) => currentEquipo.id === soporte.equipoId);

      return {
        ...soporte,
        clienteNombre: getNameById(clientes, soporte.clienteId, "nombre", "Cliente no encontrado"),
        equipoNombre: equipo
          ? `${equipo.tipoEquipo} ${equipo.marca} ${equipo.modelo} (${equipo.serie})`
          : "Equipo no encontrado",
      };
    })
    .sort((first, second) => second.fecha.localeCompare(first.fecha))
    .slice(0, 8);

export const createReportesService = (storageService = localStorageService) => {
  const getReportesData = (rawFilters = {}) => {
    const filters = normalizeFilters(rawFilters);
    const clientes = storageService.getAll("clientes");
    const servicios = storageService.getAll("servicios");
    const ventas = storageService.getAll("ventas").filter((venta) => isWithinDateRange(venta.fecha, filters));
    const gastos = storageService.getAll("gastos").filter((gasto) => isWithinDateRange(gasto.fecha, filters));
    const ordenes = storageService.getAll("ordenes");
    const equipos = storageService.getAll("equipos");
    const soportes = storageService.getAll("soporte");

    const ingresosPorDia = groupSumByDate(ventas, "montoTotal");
    const gastosPorDia = groupSumByDate(gastos, "monto");
    const ingresosPorMes = groupSumByMonth(ventas, "montoTotal");
    const gastosPorMes = groupSumByMonth(gastos, "monto");
    const ingresosTotal = sumBy(ventas, "montoTotal");
    const gastosTotal = sumBy(gastos, "monto");

    return {
      filters,
      resumen: {
        ingresosTotal,
        gastosTotal,
        utilidadTotal: ingresosTotal - gastosTotal,
        ordenesPendientes: ordenes.filter((orden) => ["Pendiente", "En proceso"].includes(orden.estado)).length,
        equiposEnSoporte: soportes.filter((soporte) => !TERMINAL_SUPPORT_STATES.includes(soporte.estado)).length,
      },
      ingresosPorDia,
      gastosPorDia,
      utilidadDiaria: mergeTotalsByKey({
        primaryRows: ingresosPorDia,
        secondaryRows: gastosPorDia,
        keyName: "fecha",
      }),
      ingresosPorMes,
      gastosPorMes,
      gananciaMensual: mergeTotalsByKey({
        primaryRows: ingresosPorMes,
        secondaryRows: gastosPorMes,
        keyName: "mes",
      }),
      serviciosMasVendidos: getTopServices(ventas, servicios),
      clientesFrecuentes: getFrequentCustomers(ventas, clientes),
      ordenesPendientes: getPendingOrders(ordenes, clientes),
      equiposEnSoporte: getEquipmentInSupport(soportes, equipos, clientes),
    };
  };

  return {
    getReportesData,
  };
};

const reportesService = createReportesService();

export const getReportesData = reportesService.getReportesData;
