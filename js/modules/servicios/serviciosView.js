import { SERVICIO_CATEGORIAS, SERVICIO_ESTADOS } from "./serviciosService.js";

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
  tag: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5V5h7.5L20 13.5 13.5 20 4 12.5Z" />
      <path d="M8.5 8.5h.01" />
    </svg>
  `,
  tools: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m14 7 3-3 3 3-3 3-3-3Z" />
      <path d="M5 19 15.5 8.5" />
      <path d="m4 14 6 6" />
      <path d="M7 11 3 7l4-4 4 4" />
    </svg>
  `,
  plusTag: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5V5h7.5L20 13.5 13.5 20 4 12.5Z" />
      <path d="M8 9h5M10.5 6.5v5" />
    </svg>
  `,
  coin: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.42 0 8-2.24 8-5V8c0-2.76-3.58-5-8-5S4 5.24 4 8v8c0 2.76 3.58 5 8 5Z" />
      <path d="M20 8c0 2.76-3.58 5-8 5S4 10.76 4 8" />
      <path d="M20 12c0 2.76-3.58 5-8 5s-8-2.24-8-5" />
    </svg>
  `,
  chart: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19h16" />
      <path d="m6 15 4-4 3 3 5-7" />
      <path d="M15 7h3v3" />
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

const renderError = (fieldName, errors) =>
  errors[fieldName] ? `<small class="field-error">${escapeHtml(errors[fieldName])}</small>` : "";

const getInitial = (name = "") => (name.trim()[0] || "S").toUpperCase();

const getStatusClass = (status) =>
  status === "Activo" ? "service-status-badge--active" : "service-status-badge--inactive";

const getProfitClass = (value) =>
  Number(value) >= 0 ? "service-profit--positive" : "service-profit--negative";

const getCategoryBadgeClass = (category) =>
  `service-category-badge--${String(category ?? "otro")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const renderServiciosSummary = (summary = {}) => `
  <div class="services-summary" aria-label="Resumen de servicios">
    <article class="services-summary-card services-summary-card--primary">
      <span class="services-summary-card__icon">${icons.tag}</span>
      <div>
        <span class="services-summary-card__label">Total de servicios</span>
        <strong class="services-summary-card__value">${Number(summary.total) || 0}</strong>
        <span class="services-summary-card__helper">Catálogo operativo actual</span>
      </div>
    </article>

    <article class="services-summary-card services-summary-card--info">
      <span class="services-summary-card__icon">${icons.check}</span>
      <div>
        <span class="services-summary-card__label">Servicios activos</span>
        <strong class="services-summary-card__value">${Number(summary.active) || 0}</strong>
        <span class="services-summary-card__helper">Disponibles para venta</span>
      </div>
    </article>

    <article class="services-summary-card services-summary-card--dark">
      <span class="services-summary-card__icon">${icons.coin}</span>
      <div>
        <span class="services-summary-card__label">Precio promedio</span>
        <strong class="services-summary-card__value">${formatCurrency(summary.averagePrice)}</strong>
        <span class="services-summary-card__helper">Promedio del catálogo</span>
      </div>
    </article>

    <article class="services-summary-card services-summary-card--teal">
      <span class="services-summary-card__icon">${icons.chart}</span>
      <div>
        <span class="services-summary-card__label">Ganancia estimada</span>
        <strong class="services-summary-card__value">${formatCurrency(summary.estimatedProfit)}</strong>
        <span class="services-summary-card__helper">Precio base menos costo</span>
      </div>
    </article>
  </div>
