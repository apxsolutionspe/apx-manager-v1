import { formatDate } from "../../utils/formatter.js";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value) || 0);

const icons = {
  chart: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19h16" />
      <path d="M7 16V9M12 16V5M17 16v-7" />
    </svg>
  `,
  filter: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" />
    </svg>
  `,
  coinUp: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.42 0 8-2.24 8-5V8c0-2.76-3.58-5-8-5S4 5.24 4 8v8c0 2.76 3.58 5 8 5Z" />
      <path d="M20 8c0 2.76-3.58 5-8 5S4 10.76 4 8" />
      <path d="m9 17 3-3 3 3" />
    </svg>
  `,
  walletDown: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v2.25h-4.25a3.25 3.25 0 0 0 0 6.5H20V17a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="M15.75 10.75H21v3.5h-5.25a1.75 1.75 0 1 1 0-3.5Z" />
      <path d="m9 11 3 3 3-3" />
    </svg>
  `,
  trending: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17 10 11l4 4 6-8" />
      <path d="M16 7h4v4" />
    </svg>
  `,
  clipboard: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" />
      <path d="M9 4h6v4H9V4ZM8 12h8M8 16h6" />
    </svg>
  `,
  monitor: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H4V5Z" />
      <path d="M9 21h6M12 16v5" />
    </svg>
  `,
  calendar: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  `,
  refresh: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6v5h-5" />
      <path d="M4 18v-5h5" />
      <path d="M18.5 9A7 7 0 0 0 6.1 6.1L4 8M5.5 15a7 7 0 0 0 12.4 2.9L20 16" />
    </svg>
  `,
  document: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7V3Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  `,
};

const renderMetricCards = (resumen) => {
  const cards = [
    {
      className: "reports-summary-card--income",
      icon: icons.coinUp,
      label: "Ingresos filtrados",
      value: formatCurrency(resumen.ingresosTotal),
      helper: "Ventas dentro del rango",
    },
    {
      className: "reports-summary-card--expense",
      icon: icons.walletDown,
      label: "Gastos filtrados",
      value: formatCurrency(resumen.gastosTotal),
      helper: "Egresos dentro del rango",
    },
    {
      className: "reports-summary-card--profit",
      icon: icons.trending,
      label: "Utilidad filtrada",
      value: formatCurrency(resumen.utilidadTotal),
      helper: "Ingresos menos gastos",
    },
    {
      className: "reports-summary-card--orders",
      icon: icons.clipboard,
      label: "Órdenes pendientes",
      value: resumen.ordenesPendientes,
      helper: "Pendientes o en proceso",
    },
    {
      className: "reports-summary-card--equipment",
      icon: icons.monitor,
      label: "Equipos en soporte",
      value: resumen.equiposEnSoporte,
      helper: "Casos técnicos activos",
    },
  ];

  return cards
    .map(
      (card) => `
        <article class="reports-summary-card ${card.className}">
          <span class="reports-summary-card__icon">${card.icon}</span>
          <div>
            <span class="reports-summary-card__label">${escapeHtml(card.label)}</span>
            <strong class="reports-summary-card__value">${escapeHtml(card.value)}</strong>
            <span class="reports-summary-card__helper">${escapeHtml(card.helper)}</span>
          </div>
        </article>
      `,
    )
    .join("");
};

const renderEmptyState = ({ title, helper, colspan }) => `
  <tr>
    <td class="empty-state reports-empty-state" colspan="${colspan}">
      <span class="empty-state__icon reports-empty-icon">${icons.document}</span>
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(helper)}</span>
    </td>
  </tr>
`;

const renderSimpleRows = ({ rows, labelField, emptyTitle, emptyHelper }) => {
  if (rows.length === 0) {
    return renderEmptyState({ title: emptyTitle, helper: emptyHelper, colspan: 2 });
  }

  return rows
    .slice(0, 8)
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row[labelField])}</td>
          <td><strong class="reports-money">${formatCurrency(row.total)}</strong></td>
        </tr>
      `,
    )
    .join("");
};

const renderTopServicesRows = (rows) => {
  if (rows.length === 0) {
    return renderEmptyState({
      title: "No hay servicios vendidos.",
      helper: "Registra ventas para ver el ranking.",
      colspan: 3,
    });
  }

  return rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.nombre)}</td>
          <td>${escapeHtml(row.cantidad)}</td>
          <td><strong class="reports-money">${formatCurrency(row.total)}</strong></td>
        </tr>
      `,
    )
    .join("");
};

const renderFrequentCustomersRows = (rows) => {
  if (rows.length === 0) {
    return renderEmptyState({
      title: "No hay clientes frecuentes.",
      helper: "Las ventas registradas alimentan este reporte.",
      colspan: 3,
    });
  }

  return rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.nombre)}</td>
          <td>${escapeHtml(row.ventas)}</td>
          <td><strong class="reports-money">${formatCurrency(row.total)}</strong></td>
        </tr>
      `,
    )
    .join("");
};

const renderPendingOrdersRows = (rows) => {
  if (rows.length === 0) {
    return renderEmptyState({
      title: "No hay órdenes pendientes.",
      helper: "Las órdenes abiertas aparecerán aquí.",
      colspan: 4,
    });
  }

  return rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.id)}</td>
          <td>${formatDate(row.fecha)}</td>
          <td>${escapeHtml(row.clienteNombre)}</td>
          <td><span class="reports-status-badge">${escapeHtml(row.estado)}</span></td>
        </tr>
      `,
    )
    .join("");
};

