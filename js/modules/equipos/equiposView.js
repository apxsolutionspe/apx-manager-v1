import { formatDate } from "../../utils/formatter.js";
import { EQUIPO_ESTADOS_FISICOS, EQUIPO_TIPOS } from "./equiposService.js";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const icons = {
  monitor: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H4V5Z" />
      <path d="M9 21h6M12 16v5" />
    </svg>
  `,
  laptop: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h12v10H6V5Z" />
      <path d="M3 19h18l-2-4H5l-2 4Z" />
    </svg>
  `,
  desktop: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h11v10H4V5Z" />
      <path d="M18 7h2v12h-5v-2h3V7Z" />
      <path d="M8 19h5M10.5 15v4" />
    </svg>
  `,
  printer: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8V4h10v4" />
      <path d="M6 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1" />
      <path d="M7 14h10v6H7v-6Z" />
    </svg>
  `,
  plus: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v11H4V5Z" />
      <path d="M9 21h6M12 16v5M12 8v5M9.5 10.5h5" />
    </svg>
  `,
  user: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 21a7 7 0 0 0-14 0" />
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    </svg>
  `,
  alert: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 4.3 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
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

const renderError = (fieldName, errors) =>
  errors[fieldName] ? `<small class="field-error">${escapeHtml(errors[fieldName])}</small>` : "";

const getDisplayLabel = (value) => String(value ?? "").replace("DaÃ±ado", "Dañado");

const normalizeClassName = (value) =>
  String(getDisplayLabel(value) || "otro")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]).join("");

  return (initials || "CL").toUpperCase();
};

const getEquipmentIcon = (type = "") => {
  const normalizedType = normalizeClassName(type);

  if (normalizedType.includes("laptop") || normalizedType.includes("movil")) return icons.laptop;
  if (normalizedType.includes("desktop") || normalizedType.includes("servidor") || normalizedType.includes("red")) return icons.desktop;
  if (normalizedType.includes("impresora")) return icons.printer;

  return icons.monitor;
};

const renderEquiposSummary = (summary = {}) => `
  <div class="equipment-summary" aria-label="Resumen de equipos">
    <article class="equipment-summary-card equipment-summary-card--primary">
      <span class="equipment-summary-card__icon">${icons.monitor}</span>
      <div>
        <span class="equipment-summary-card__label">Equipos recibidos</span>
        <strong class="equipment-summary-card__value">${Number(summary.total) || 0}</strong>
        <span class="equipment-summary-card__helper">Registros técnicos activos</span>
      </div>
    </article>

    <article class="equipment-summary-card equipment-summary-card--info">
      <span class="equipment-summary-card__icon">${icons.alert}</span>
      <div>
        <span class="equipment-summary-card__label">Equipos pendientes</span>
        <strong class="equipment-summary-card__value">${Number(summary.pending) || 0}</strong>
        <span class="equipment-summary-card__helper">Requieren revisión técnica</span>
      </div>
    </article>

    <article class="equipment-summary-card equipment-summary-card--teal">
      <span class="equipment-summary-card__icon">${icons.check}</span>
      <div>
        <span class="equipment-summary-card__label">Equipos entregados</span>
        <strong class="equipment-summary-card__value">${Number(summary.delivered) || 0}</strong>
        <span class="equipment-summary-card__helper">En buen estado físico</span>
      </div>
    </article>

    <article class="equipment-summary-card equipment-summary-card--dark">
      <span class="equipment-summary-card__icon">${icons.laptop}</span>
      <div>
        <span class="equipment-summary-card__label">Equipos en reparación</span>
        <strong class="equipment-summary-card__value">${Number(summary.repairing) || 0}</strong>
        <span class="equipment-summary-card__helper">Con condición por atender</span>
      </div>
    </article>
  </div>
`;

