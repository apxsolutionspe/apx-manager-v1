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

const formatMetricValue = (metric) =>
  metric.type === "currency" ? formatCurrency(metric.value) : String(metric.value);

const renderMetricCards = (metrics) => {
  const cards = [
    { label: "Ingresos del dia", value: metrics.ingresosDia, type: "currency", tone: "success", icon: "$", helper: "Ventas registradas hoy" },
    { label: "Gastos del dia", value: metrics.gastosDia, type: "currency", tone: "danger", icon: "-", helper: "Egresos operativos hoy" },
    { label: "Utilidad del dia", value: metrics.utilidadDia, type: "currency", tone: "primary", icon: "+", helper: "Balance neto diario" },
    { label: "Ingresos del mes", value: metrics.ingresosMes, type: "currency", tone: "purple", icon: "M", helper: "Ventas acumuladas" },
    { label: "Gastos del mes", value: metrics.gastosMes, type: "currency", tone: "warning", icon: "G", helper: "Costos acumulados" },
    { label: "Ganancia mensual", value: metrics.gananciaMensual, type: "currency", tone: "info", icon: "N", helper: "Resultado mensual" },
    { label: "Clientes registrados", value: metrics.clientesRegistrados, type: "number", tone: "indigo", icon: "C", helper: "Base comercial" },
    { label: "Ventas registradas", value: metrics.ventasRegistradas, type: "number", tone: "teal", icon: "V", helper: "Operaciones totales" },
  ];

  return cards
    .map(
      (card) => `
        <article class="metric-card dashboard-card dashboard-card--${card.tone}">
          <span class="dashboard-card__icon">${escapeHtml(card.icon)}</span>
          <span class="metric-card__label">${escapeHtml(card.label)}</span>
          <strong class="metric-card__value">${escapeHtml(formatMetricValue(card))}</strong>
          <span class="dashboard-card__helper">${escapeHtml(card.helper)}</span>
        </article>
      `,
    )
    .join("");
};

const renderLatestVentasRows = (ventas, findClienteById) => {
  if (ventas.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="5">
          <span class="empty-state__icon">◇</span>
          <strong>No hay ventas registradas.</strong>
          <span>Registra tu primera venta para empezar a medir ingresos.</span>
        </td>
      </tr>
    `;
  }

  return ventas
    .map((venta) => {
      const cliente = findClienteById(venta.clienteId);

      return `
        <tr>
          <td>${escapeHtml(venta.id)}</td>
          <td>${formatDate(venta.fecha)}</td>
          <td>
            <strong>${escapeHtml(cliente?.nombre ?? "Cliente no encontrado")}</strong>
            <span>${escapeHtml(venta.descripcion || venta.clienteId)}</span>
          </td>
          <td>${escapeHtml(venta.estadoPago)}</td>
          <td><strong>${formatCurrency(venta.montoTotal)}</strong></td>
        </tr>
      `;
    })
    .join("");
};

const renderLatestGastosRows = (gastos) => {
  if (gastos.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="5">
          <span class="empty-state__icon">◇</span>
          <strong>No hay gastos registrados.</strong>
          <span>Agrega tu primer gasto para controlar tus finanzas.</span>
        </td>
      </tr>
    `;
  }

  return gastos
    .map(
      (gasto) => `
        <tr>
          <td>${escapeHtml(gasto.id)}</td>
          <td>${formatDate(gasto.fecha)}</td>
          <td>
            <strong>${escapeHtml(gasto.concepto)}</strong>
            <span>${escapeHtml(gasto.comprobante || "Sin comprobante")}</span>
          </td>
          <td>${escapeHtml(gasto.categoria)}</td>
          <td><strong>${formatCurrency(gasto.monto)}</strong></td>
        </tr>
      `,
    )
    .join("");
};

export const renderDashboardModule = ({ metrics, latestVentas, latestGastos, findClienteById }) => `
  <section class="module-view module-view--dashboard" aria-label="Dashboard">
    <div class="dashboard-grid" aria-label="Resumen de indicadores">
      ${renderMetricCards(metrics)}
    </div>

    <div class="dashboard-tables">
      <section class="panel dashboard-table-panel" aria-label="Ultimas ventas">
        <div class="panel__header">
          <h3><span class="section-icon">↗</span> Ultimas ventas</h3>
          <button class="button button--ghost" type="button" data-module-key="sales">Ver todas</button>
        </div>
        <div class="table-wrapper">
          <table class="data-table data-table--compact">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${renderLatestVentasRows(latestVentas, findClienteById)}
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel dashboard-table-panel" aria-label="Ultimos gastos">
        <div class="panel__header">
          <h3><span class="section-icon">↘</span> Ultimos gastos</h3>
          <button class="button button--ghost" type="button" data-module-key="expenses">Ver todos</button>
        </div>
        <div class="table-wrapper">
          <table class="data-table data-table--compact">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Categoria</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              ${renderLatestGastosRows(latestGastos)}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
`;
