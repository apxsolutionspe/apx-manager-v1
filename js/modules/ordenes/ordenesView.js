import { formatDate } from "../../utils/formatter.js";
import { ORDEN_ESTADOS, ORDEN_PRIORIDADES } from "./ordenesService.js";

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
  clipboard: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" />
      <path d="M9 4h6v4H9V4ZM8 12h8M8 16h6" />
    </svg>
  `,
  clipboardPlus: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4h6l1 2h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l1-2Z" />
      <path d="M9 4h6v4H9V4ZM12 12v6M9 15h6" />
    </svg>
  `,
  user: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 21a7 7 0 0 0-14 0" />
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </svg>
  `,
  clock: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path d="M12 6v6l4 2" />
    </svg>
  `,
  check: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,
  edit: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.5-.5 4 4-.5L19 8.5 15.5 5 4 16.5Z" />
      <path d="m14 6.5 3.5 3.5" />
    </svg>
  `,
  trash: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  `,
};

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

const renderError = (fieldName, errors) =>
  errors[fieldName] ? `<small class="field-error">${escapeHtml(errors[fieldName])}</small>` : "";

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]).join("");

  return (initials || "CL").toUpperCase();
};

const getStatusClass = (status) =>
  `order-status-badge--${String(status ?? "pendiente")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const getPriorityClass = (priority) =>
  `order-priority-badge--${String(priority ?? "media")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const getBalanceClass = (saldo) => (Number(saldo) > 0 ? "order-balance--pending" : "order-balance--settled");

const renderOrdenesSummary = (summary = {}) => `
  <div class="orders-summary" aria-label="Resumen de órdenes">
    <article class="orders-summary-card orders-summary-card--primary">
      <span class="orders-summary-card__icon">${icons.clipboard}</span>
      <div>
        <span class="orders-summary-card__label">Total de órdenes</span>
        <strong class="orders-summary-card__value">${Number(summary.total) || 0}</strong>
        <span class="orders-summary-card__helper">Flujo operativo completo</span>
      </div>
    </article>

    <article class="orders-summary-card orders-summary-card--warning">
      <span class="orders-summary-card__icon">${icons.clock}</span>
      <div>
        <span class="orders-summary-card__label">Pendientes</span>
        <strong class="orders-summary-card__value">${Number(summary.pending) || 0}</strong>
        <span class="orders-summary-card__helper">Requieren atención inicial</span>
      </div>
    </article>

    <article class="orders-summary-card orders-summary-card--info">
      <span class="orders-summary-card__icon">${icons.clipboardPlus}</span>
      <div>
        <span class="orders-summary-card__label">En proceso</span>
        <strong class="orders-summary-card__value">${Number(summary.inProgress) || 0}</strong>
        <span class="orders-summary-card__helper">Trabajo operativo activo</span>
      </div>
    </article>

    <article class="orders-summary-card orders-summary-card--teal">
      <span class="orders-summary-card__icon">${icons.check}</span>
      <div>
        <span class="orders-summary-card__label">Entregadas</span>
        <strong class="orders-summary-card__value">${Number(summary.delivered) || 0}</strong>
        <span class="orders-summary-card__helper">Cerradas con entrega</span>
      </div>
    </article>
  </div>
`;

const renderOrdenesRows = ({ ordenes, getClienteName }) => {
  if (ordenes.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="10">
          <span class="empty-state__icon orders-empty-icon">${icons.clipboard}</span>
          <strong>No hay órdenes de trabajo registradas.</strong>
          <span>Crea una orden para dar seguimiento operativo.</span>
        </td>
      </tr>
    `;
  }

  return ordenes
    .map((orden) => {
      const clienteName = getClienteName(orden.clienteId);

      return `
        <tr>
          <td>${escapeHtml(orden.id)}</td>
          <td>${formatDate(orden.fecha)}</td>
          <td>
            <div class="order-client-cell">
              <span class="order-client-avatar" aria-hidden="true">${escapeHtml(getInitials(clienteName))}</span>
              <div>
                <strong>${escapeHtml(clienteName)}</strong>
                <span>${escapeHtml(orden.clienteId)}</span>
              </div>
            </div>
          </td>
          <td>
            <strong>${escapeHtml(orden.tipoServicio)}</strong>
            <span>${escapeHtml(orden.descripcionTrabajo)}</span>
          </td>
          <td><strong class="order-amount">${formatCurrency(orden.montoEstimado)}</strong></td>
          <td><strong class="order-advance">${formatCurrency(orden.adelanto)}</strong></td>
          <td><strong class="order-balance ${getBalanceClass(orden.saldo)}">${formatCurrency(orden.saldo)}</strong></td>
          <td>${orden.fechaEntrega ? formatDate(orden.fechaEntrega) : "Sin fecha"}</td>
          <td>
            <span class="order-status-badge ${getStatusClass(orden.estado)}">${escapeHtml(orden.estado)}</span>
            <span class="order-priority-badge ${getPriorityClass(orden.prioridad)}">${escapeHtml(orden.prioridad)}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost orders-action orders-action--edit" type="button" data-orden-edit="${escapeHtml(orden.id)}" title="Editar orden" aria-label="Editar orden ${escapeHtml(orden.id)}">
                ${icons.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger orders-action orders-action--delete" type="button" data-orden-delete="${escapeHtml(orden.id)}" title="Eliminar orden" aria-label="Eliminar orden ${escapeHtml(orden.id)}">
                ${icons.trash}
                <span>Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
};

export const renderOrdenesModule = ({
  ordenes,
  summary,
  clientes,
  editingOrden = null,
  filters,
  errors = {},
  getClienteName,
}) => {
  const formTitle = editingOrden ? "Editar orden" : "Nueva orden";
  const submitLabel = editingOrden ? "Actualizar orden" : "Crear orden";
  const hasClientes = clientes.length > 0;

  return `
    <section class="module-view module-view--ordenes" aria-label="Órdenes de Trabajo">
      ${renderOrdenesSummary(summary)}

      <div class="clientes-layout">
        <form class="panel cliente-form orders-form-card" data-ordenes-form>
          <input type="hidden" name="id" value="${escapeHtml(editingOrden?.id ?? "")}" />

          <div class="panel__header">
            <h3><span class="section-icon orders-section-icon">${icons.clipboardPlus}</span>${formTitle}</h3>
            ${
              editingOrden
                ? '<button class="button button--ghost" type="button" data-ordenes-cancel>Cancelar</button>'
                : ""
            }
          </div>

          ${hasClientes ? "" : '<p class="dependency-warning">Registra al menos un cliente antes de crear órdenes.</p>'}

          <div class="form-grid">
            <label class="field">
              <span>Fecha</span>
              <input name="fecha" type="date" value="${escapeHtml(
                editingOrden?.fecha ?? new Date().toISOString().slice(0, 10),
              )}" />
              ${renderError("fecha", errors)}
            </label>

            <label class="field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Seleccionar cliente</option>
                ${renderClienteOptions(clientes, editingOrden?.clienteId)}
              </select>
              ${renderError("clienteId", errors)}
            </label>

            <label class="field field--full">
              <span>Tipo de servicio</span>
              <input name="tipoServicio" type="text" value="${escapeHtml(editingOrden?.tipoServicio ?? "")}" />
              ${renderError("tipoServicio", errors)}
            </label>

            <label class="field field--full">
              <span>Descripción del trabajo</span>
              <textarea name="descripcionTrabajo" rows="3">${escapeHtml(editingOrden?.descripcionTrabajo ?? "")}</textarea>
              ${renderError("descripcionTrabajo", errors)}
            </label>

            <label class="field">
              <span>Monto estimado</span>
              <input name="montoEstimado" type="number" min="0" step="0.01" value="${escapeHtml(editingOrden?.montoEstimado ?? 0)}" />
              ${renderError("montoEstimado", errors)}
            </label>

            <label class="field">
              <span>Adelanto</span>
              <input name="adelanto" type="number" min="0" step="0.01" value="${escapeHtml(editingOrden?.adelanto ?? 0)}" />
              ${renderError("adelanto", errors)}
            </label>

            <label class="field">
              <span>Fecha de entrega</span>
              <input name="fechaEntrega" type="date" value="${escapeHtml(editingOrden?.fechaEntrega ?? "")}" />
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="estado">
                ${renderOptions(ORDEN_ESTADOS, editingOrden?.estado ?? ORDEN_ESTADOS[0])}
              </select>
              ${renderError("estado", errors)}
            </label>

            <label class="field">
              <span>Prioridad</span>
              <select name="prioridad">
                ${renderOptions(ORDEN_PRIORIDADES, editingOrden?.prioridad ?? ORDEN_PRIORIDADES[1])}
              </select>
              ${renderError("prioridad", errors)}
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${escapeHtml(editingOrden?.observaciones ?? "")}</textarea>
            </label>
          </div>

          <button class="button button--primary orders-submit" type="submit"${hasClientes ? "" : " disabled"}>
            ${icons.clipboardPlus}
            <span>${submitLabel}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel orders-table-card" aria-label="Listado de órdenes">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon orders-section-icon">${icons.clipboard}</span>Listado de órdenes</h3>
              <p>${ordenes.length} registro${ordenes.length === 1 ? "" : "s"}</p>
            </div>
            <div class="filters-row orders-filters-row">
              <label class="search-field orders-status-filter">
                <span>Filtrar por estado</span>
                <select name="ordenEstado" data-ordenes-status-filter>
                  <option value="">Todos</option>
                  ${renderOptions(ORDEN_ESTADOS, filters.estado)}
                </select>
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
                  <th>Trabajo</th>
                  <th>Estimado</th>
                  <th>Adelanto</th>
                  <th>Saldo</th>
                  <th>Entrega</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${renderOrdenesRows({ ordenes, getClienteName })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `;
};