const renderEquiposRows = ({ equipos, getClienteName }) => {
  if (equipos.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="9">
          <span class="empty-state__icon equipment-empty-icon">${icons.monitor}</span>
          <strong>No hay equipos recibidos registrados.</strong>
          <span>Registra un equipo para iniciar su seguimiento técnico.</span>
        </td>
      </tr>
    `;
  }

  return equipos
    .map((equipo) => {
      const clienteName = getClienteName(equipo.clienteId);

      return `
        <tr>
          <td>${escapeHtml(equipo.id)}</td>
          <td>${formatDate(equipo.fechaRecepcion)}</td>
          <td>
            <div class="equipment-client-cell">
              <span class="equipment-client-avatar" aria-hidden="true">${escapeHtml(getInitials(clienteName))}</span>
              <div>
                <strong>${escapeHtml(clienteName)}</strong>
                <span>${escapeHtml(equipo.clienteId)}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="equipment-type-badge">
              ${getEquipmentIcon(equipo.tipoEquipo)}
              ${escapeHtml(getDisplayLabel(equipo.tipoEquipo))}
            </span>
          </td>
          <td>
            <strong>${escapeHtml(equipo.marca)} ${escapeHtml(equipo.modelo)}</strong>
            <span>Serie: ${escapeHtml(equipo.serie)}</span>
          </td>
          <td>${escapeHtml(equipo.accesorios || "Sin accesorios")}</td>
          <td>
            <span class="equipment-condition-badge equipment-condition-badge--${normalizeClassName(equipo.estadoFisico)}">
              ${escapeHtml(getDisplayLabel(equipo.estadoFisico))}
            </span>
          </td>
          <td>
            <strong class="equipment-problem">${escapeHtml(equipo.problemaReportado)}</strong>
            <span>${escapeHtml(equipo.observaciones || "Sin observaciones")}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost equipment-action equipment-action--edit" type="button" data-equipo-edit="${escapeHtml(equipo.id)}" title="Editar equipo" aria-label="Editar equipo ${escapeHtml(equipo.id)}">
                ${icons.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger equipment-action equipment-action--delete" type="button" data-equipo-delete="${escapeHtml(equipo.id)}" title="Eliminar equipo" aria-label="Eliminar equipo ${escapeHtml(equipo.id)}">
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

export const renderEquiposModule = ({
  equipos,
  summary,
  clientes,
  editingEquipo = null,
  searchTerm = "",
  errors = {},
  getClienteName,
}) => {
  const formTitle = editingEquipo ? "Editar equipo" : "Registrar equipo";
  const submitLabel = editingEquipo ? "Actualizar equipo" : "Registrar equipo";
  const hasClientes = clientes.length > 0;

  return `
    <section class="module-view module-view--equipos" aria-label="Equipos Recibidos">
      ${renderEquiposSummary(summary)}

      <div class="clientes-layout">
        <form class="panel cliente-form equipment-form-card" data-equipos-form>
          <input type="hidden" name="id" value="${escapeHtml(editingEquipo?.id ?? "")}" />

          <div class="panel__header">
            <h3><span class="section-icon equipment-section-icon">${icons.plus}</span>${formTitle}</h3>
            ${
              editingEquipo
                ? '<button class="button button--ghost" type="button" data-equipos-cancel>Cancelar</button>'
                : ""
            }
          </div>

          ${
            hasClientes
              ? '<p class="equipment-info">Registra los datos técnicos del equipo para mantener trazabilidad de recepción, diagnóstico y entrega.</p>'
              : '<p class="dependency-warning">Registra al menos un cliente antes de recibir equipos.</p>'
          }

          <div class="form-grid">
            <label class="field">
              <span>Fecha recepción</span>
              <input name="fechaRecepcion" type="date" value="${escapeHtml(
                editingEquipo?.fechaRecepcion ?? new Date().toISOString().slice(0, 10),
              )}" />
              ${renderError("fechaRecepcion", errors)}
            </label>

            <label class="field">
              <span>Cliente</span>
              <select name="clienteId">
                <option value="">Seleccionar cliente</option>
                ${renderClienteOptions(clientes, editingEquipo?.clienteId)}
              </select>
              ${renderError("clienteId", errors)}
            </label>

            <label class="field">
              <span>Tipo de equipo</span>
              <select name="tipoEquipo">
                ${renderOptions(EQUIPO_TIPOS, editingEquipo?.tipoEquipo ?? EQUIPO_TIPOS[0])}
              </select>
              ${renderError("tipoEquipo", errors)}
            </label>

            <label class="field">
              <span>Estado físico</span>
              <select name="estadoFisico">
                ${renderOptions(EQUIPO_ESTADOS_FISICOS, editingEquipo?.estadoFisico ?? EQUIPO_ESTADOS_FISICOS[0])}
              </select>
              ${renderError("estadoFisico", errors)}
            </label>

            <label class="field">
              <span>Marca</span>
              <input name="marca" type="text" value="${escapeHtml(editingEquipo?.marca ?? "")}" />
              ${renderError("marca", errors)}
            </label>

            <label class="field">
              <span>Modelo</span>
              <input name="modelo" type="text" value="${escapeHtml(editingEquipo?.modelo ?? "")}" />
              ${renderError("modelo", errors)}
            </label>

            <label class="field field--full">
              <span>Serie</span>
              <input name="serie" type="text" value="${escapeHtml(editingEquipo?.serie ?? "")}" />
              ${renderError("serie", errors)}
            </label>

            <label class="field field--full">
              <span>Accesorios</span>
              <input name="accesorios" type="text" value="${escapeHtml(editingEquipo?.accesorios ?? "")}" />
            </label>

            <label class="field field--full">
              <span>Problema reportado</span>
              <textarea name="problemaReportado" rows="3">${escapeHtml(editingEquipo?.problemaReportado ?? "")}</textarea>
              ${renderError("problemaReportado", errors)}
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${escapeHtml(editingEquipo?.observaciones ?? "")}</textarea>
            </label>
          </div>

          <button class="button button--primary equipment-submit" type="submit"${hasClientes ? "" : " disabled"}>
            ${icons.plus}
            <span>${submitLabel}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel equipment-table-card" aria-label="Listado de equipos recibidos">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon equipment-section-icon">${icons.monitor}</span>Listado de equipos</h3>
              <p>${equipos.length} registro${equipos.length === 1 ? "" : "s"}</p>
            </div>
            <label class="search-field equipment-search-field">
              <span>Buscar por cliente o serie</span>
              <input
                name="equipoSearch"
                type="search"
                value="${escapeHtml(searchTerm)}"
                placeholder="Cliente, teléfono, correo, ID o serie"
                data-equipos-search
              />
            </label>
          </div>

          <div class="table-wrapper">
            <table class="data-table data-table--wide">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Recepción</th>
                  <th>Cliente</th>
                  <th>Tipo</th>
                  <th>Equipo</th>
                  <th>Accesorios</th>
                  <th>Estado</th>
                  <th>Problema</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${renderEquiposRows({ equipos, getClienteName })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `;
};