const renderSupportEquipmentRows = (rows) => {
  if (rows.length === 0) {
    return renderEmptyState({
      title: "No hay equipos en soporte.",
      helper: "Los casos activos se mostrarán en esta tabla.",
      colspan: 4,
    });
  }

  return rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.id)}</td>
          <td>${escapeHtml(row.clienteNombre)}</td>
          <td>${escapeHtml(row.equipoNombre)}</td>
          <td><span class="reports-status-badge">${escapeHtml(row.estado)}</span></td>
        </tr>
      `,
    )
    .join("");
};

const renderPanel = ({ title, icon, headers, body, variant = "" }) => `
  <section class="panel dashboard-table-panel reports-table-panel ${variant}">
    <div class="panel__header">
      <h3><span class="section-icon reports-section-icon">${icon}</span>${escapeHtml(title)}</h3>
    </div>
    <div class="table-wrapper">
      <table class="data-table data-table--compact">
        <thead>
          <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  </section>
`;

export const renderReportesModule = (reportesData) => `
  <section class="module-view module-view--reportes" aria-label="Reportes">
    <form class="panel report-filters reports-filter-card" data-reportes-filters>
      <div class="reports-filter-card__header">
        <h3><span class="section-icon reports-section-icon">${icons.filter}</span>Filtros</h3>
      </div>
      <label class="field reports-date-field">
        <span>Fecha inicio</span>
        <input name="fechaInicio" type="date" value="${escapeHtml(reportesData.filters.fechaInicio)}" />
      </label>
      <label class="field reports-date-field">
        <span>Fecha fin</span>
        <input name="fechaFin" type="date" value="${escapeHtml(reportesData.filters.fechaFin)}" />
      </label>
      <button class="button button--primary report-filters__button reports-apply-button" type="submit">
        ${icons.chart}
        <span>Aplicar filtros</span>
      </button>
      <button class="button button--ghost reports-clear-button" type="button" data-reportes-clear>
        ${icons.refresh}
        <span>Limpiar</span>
      </button>
    </form>

    <div class="reports-summary" aria-label="Resumen de reportes">
      ${renderMetricCards(reportesData.resumen)}
    </div>

    <div class="reports-grid">
      ${renderPanel({
        title: "Ingresos por día",
        icon: icons.coinUp,
        headers: ["Fecha", "Ingresos"],
        variant: "reports-table-panel--income",
        body: renderSimpleRows({
          rows: reportesData.ingresosPorDia,
          labelField: "fecha",
          emptyTitle: "No hay ingresos en el rango.",
          emptyHelper: "Ajusta el filtro o registra ventas para generar el reporte.",
        }),
      })}
      ${renderPanel({
        title: "Gastos por día",
        icon: icons.walletDown,
        headers: ["Fecha", "Gastos"],
        variant: "reports-table-panel--expense",
        body: renderSimpleRows({
          rows: reportesData.gastosPorDia,
          labelField: "fecha",
          emptyTitle: "No hay gastos en el rango.",
          emptyHelper: "Ajusta el filtro o registra gastos para generar el reporte.",
        }),
      })}
      ${renderPanel({
        title: "Utilidad diaria",
        icon: icons.trending,
        headers: ["Fecha", "Utilidad"],
        body: renderSimpleRows({
          rows: reportesData.utilidadDiaria,
          labelField: "fecha",
          emptyTitle: "No hay utilidad diaria en el rango.",
          emptyHelper: "Ajusta el filtro para analizar la utilidad.",
        }),
      })}
      ${renderPanel({
        title: "Ingresos por mes",
        icon: icons.coinUp,
        headers: ["Mes", "Ingresos"],
        body: renderSimpleRows({
          rows: reportesData.ingresosPorMes,
          labelField: "mes",
          emptyTitle: "No hay ingresos mensuales.",
          emptyHelper: "Registra ventas para generar el reporte mensual.",
        }),
      })}
      ${renderPanel({
        title: "Gastos por mes",
        icon: icons.walletDown,
        headers: ["Mes", "Gastos"],
        body: renderSimpleRows({
          rows: reportesData.gastosPorMes,
          labelField: "mes",
          emptyTitle: "No hay gastos mensuales.",
          emptyHelper: "Registra gastos para generar el reporte mensual.",
        }),
      })}
      ${renderPanel({
        title: "Ganancia mensual",
        icon: icons.trending,
        headers: ["Mes", "Ganancia"],
        body: renderSimpleRows({
          rows: reportesData.gananciaMensual,
          labelField: "mes",
          emptyTitle: "No hay ganancia mensual.",
          emptyHelper: "Ajusta el rango o registra movimientos.",
        }),
      })}
      ${renderPanel({
        title: "Servicios más vendidos",
        icon: icons.chart,
        headers: ["Servicio", "Cantidad", "Total"],
        body: renderTopServicesRows(reportesData.serviciosMasVendidos),
      })}
      ${renderPanel({
        title: "Clientes frecuentes",
        icon: icons.chart,
        headers: ["Cliente", "Ventas", "Total"],
        body: renderFrequentCustomersRows(reportesData.clientesFrecuentes),
      })}
      ${renderPanel({
        title: "Órdenes pendientes",
        icon: icons.clipboard,
        headers: ["ID", "Fecha", "Cliente", "Estado"],
        body: renderPendingOrdersRows(reportesData.ordenesPendientes),
      })}
      ${renderPanel({
        title: "Equipos en soporte",
        icon: icons.monitor,
        headers: ["ID", "Cliente", "Equipo", "Estado"],
        body: renderSupportEquipmentRows(reportesData.equiposEnSoporte),
      })}
    </div>
  </section>
`;
