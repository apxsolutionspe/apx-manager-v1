import { formatDate } from "../../utils/formatter.js";
import { GARANTIA_OPCIONES, SOPORTE_ESTADOS } from "./soporteService.js";

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
  wrench: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.8 2.8-2-2 2.8-2.8Z" />
    </svg>
  `,
  wrenchPlus: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.8 2.8-2-2 2.8-2.8Z" />
      <path d="M19 15v5M16.5 17.5h5" />
    </svg>
  `,
  headset: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2ZM20 13v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" />
      <path d="M15 20h-3a2 2 0 0 1-2-2" />
    </svg>
  `,
  laptop: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h12v10H6V5Z" />
      <path d="M3 19h18l-2-4H5l-2 4Z" />
    </svg>
  `,
  user: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 21a7 7 0 0 0-14 0" />
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </svg>
  `,
  check: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,
  coin: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c4.42 0 8-2.24 8-5V8c0-2.76-3.58-5-8-5S4 5.24 4 8v8c0 2.76 3.58 5 8 5Z" />
      <path d="M20 8c0 2.76-3.58 5-8 5S4 10.76 4 8" />
      <path d="M20 12c0 2.76-3.58 5-8 5s-8-2.24-8-5" />
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

const getDisplayLabel = (value) =>
  String(value ?? "")
    .replace("En reparaciÃ³n", "En reparación")
    .replace("Sin soluciÃ³n", "Sin solución")
    .replace("garantia", "garantía");

const normalizeClassName = (value) =>
  getDisplayLabel(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const renderOptions = (options, selectedValue) =>
  options
    .map(
      (option) => `
        <option value="${escapeHtml(option)}"${option === selectedValue ? " selected" : ""}>
          ${escapeHtml(getDisplayLabel(option))}
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

const renderEquipoOptions = (equipos, selectedEquipoId) =>
  equipos
    .map(
      (equipo) => `
        <option value="${escapeHtml(equipo.id)}"${equipo.id === selectedEquipoId ? " selected" : ""}>
          ${escapeHtml(`${equipo.tipoEquipo} ${equipo.marca} ${equipo.modelo} - ${equipo.serie}`)}
        </option>
      `,
    )
    .join("");

const renderError = (fieldName, errors) =>
  errors[fieldName] ? `<small class="field-error">${escapeHtml(errors[fieldName])}</small>` : "";

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]).join("");

  return (initials || "ST").toUpperCase();
};

const renderSoporteSummary = (summary = {}) => `
  <div class="support-summary" aria-label="Resumen de soporte técnico">
    <article class="support-summary-card support-summary-card--primary">
      <span class="support-summary-card__icon">${icons.headset}</span>
      <div>
        <span class="support-summary-card__label">Casos de soporte</span>
        <strong class="support-summary-card__value">${Number(summary.totalCases) || 0}</strong>
        <span class="support-summary-card__helper">Casos técnicos registrados</span>
      </div>
    </article>

    <article class="support-summary-card support-summary-card--warning">
      <span class="support-summary-card__icon">${icons.wrench}</span>
      <div>
        <span class="support-summary-card__label">En reparación</span>
        <strong class="support-summary-card__value">${Number(summary.repairing) || 0}</strong>
        <span class="support-summary-card__helper">Trabajo técnico activo</span>
      </div>
    </article>

    <article class="support-summary-card support-summary-card--teal">
      <span class="support-summary-card__icon">${icons.check}</span>
      <div>
        <span class="support-summary-card__label">Listos para entrega</span>
        <strong class="support-summary-card__value">${Number(summary.ready) || 0}</strong>
        <span class="support-summary-card__helper">Casos preparados</span>
      </div>
    </article>

    <article class="support-summary-card support-summary-card--dark">
      <span class="support-summary-card__icon">${icons.coin}</span>
      <div>
        <span class="support-summary-card__label">Total servicios técnicos</span>
        <strong class="support-summary-card__value">${formatCurrency(summary.technicalTotal)}</strong>
        <span class="support-summary-card__helper">Servicios y repuestos</span>
      </div>
    </article>
  </div>
`;

