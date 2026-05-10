import { formatDate } from "../../utils/formatter.js";
import { ESTADOS_PAGO, METODOS_PAGO } from "./ventasService.js";

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

const renderOptions = (options, selectedValue) =>
  options
    .map(
      (option) => `
        <option value="${escapeHtml(option)}"${option === selectedValue ? " selected" : ""}>
          ${escapeHtml(option)}
        </option>
      `,
    )
    .join("");

const renderClienteOptions = (clientes, selectedClienteId) =>
  clientes
    .map(
      (cliente) => `
        <option value="${escapeHtml(cliente.id)}"${cliente.id === selectedClienteId ? " selected" : ""}>
          ${escapeHtml(cliente.nombre)}
        </option>
      `,
    )
    .join("");

const renderServicioOptions = (servicios, selectedServicioId) =>
  servicios
    .map(
      (servicio) => `
        <option
          value="${escapeHtml(servicio.id)}"
          data-precio-base="${escapeHtml(servicio.precioBase ?? 0)}"
          ${servicio.id === selectedServicioId ? " selected" : ""}
        >
          ${escapeHtml(servicio.nombreServicio)}
        </option>
      `,
    )
    .join("");

const renderError = (fieldName, errors) =>
  errors[fieldName] ? `<small class="field-error">${escapeHtml(errors[fieldName])}</small>` : "";

const getEstadoPagoClass = (estadoPago) => {
  const normalizedEstado = String(estadoPago ?? "").toLowerCase();

  if (normalizedEstado === "pagado") {
    return "status-tag--success";
  }

  if (normalizedEstado === "pendiente") {
    return "status-tag--warning";
  }

  if (normalizedEstado === "parcial") {
    return "status-tag--info";
  }

  if (normalizedEstado === "anulado") {
    return "status-tag--danger";
  }

  return "";
};

const renderVentasSummary = (summary) => {
  const cards = [
    {
      label: "Ventas del dia",
      value: formatCurrency(summary.ventasDia),
      helper: "Ingresos registrados hoy",
      tone: "success",
      icon: "↗",
    },
    {
      label: "Ventas del mes",
      value: formatCurrency(summary.ventasMes),
      helper: "Ingresos acumulados",
      tone: "primary",
      icon: "◆",
    },
    {
      label: "Clientes activos",
      value: summary.clientesActivos,
      helper: "Clientes disponibles",
      tone: "purple",
      icon: "C",
    },
    {
      label: "Ticket promedio",
      value: formatCurrency(summary.ticketPromedio),
      helper: "Promedio por venta",
      tone: "info",
      icon: "T",
    },
  ];

  return `
    <div class="sales-summary" aria-label="Resumen de ventas">
      ${cards
        .map(
          (card) => `
            <article class="sales-summary-card sales-summary-card--${card.tone}">
              <span class="sales-summary-card__icon">${escapeHtml(card.icon)}</span>
              <div>
                <span class="sales-summary-card__label">${escapeHtml(card.label)}</span>
                <strong class="sales-summary-card__value">${escapeHtml(card.value)}</strong>
                <span class="sales-summary-card__helper">${escapeHtml(card.helper)}</span>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
};

