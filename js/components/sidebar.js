import { MODULES } from "../utils/constants.js";
import { localStorageService } from "../storage/localStorage.js";

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value) || 0);

const formatCurrentDate = () =>
  new Intl.DateTimeFormat("es-PE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const getSidebarSummary = () => {
  try {
    const today = getTodayKey();
    const ventas = localStorageService.getAll("ventas").filter((venta) => venta.fecha === today);
    const gastos = localStorageService.getAll("gastos").filter((gasto) => gasto.fecha === today);
    const ingresosDia = ventas.reduce((total, venta) => total + Number(venta.montoTotal || 0), 0);
    const gastosDia = gastos.reduce((total, gasto) => total + Number(gasto.monto || 0), 0);

    return {
      fecha: formatCurrentDate(),
      ingresosDia,
      gastosDia,
      utilidadDia: ingresosDia - gastosDia,
    };
  } catch {
    return {
      fecha: formatCurrentDate(),
      ingresosDia: 0,
      gastosDia: 0,
      utilidadDia: 0,
    };
  }
};

const ICONS = {
  dashboard: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13h6v7H4v-7Z"></path>
      <path d="M14 4h6v16h-6V4Z"></path>
      <path d="M4 4h6v5H4V4Z"></path>
    </svg>
  `,
  sales: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h2l2.2 10.5a2 2 0 0 0 2 1.5h6.9a2 2 0 0 0 1.9-1.4L21 9H7"></path>
      <path d="M10 21h.01"></path>
      <path d="M18 21h.01"></path>
    </svg>
  `,
  expenses: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v12H4V7Z"></path>
      <path d="M16 7V5H6v2"></path>
      <path d="M16 13h4"></path>
    </svg>
  `,
  customers: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 19a4 4 0 0 0-8 0"></path>
      <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
      <path d="M21 19a3 3 0 0 0-4-2.8"></path>
      <path d="M17 6.2a2.5 2.5 0 0 1 0 4.6"></path>
    </svg>
  `,
  services: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-3-3 2.4-2.4Z"></path>
    </svg>
  `,
  orders: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8l1 2h3v14H4V6h3l1-2Z"></path>
      <path d="M8 11h8"></path>
      <path d="M8 15h6"></path>
    </svg>
  `,
  equipment: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14v10H5V5Z"></path>
      <path d="M3 19h18"></path>
      <path d="M9 15v4"></path>
      <path d="M15 15v4"></path>
    </svg>
  `,
  support: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 5.5a4 4 0 0 0 4 4L8.8 19.2a2.1 2.1 0 0 1-3-3L15.5 6.5a4 4 0 0 0-1-1Z"></path>
      <path d="M6 18l-1 1"></path>
    </svg>
  `,
  reports: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19V5"></path>
      <path d="M4 19h16"></path>
      <path d="M8 15l3-3 3 2 5-6"></path>
    </svg>
  `,
};

const SUMMARY_ICONS = {
  date: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"></path>
    </svg>
  `,
  income: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17 10 11l4 4 6-8"></path>
      <path d="M16 7h4v4"></path>
    </svg>
  `,
  expense: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16v12H4V7Z"></path>
      <path d="M16 7V5H6v2"></path>
      <path d="m9 12 3 3 3-3"></path>
    </svg>
  `,
  profit: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.42 0 8-2.24 8-5V8c0-2.76-3.58-5-8-5S4 5.24 4 8v8c0 2.76 3.58 5 8 5Z"></path>
      <path d="M20 8c0 2.76-3.58 5-8 5S4 10.76 4 8"></path>
      <path d="M20 12c0 2.76-3.58 5-8 5s-8-2.24-8-5"></path>
    </svg>
  `,
};

const renderQuickSummary = () => {
  const summary = getSidebarSummary();

  return `
    <section class="sidebar-summary" aria-label="Resumen rápido">
      <div class="sidebar-summary__header">
        <span>Resumen rápido</span>
      </div>
      <div class="sidebar-summary__item sidebar-summary__item--date">
        <span class="sidebar-summary__icon">${SUMMARY_ICONS.date}</span>
        <div>
          <span>Fecha actual</span>
          <strong>${summary.fecha}</strong>
        </div>
      </div>
      <div class="sidebar-summary__item sidebar-summary__item--income">
        <span class="sidebar-summary__icon">${SUMMARY_ICONS.income}</span>
        <div>
          <span>Ingresos del día</span>
          <strong>${formatCurrency(summary.ingresosDia)}</strong>
        </div>
      </div>
      <div class="sidebar-summary__item sidebar-summary__item--expense">
        <span class="sidebar-summary__icon">${SUMMARY_ICONS.expense}</span>
        <div>
          <span>Gastos del día</span>
          <strong>${formatCurrency(summary.gastosDia)}</strong>
        </div>
      </div>
      <div class="sidebar-summary__item sidebar-summary__item--profit">
        <span class="sidebar-summary__icon">${SUMMARY_ICONS.profit}</span>
        <div>
          <span>Utilidad del día</span>
          <strong>${formatCurrency(summary.utilidadDia)}</strong>
        </div>
      </div>
    </section>
  `;
};

export const renderSidebar = (activeModuleKey) => `
  <aside class="sidebar" aria-label="Navegacion principal">
    <nav class="sidebar__nav">
      ${MODULES.map(
        (module) => `
          <button
            class="sidebar__link${module.key === activeModuleKey ? " sidebar__link--active" : ""}"
            type="button"
            data-module-key="${module.key}"
            aria-current="${module.key === activeModuleKey ? "page" : "false"}"
            aria-label="Abrir ${module.label}"
            title="${module.label}"
          >
            <span class="sidebar__icon">${ICONS[module.key] ?? ICONS.dashboard}</span>
            <span class="sidebar__label">${module.label}</span>
          </button>
        `,
      ).join("")}
    </nav>
    ${renderQuickSummary()}
  </aside>
`;
