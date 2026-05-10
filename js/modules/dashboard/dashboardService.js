import { localStorageService } from "../../storage/localStorage.js";

const toDateKey = (date = new Date()) => date.toISOString().slice(0, 10);
const toMonthKey = (date = new Date()) => date.toISOString().slice(0, 7);

const parseAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

const sumBy = (records, fieldName) =>
  records.reduce((total, record) => total + parseAmount(record[fieldName]), 0);

const sortByDateDesc = (records) =>
  [...records].sort((firstRecord, secondRecord) => {
    const firstDate = `${firstRecord.fecha ?? ""}T${firstRecord.createdAt ?? "00:00:00"}`;
    const secondDate = `${secondRecord.fecha ?? ""}T${secondRecord.createdAt ?? "00:00:00"}`;
    return secondDate.localeCompare(firstDate);
  });

export const createDashboardService = (storageService = localStorageService, currentDate = new Date()) => {
  const todayKey = toDateKey(currentDate);
  const monthKey = toMonthKey(currentDate);

  const getClientes = () => storageService.getAll("clientes");
  const getVentas = () => storageService.getAll("ventas");
  const getGastos = () => storageService.getAll("gastos");

  const findClienteById = (clienteId) =>
    getClientes().find((cliente) => cliente.id === clienteId) ?? null;

  const getDashboardData = () => {
    const clientes = getClientes();
    const ventas = getVentas();
    const gastos = getGastos();

    const ventasDelDia = ventas.filter((venta) => venta.fecha === todayKey);
    const gastosDelDia = gastos.filter((gasto) => gasto.fecha === todayKey);
    const ventasDelMes = ventas.filter((venta) => venta.fecha?.startsWith(monthKey));
    const gastosDelMes = gastos.filter((gasto) => gasto.fecha?.startsWith(monthKey));

    const ingresosDia = sumBy(ventasDelDia, "montoTotal");
    const gastosDia = sumBy(gastosDelDia, "monto");
    const ingresosMes = sumBy(ventasDelMes, "montoTotal");
    const gastosMes = sumBy(gastosDelMes, "monto");

    return {
      metrics: {
        ingresosDia,
        gastosDia,
        utilidadDia: ingresosDia - gastosDia,
        ingresosMes,
        gastosMes,
        gananciaMensual: ingresosMes - gastosMes,
        clientesRegistrados: clientes.length,
        ventasRegistradas: ventas.length,
      },
      latestVentas: sortByDateDesc(ventas).slice(0, 5),
      latestGastos: sortByDateDesc(gastos).slice(0, 5),
      findClienteById,
    };
  };

  return {
    getDashboardData,
  };
};

const dashboardService = createDashboardService();

export const getDashboardData = dashboardService.getDashboardData;