`;

const renderServiciosRows = (servicios) => {
  if (servicios.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="8">
          <span class="empty-state__icon services-empty-icon">${icons.tools}</span>
          <strong>No hay servicios registrados.</strong>
          <span>Agrega tu primer servicio para construir tu catálogo comercial.</span>
        </td>
      </tr>
    `;
  }

  return servicios
    .map(
      (servicio) => `
        <tr>
          <td>${escapeHtml(servicio.id)}</td>
          <td>
            <div class="service-cell">
              <span class="service-avatar" aria-hidden="true">${escapeHtml(getInitial(servicio.nombreServicio))}</span>
              <div>
                <strong>${escapeHtml(servicio.nombreServicio)}</strong>
                <span>${escapeHtml(servicio.descripcion || "Sin descripción")}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="service-category-badge ${getCategoryBadgeClass(servicio.categoria)}">
              ${escapeHtml(servicio.categoria)}
            </span>
          </td>
          <td><strong class="service-price">${formatCurrency(servicio.precioBase)}</strong></td>
          <td><span class="service-cost">${formatCurrency(servicio.costoEstimado)}</span></td>
          <td><strong class="service-profit ${getProfitClass(servicio.gananciaEstimada)}">${formatCurrency(servicio.gananciaEstimada)}</strong></td>
          <td>
            <span class="service-status-badge ${getStatusClass(servicio.estado)}">
              ${escapeHtml(servicio.estado)}
            </span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost services-action services-action--edit" type="button" data-servicio-edit="${escapeHtml(servicio.id)}" title="Editar servicio" aria-label="Editar servicio ${escapeHtml(servicio.id)}">
                ${icons.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger services-action services-action--delete" type="button" data-servicio-delete="${escapeHtml(servicio.id)}" title="Eliminar servicio" aria-label="Eliminar servicio ${escapeHtml(servicio.id)}">
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

export const renderServiciosModule = ({ servicios, summary, editingServicio = null, searchTerm = "", errors = {} }) => {
  const formTitle = editingServicio ? "Editar servicio" : "Nuevo servicio";
  const submitLabel = editingServicio ? "Actualizar servicio" : "Crear servicio";

  return `
    <section class="module-view module-view--servicios" aria-label="Servicios">
      ${renderServiciosSummary(summary)}

      <div class="clientes-layout">
        <form class="panel cliente-form services-form-card" data-servicios-form>
          <input type="hidden" name="id" value="${escapeHtml(editingServicio?.id ?? "")}" />

          <div class="panel__header">
            <h3><span class="section-icon services-section-icon">${icons.plusTag}</span>${formTitle}</h3>
            ${
              editingServicio
                ? '<button class="button button--ghost" type="button" data-servicios-cancel>Cancelar</button>'
                : ""
            }
          </div>

          <div class="form-grid">
            <label class="field field--full">
              <span>Nombre del servicio</span>
              <input name="nombreServicio" type="text" value="${escapeHtml(editingServicio?.nombreServicio ?? "")}" />
              ${renderError("nombreServicio", errors)}
            </label>

            <label class="field">
              <span>Categoría</span>
              <select name="categoria">
                ${renderOptions(SERVICIO_CATEGORIAS, editingServicio?.categoria ?? SERVICIO_CATEGORIAS[0])}
              </select>
              ${renderError("categoria", errors)}
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="estado">
                ${renderOptions(SERVICIO_ESTADOS, editingServicio?.estado ?? SERVICIO_ESTADOS[0])}
              </select>
              ${renderError("estado", errors)}
            </label>

            <label class="field">
              <span>Precio base</span>
              <input name="precioBase" type="number" min="0" step="0.01" value="${escapeHtml(editingServicio?.precioBase ?? 0)}" />
              ${renderError("precioBase", errors)}
            </label>

            <label class="field">
              <span>Costo estimado</span>
              <input name="costoEstimado" type="number" min="0" step="0.01" value="${escapeHtml(editingServicio?.costoEstimado ?? 0)}" />
              ${renderError("costoEstimado", errors)}
            </label>

            <label class="field field--full">
              <span>Descripción</span>
              <textarea name="descripcion" rows="4">${escapeHtml(editingServicio?.descripcion ?? "")}</textarea>
            </label>
          </div>

          <button class="button button--primary services-submit" type="submit">
            ${icons.plusTag}
            <span>${submitLabel}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel services-table-card" aria-label="Listado de servicios">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon services-section-icon">${icons.tools}</span>Listado de servicios</h3>
              <p>${servicios.length} registro${servicios.length === 1 ? "" : "s"}</p>
            </div>
            <label class="search-field services-search-field">
              <span>Buscar servicio</span>
              <input
                name="servicioSearch"
                type="search"
                value="${escapeHtml(searchTerm)}"
                placeholder="Nombre, categoría, descripción o estado"
                data-servicios-search
              />
            </label>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Servicio</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Costo</th>
                  <th>Ganancia</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${renderServiciosRows(servicios)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `;
};