const renderVentasRows = ({ ventas, getClienteName, getServicioName }) => {
  if (ventas.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="10">
          <span class="empty-state__icon">◇</span>
          <strong>No hay ventas registradas.</strong>
          <span>Registra tu primera venta para comenzar a controlar tus ingresos.</span>
        </td>
      </tr>
    `;
  }

  return ventas
    .map(
      (venta) => `
        <tr>
          <td>${escapeHtml(venta.id)}</td>
          <td>${formatDate(venta.fecha)}</td>
          <td>
            <strong>${escapeHtml(getClienteName(venta.clienteId))}</strong>
            <span>${escapeHtml(venta.clienteId)}</span>
          </td>
          <td>${escapeHtml(getServicioName(venta.servicioId))}</td>
          <td>${escapeHtml(venta.cantidad)}</td>
          <td>${formatCurrency(venta.precioUnitario)}</td>
          <td><strong class="sales-total">${formatCurrency(venta.montoTotal)}</strong></td>
          <td>${escapeHtml(venta.metodoPago)}</td>
          <td><span class="status-tag ${getEstadoPagoClass(venta.estadoPago)}">${escapeHtml(venta.estadoPago)}</span></td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost sales-action sales-action--edit" type="button" data-venta-edit="${escapeHtml(venta.id)}">
                <span aria-hidden="true">✎</span> Editar
              </button>
              <button class="button button--danger sales-action sales-action--delete" type="button" data-venta-delete="${escapeHtml(venta.id)}">
                <span aria-hidden="true">×</span> Eliminar
              </button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
};

export const renderVentasModule = ({
  ventas,
  clientes,
  servicios,
  summary,
  editingVenta = null,
  filters,
  errors = {},
  getClienteName,
  getServicioName,
}) => {
  const formTitle = editingVenta ? "Editar venta" : "Registrar venta";
  const submitLabel = editingVenta ? "Actualizar venta" : "Registrar venta";
  const hasDependencies = clientes.length > 0 && servicios.length > 0;

  return `
    <section class="module-view module-view--ventas" aria-label="Ventas">
      ${renderVentasSummary(summary)}

      <div class="clientes-layout">
        <form class="panel cliente-form sales-form-card" data-ventas-form>
          <input type="hidden" name="id" value="${escapeHtml(editingVenta?.id ?? "")}" />

          <div class="panel__header">
            <h3><span class="section-icon sales-section-icon">+</span>${formTitle}</h3>
            ${
              editingVenta
                ? '<button class="button button--ghost" type="button" data-ventas-cancel>Cancelar</button>'
                : ""
            }
          </div>

          ${
            hasDependencies
              ? ""
              : `<p class="dependency-warning">Registra al menos un cliente y un servicio activo antes de crear ventas.</p>`
          }

          <div class="form-grid">
            <label class="field">
              <span>Fecha</span>
              <input name="fecha" type="date" value="${escapeHtml(
                editingVenta?.fecha ?? new Date().toISOString().slice(0, 10),
              )}" />
              ${renderError("fecha", errors)}
            </label>

            <label class="field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Seleccionar cliente</option>
                ${renderClienteOptions(clientes, editingVenta?.clienteId)}
              </select>
              ${renderError("clienteId", errors)}
            </label>

            <label class="field">
              <span>Servicio</span>
              <select name="servicioId" data-venta-servicio-select>
                <option value="">Seleccionar servicio</option>
                ${renderServicioOptions(servicios, editingVenta?.servicioId)}
              </select>
              ${renderError("servicioId", errors)}
            </label>

            <label class="field">
              <span>Cantidad</span>
              <input name="cantidad" type="number" min="1" step="1" value="${escapeHtml(editingVenta?.cantidad ?? 1)}" />
              ${renderError("cantidad", errors)}
            </label>

            <label class="field">
              <span>Precio unitario</span>
              <input name="precioUnitario" type="number" min="0" step="0.01" value="${escapeHtml(
                editingVenta?.precioUnitario ?? 0,
              )}" />
              ${renderError("precioUnitario", errors)}
            </label>

            <label class="field">
              <span>Metodo de pago</span>
              <select name="metodoPago">
                ${renderOptions(METODOS_PAGO, editingVenta?.metodoPago ?? METODOS_PAGO[0])}
              </select>
              ${renderError("metodoPago", errors)}
            </label>

            <label class="field">
              <span>Estado de pago</span>
              <select name="estadoPago">
                ${renderOptions(ESTADOS_PAGO, editingVenta?.estadoPago ?? ESTADOS_PAGO[0])}
              </select>
              ${renderError("estadoPago", errors)}
            </label>

            <label class="field field--full">
              <span>Descripcion</span>
              <input name="descripcion" type="text" value="${escapeHtml(editingVenta?.descripcion ?? "")}" />
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${escapeHtml(editingVenta?.observaciones ?? "")}</textarea>
            </label>
          </div>

          <button class="button button--primary sales-submit" type="submit"${hasDependencies ? "" : " disabled"}>
            <span aria-hidden="true">✓</span>${submitLabel}
          </button>
        </form>

        <section class="panel clientes-table-panel sales-table-card" aria-label="Listado de ventas">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon sales-section-icon">≡</span>Listado de ventas</h3>
              <p>${ventas.length} registro${ventas.length === 1 ? "" : "s"}</p>
            </div>
            <div class="filters-row">
              <label class="search-field">
                <span>Filtrar por fecha</span>
                <input name="ventaFecha" type="date" value="${escapeHtml(filters.fecha)}" data-ventas-date-filter />
              </label>
              <label class="search-field">
                <span>Buscar por cliente</span>
                <input
                  name="ventaClienteSearch"
                  type="search"
                  value="${escapeHtml(filters.clienteSearch)}"
                  placeholder="Nombre, telefono, correo o ID"
                  data-ventas-client-search
                />
              </label>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="data-table data-table--wide">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Cant.</th>
                  <th>P. unitario</th>
                  <th>Total</th>
                  <th>Pago</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${renderVentasRows({ ventas, getClienteName, getServicioName })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `;
};
