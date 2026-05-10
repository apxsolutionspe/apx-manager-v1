import { localStorageService } from "../../storage/localStorage.js";

const ACTIVE_ORDER_STATES = ["Pendiente", "En proceso"];
const TERMINAL_SUPPORT_STATES = ["Entregado", "Sin solución", "Sin soluciÃ³n", "Sin solucion"];

const todayKey = () => new Date().toISOString().slice(0, 10);

const sumBy = (records, fieldName) =>
  records.reduce((total, record) => total + Number(record[fieldName] || 0), 0);

export const getSystemNotifications = () => {
  const today = todayKey();
  const ordenes = localStorageService.getAll("ordenes");
  const soportes = localStorageService.getAll("soporte");
  const gastos = localStorageService.getAll("gastos");
  const ventas = localStorageService.getAll("ventas");

  const ordenesPendientes = ordenes.filter((orden) => ACTIVE_ORDER_STATES.includes(orden.estado));
  const equiposEnSoporte = soportes.filter((soporte) => !TERMINAL_SUPPORT_STATES.includes(soporte.estado));
  const gastosDelDia = gastos.filter((gasto) => gasto.fecha === today);
  const ventasDelDia = ventas.filter((venta) => venta.fecha === today);

  const items = [
    {
      key: "orders",
      label: "Órdenes pendientes",
      count: ordenesPendientes.length,
      detail: `${ordenesPendientes.length} orden${ordenesPendientes.length === 1 ? "" : "es"} abierta${ordenesPendientes.length === 1 ? "" : "s"}`,
      tone: "warning",
    },
    {
      key: "support",
      label: "Equipos en soporte",
      count: equiposEnSoporte.length,
      detail: `${equiposEnSoporte.length} caso${equiposEnSoporte.length === 1 ? "" : "s"} técnico${equiposEnSoporte.length === 1 ? "" : "s"} activo${equiposEnSoporte.length === 1 ? "" : "s"}`,
      tone: "info",
    },
    {
      key: "expenses",
      label: "Gastos del día",
      count: gastosDelDia.length,
      detail: `Total registrado: ${new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(sumBy(gastosDelDia, "monto"))}`,
      tone: "danger",
    },
    {
      key: "sales",
      label: "Ventas registradas hoy",
      count: ventasDelDia.length,
      detail: `Total registrado: ${new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(sumBy(ventasDelDia, "montoTotal"))}`,
      tone: "success",
    },
  ];

  return {
    total: items.reduce((total, item) => total + item.count, 0),
    items: items.filter((item) => item.count > 0),
  };
};
