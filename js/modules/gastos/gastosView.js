import { formatDate } from "../../utils/formatter.js";
import { GASTO_CATEGORIAS, GASTO_METODOS_PAGO } from "./gastosService.js";

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
  wallet: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v2.25h-4.25a3.25 3.25 0 0 0 0 6.5H20V17a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="M15.75 10.75H21v3.5h-5.25a1.75 1.75 0 1 1 0-3.5Z" />
    </svg>
  `,
  receipt: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h10a2 2 0 0 1 2 2v16l-3-1.5-2 1.5-2-1.5-2 1.5-2-1.5L5 21V5a2 2 0 0 1 2-2Z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  `,
  tag: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5V5h7.5L20 13.5 13.5 20 4 12.5Z" />
      <path d="M8.5 8.5h.01" />
    </svg>
  `,
  calendar: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 8h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
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

const renderError = (fieldName, errors) =>
  errors[fieldName] ? `<small class="field-error">${escapeHtml(errors[fieldName])}</small>` : "";

const getCategoryBadgeClass = (category) =>
  `expense-category-badge--${String(category ?? "otros")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const renderGastosSummary = (summary = {}) => `
  <div class="expenses-summary" aria-label="Resumen de gastos">
    <article class="expenses-summary-card expenses-summary-card--danger">
      <span class="expenses-summary-card__icon">${icons.wallet}</span>
      <div>
        <span class="expenses-summary-card__label">Gastos del día</span>
        <strong class="expenses-summary-card__value">${formatCurrency(summary.gastosDia)}</strong>
        <span class="expenses-summary-card__helper">Egresos registrados hoy</span>
      </div>
    </article>

    <article class="expenses-summary-card expenses-summary-card--warning">
      <span class="expenses-summary-card__icon">${icons.calendar}</span>
      <div>
        <span class="expenses-summary-card__label">Gastos del mes</span>
        <strong class="expenses-summary-card__value">${formatCurrency(summary.gastosMes)}</strong>
        <span class="expenses-summary-card__helper">Total acumulado mensual</span>
      </div>
    </article>

    <article class="expenses-summary-card expenses-summary-card--purple">
      <span class="expenses-summary-card__icon">${icons.tag}</span>
      <div>
        <span class="expenses-summary-card__label">Categoría más usada</span>
        <strong class="expenses-summary-card__value">${escapeHtml(summary.categoriaMasUsada ?? "Sin datos")}</strong>
        <span class="expenses-summary-card__helper">Según registros actuales</span>
      </div>
    </article>

    <article class="expenses-summary-card expenses-summary-card--info">
      <span class="expenses-summary-card__icon">${icons.receipt}</span>
      <div>
        <span class="expenses-summary-card__label">Último gasto registrado</span>
        <strong class="expenses-summary-card__value">${formatCurrency(summary.ultimoGasto)}</strong>
        <span class="expenses-summary-card__helper">Registro más reciente</span>
      </div>
    </article>
  </div>
`;

const renderGastosRows = (gastos) => {
  if (gastos.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="8">
          <span class="empty-state__icon expenses-empty-icon">${icons.receipt}</span>
          <strong>No hay gastos registrados.</strong>
          <span>Agrega tu primer gasto para controlar mejor tus egresos.</span>
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
            <span>${escapeHtml(gasto.observaciones || "Sin observaciones")}</span>
          </td>
          <td>
            <span class="expense-category-badge ${getCategoryBadgeClass(gasto.categoria)}">
              ${escapeHtml(gasto.categoria)}
            </span>
          </td>
          <td><strong class="expense-amount">${formatCurrency(gasto.monto)}</strong></td>
          <td><span class="expense-payment-badge">${escapeHtml(gasto.metodoPago)}</span></td>
          <td>${escapeHtml(gasto.comprobante || "Sin comprobante")}</td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost expenses-action expenses-action--edit" type="button" data-gasto-edit="${escapeHtml(gasto.id)}" title="Editar gasto" aria-label="Editar gasto ${escapeHtml(gasto.id)}">
                ${icons.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger expenses-action expenses-action--delete" type="button" data-gasto-delete="${escapeHtml(gasto.id)}" title="Eliminar gasto" aria-label="Eliminar gasto ${escapeHtml(gasto.id)}">
                ${icons.trash}
                <span>Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
};

export const renderGastosModule = ({ gastos, summary, editingGasto = null, filters, errors = {} }) => {
  const formTitle = editingGasto ? "Editar gasto" : "Registrar gasto";
  const submitLabel = editingGasto ? "Actualizar gasto" : "Registrar gasto";

  return `
    <section class="module-view module-view--gastos" aria-label="Gastos">
      ${renderGastosSummary(summary)}

      <div class="clientes-layout">
        <form class="panel cliente-form expenses-form-card" data-gastos-form>
          <input type="hidden" name="id" value="${escapeHtml(editingGasto?.id ?? "")}" />

          <div class="panel__header">
            <h3><span class="section-icon expenses-section-icon">${icons.wallet}</span>${formTitle}</h3>
            ${
              editingGasto
                ? '<button class="button button--ghost" type="button" data-gastos-cancel>Cancelar</button>'
                : ""
            }
          </div>

          <div class="form-grid">
            <label class="field">
              <span>Fecha</span>
              <input name="fecha" type="date" value="${escapeHtml(
                editingGasto?.fecha ?? new Date().toISOString().slice(0, 10),
              )}" />
              ${renderError("fecha", errors)}
            </label>

            <label class="field">
              <span>Categoría</span>
              <select name="categoria">
                ${renderOptions(GASTO_CATEGORIAS, editingGasto?.categoria ?? GASTO_CATEGORIAS[0])}
              </select>
              ${renderError("categoria", errors)}
            </label>

            <label class="field field--full">
              <span>Concepto</span>
              <input name="concepto" type="text" value="${escapeHtml(editingGasto?.concepto ?? "")}" />
              ${renderError("concepto", errors)}
            </label>

            <label class="field">
              <span>Monto</span>
              <input name="monto" type="number" min="0" step="0.01" value="${escapeHtml(editingGasto?.monto ?? 0)}" />
              ${renderError("monto", errors)}
            </label>

            <label class="field">
              <span>Método de pago</span>
              <select name="metodoPago">
                ${renderOptions(GASTO_METODOS_PAGO, editingGasto?.metodoPago ?? GASTO_METODOS_PAGO[0])}
              </select>
              ${renderError("metodoPago", errors)}
            </label>

            <label class="field field--full">
              <span>Comprobante</span>
              <input name="comprobante" type="text" value="${escapeHtml(editingGasto?.comprobante ?? "")}" placeholder="Factura, boleta, recibo o referencia" />
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${escapeHtml(editingGasto?.observaciones ?? "")}</textarea>
            </label>
          </div>

          <button class="button button--primary expenses-submit" type="submit">
            ${icons.receipt}
            <span>${submitLabel}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel expenses-table-card" aria-label="Listado de gastos">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon expenses-section-icon">${icons.receipt}</span>Listado de gastos</h3>
              <p>${gastos.length} registro${gastos.length === 1 ? "" : "s"}</p>
            </div>
            <div class="filters-row">
              <label class="search-field">
                <span>Filtrar por fecha</span>
                <input name="gastoFecha" type="date" value="${escapeHtml(filters.fecha)}" data-gastos-date-filter />
              </label>
              <label class="search-field">
                <span>Filtrar por categoría</span>
                <select name="gastoCategoria" data-gastos-category-filter>
                  <option value="">Todas</option>
                  ${renderOptions(GASTO_CATEGORIAS, filters.categoria)}
                </select>
              </label>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Concepto</th>
                  <th>Categoria</th>
                  <th>Monto</th>
                  <th>Pago</th>
                  <th>Comprobante</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${renderGastosRows(gastos)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `;
};