const renderSoporteRows = ({ soportes, getClienteName, getEquipoName }) => {
  if (soportes.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="10">
          <span class="empty-state__icon support-empty-icon">${icons.headset}</span>
          <strong>No hay casos de soporte técnico registrados.</strong>
          <span>Crea un caso para documentar diagnóstico, solución y costos.</span>
        </td>
      </tr>
    `;
  }

  return soportes
    .map((soporte) => {
      const clienteName = getClienteName(soporte.clienteId);

      return `
        <tr>
          <td>${escapeHtml(soporte.id)}</td>
          <td>${formatDate(soporte.fecha)}</td>
          <td>
            <div class="support-client-cell">
              <span class="support-client-avatar" aria-hidden="true">${escapeHtml(getInitials(clienteName))}</span>
              <div>
                <strong>${escapeHtml(clienteName)}</strong>
                <span class="support-equipment-line">${icons.laptop}${escapeHtml(getEquipoName(soporte.equipoId))}</span>
              </div>
            </div>
          </td>
          <td>
            <strong class="support-diagnosis">${escapeHtml(soporte.diagnostico)}</strong>
            <span>${escapeHtml(soporte.tecnicoResponsable || "Sin técnico")}</span>
          </td>
          <td>${escapeHtml(soporte.solucionAplicada || "Pendiente")}</td>
          <td><strong class="support-service-cost">${formatCurrency(soporte.costoServicio)}</strong></td>
          <td><span class="support-parts-cost">${formatCurrency(soporte.costoRepuestos)}</span></td>
          <td><strong class="support-total">${formatCurrency(soporte.total)}</strong></td>
          <td>
            <span class="support-status-badge support-status-badge--${normalizeClassName(soporte.estado)}">${escapeHtml(getDisplayLabel(soporte.estado))}</span>
            <span class="support-warranty-badge">${escapeHtml(getDisplayLabel(soporte.garantia))}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost support-action support-action--edit" type="button" data-soporte-edit="${escapeHtml(soporte.id)}" title="Editar soporte" aria-label="Editar soporte ${escapeHtml(soporte.id)}">
                ${icons.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger support-action support-action--delete" type="button" data-soporte-delete="${escapeHtml(soporte.id)}" title="Eliminar soporte" aria-label="Eliminar soporte ${escapeHtml(soporte.id)}">
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

export const renderSoporteModule = ({
  soportes,
  summary,
  clientes,
  equipos,
  editingSoporte = null,
  errors = {},
  getClienteName,
  getEquipoName,
}) => {
  const formTitle = editingSoporte ? "Editar soporte" : "Nuevo soporte";
  const submitLabel = editingSoporte ? "Actualizar soporte" : "Registrar soporte";
  const hasDependencies = clientes.length > 0 && equipos.length > 0;

  return `
    <section class="module-view module-view--soporte" aria-label="Soporte Técnico">
      ${renderSoporteSummary(summary)}

      <div class="clientes-layout">
        <form class="panel cliente-form support-form-card" data-soporte-form>
          <input type="hidden" name="id" value="${escapeHtml(editingSoporte?.id ?? "")}" />

          <div class="panel__header">
            <h3><span class="section-icon support-section-icon">${icons.wrenchPlus}</span>${formTitle}</h3>
            ${
              editingSoporte
                ? '<button class="button button--ghost" type="button" data-soporte-cancel>Cancelar</button>'
                : ""
            }
          </div>

          ${
            hasDependencies
              ? '<p class="support-info">Documenta diagnóstico, solución, repuestos y costos para mantener trazabilidad técnica completa.</p>'
              : '<p class="dependency-warning">Registra al menos un cliente y un equipo recibido antes de crear soporte.</p>'
          }

          <div class="form-grid">
            <label class="field">
              <span>Fecha</span>
              <input name="fecha" type="date" value="${escapeHtml(
                editingSoporte?.fecha ?? new Date().toISOString().slice(0, 10),
              )}" />
              ${renderError("fecha", errors)}
            </label>

            <label class="field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Seleccionar cliente</option>
                ${renderClienteOptions(clientes, editingSoporte?.clienteId)}
              </select>
              ${renderError("clienteId", errors)}
            </label>

            <label class="field field--full">
              <span>Equipo</span>
              <select name="equipoId">
                <option value="">Seleccionar equipo</option>
                ${renderEquipoOptions(equipos, editingSoporte?.equipoId)}
              </select>
              ${renderError("equipoId", errors)}
            </label>

            <label class="field field--full">
              <span>Diagnóstico</span>
              <textarea name="diagnostico" rows="3">${escapeHtml(editingSoporte?.diagnostico ?? "")}</textarea>
              ${renderError("diagnostico", errors)}
            </label>

            <label class="field field--full">
              <span>Solución aplicada</span>
              <textarea name="solucionAplicada" rows="3">${escapeHtml(editingSoporte?.solucionAplicada ?? "")}</textarea>
            </label>

            <label class="field">
              <span>Costo servicio</span>
              <input name="costoServicio" type="number" min="0" step="0.01" value="${escapeHtml(editingSoporte?.costoServicio ?? 0)}" />
              ${renderError("costoServicio", errors)}
            </label>

            <label class="field">
              <span>Costo repuestos</span>
              <input name="costoRepuestos" type="number" min="0" step="0.01" value="${escapeHtml(editingSoporte?.costoRepuestos ?? 0)}" />
              ${renderError("costoRepuestos", errors)}
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="estado">
                ${renderOptions(SOPORTE_ESTADOS, editingSoporte?.estado ?? SOPORTE_ESTADOS[0])}
              </select>
              ${renderError("estado", errors)}
            </label>

            <label class="field">
              <span>Garantía</span>
              <select name="garantia">
                ${renderOptions(GARANTIA_OPCIONES, editingSoporte?.garantia ?? GARANTIA_OPCIONES[0])}
              </select>
              ${renderError("garantia", errors)}
            </label>

            <label class="field field--full">
              <span>Técnico responsable</span>
              <input name="tecnicoResponsable" type="text" value="${escapeHtml(editingSoporte?.tecnicoResponsable ?? "")}" />
              ${renderError("tecnicoResponsable", errors)}
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${escapeHtml(editingSoporte?.observaciones ?? "")}</textarea>
            </label>
          </div>

          <button class="button button--primary support-submit" type="submit"${hasDependencies ? "" : " disabled"}>
            ${icons.wrenchPlus}
            <span>${submitLabel}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel support-table-card" aria-label="Listado de soporte técnico">
          <div class="panel__header">
            <div>
              <h3><span class="section-icon support-section-icon">${icons.headset}</span>Listado de soporte</h3>
              <p>${soportes.length} registro${soportes.length === 1 ? "" : "s"}</p>
            </div>
          </div>

          <div class="table-wrapper">
            <table class="data-table data-table--wide">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente / Equipo</th>
                  <th>Diagnóstico</th>
                  <th>Solución</th>
                  <th>Servicio</th>
                  <th>Repuestos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${renderSoporteRows({ soportes, getClienteName, getEquipoName })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `;
};
