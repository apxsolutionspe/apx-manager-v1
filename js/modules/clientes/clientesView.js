import { formatDate } from "../../utils/formatter.js";
import { CLIENTE_ESTADOS, CLIENTE_TIPOS } from "./clientesService.js";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const icons = {
  users: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 19a4 4 0 0 0-8 0" />
      <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M21 19a3.5 3.5 0 0 0-4-3.45" />
      <path d="M17 4.2a2.8 2.8 0 0 1 0 5.6" />
      <path d="M3 19a3.5 3.5 0 0 1 4-3.45" />
      <path d="M7 4.2a2.8 2.8 0 0 0 0 5.6" />
    </svg>
  `,
  userPlus: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 19a5 5 0 0 0-10 0" />
      <path d="M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M19 8v6M16 11h6" />
    </svg>
  `,
  check: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,
  building: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
      <path d="M9 21v-4h3v4M8 7h1M12 7h1M8 11h1M12 11h1M19 21V11h-2" />
    </svg>
  `,
  person: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 21a7 7 0 0 0-14 0" />
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
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

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]).join("");

  return (initials || "CL").toUpperCase();
};

const getStatusClass = (status) =>
  status === "Activo" ? "customer-status-badge--active" : "customer-status-badge--inactive";

const getTypeClass = (type) =>
  type === "Empresa"
    ? "customer-type-badge--company"
    : type === "Persona"
      ? "customer-type-badge--person"
      : "customer-type-badge--other";

const renderClientesSummary = (summary = {}) => `
  <div class="customers-summary" aria-label="Resumen de clientes">
    <article class="customers-summary-card customers-summary-card--primary">
      <span class="customers-summary-card__icon">${icons.users}</span>
      <div>
        <span class="customers-summary-card__label">Total de clientes</span>
        <strong class="customers-summary-card__value">${Number(summary.total) || 0}</strong>
        <span class="customers-summary-card__helper">Base comercial registrada</span>
      </div>
    </article>

    <article class="customers-summary-card customers-summary-card--success">
      <span class="customers-summary-card__icon">${icons.check}</span>
      <div>
        <span class="customers-summary-card__label">Clientes activos</span>
        <strong class="customers-summary-card__value">${Number(summary.active) || 0}</strong>
        <span class="customers-summary-card__helper">Listos para seguimiento</span>
      </div>
    </article>

    <article class="customers-summary-card customers-summary-card--purple">
      <span class="customers-summary-card__icon">${icons.building}</span>
      <div>
        <span class="customers-summary-card__label">Clientes empresa</span>
        <strong class="customers-summary-card__value">${Number(summary.companies) || 0}</strong>
        <span class="customers-summary-card__helper">Cuentas corporativas</span>
      </div>
    </article>

    <article class="customers-summary-card customers-summary-card--info">
      <span class="customers-summary-card__icon">${icons.person}</span>
      <div>
        <span class="customers-summary-card__label">Clientes persona</span>
        <strong class="customers-summary-card__value">${Number(summary.people) || 0}</strong>
        <span class="customers-summary-card__helper">Contactos individuales</span>
      </div>
    </article>
  </div>
`;

const renderClientesRows = (clientes) => {
  if (clientes.length === 0) {
    return `
      <tr>
        <td class="empty-state" colspan="8">
          <span class="empty-state__icon customers-empty-icon">${icons.users}</span>
          <strong>No hay clientes registrados.</strong>
          <span>Agrega tu primer cliente para comenzar a construir tu historial comercial.</span>
        </td>
      </tr>
    `;
  }

  return clientes
    .map(
      (cliente) => `
        <tr>
          <td>${escapeHtml(cliente.id)}</td>
          <td>
            <div class="customer-cell">
              <span class="customer-avatar" aria-hidden="true">${escapeHtml(getInitials(cliente.nombre))}</span>
              <div>
                <strong>${escapeHtml(cliente.nombre)}</strong>
                <span>${escapeHtml(cliente.direccion || "Sin dirección")}</span>
              </div>
            </div>
          </td>
          <td>${escapeHtml(cliente.telefono)}</td>
          <td>${escapeHtml(cliente.correo || "Sin correo")}</td>
          <td>
            <span class="customer-type-badge ${getTypeClass(cliente.tipoCliente)}">
              ${escapeHtml(cliente.tipoCliente)}
            </span>
          </td>
          <td>${formatDate(cliente.fechaRegistro)}</td>
          <td>
            <span class="customer-status-badge ${getStatusClass(cliente.estado)}">
              ${escapeHtml(cliente.estado)}
            </span>
          </td>
          <td>
            <div class="table-actions">
              <button class="button button--ghost customers-action customers-action--edit" type="button" data-cliente-edit="${escapeHtml(cliente.id)}" title="Editar cliente" aria-label="Editar cliente ${escapeHtml(cliente.id)}">
                ${icons.edit}
                <span>Editar</span>
              </button>
              <button class="button button--danger customers-action customers-action--delete" type="button" data-cliente-delete="${escapeHtml(cliente.id)}" title="Eliminar cliente" aria-label="Eliminar cliente ${escapeHtml(cliente.id)}">
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

export const renderClientesModule = ({ clientes, summary, editingCliente = null, searchTerm = "", errors = {} }) => {
  const formTitle = editingCliente ? "Editar cliente" : "Nuevo cliente";
  const submitLabel = editingCliente ? "Actualizar cliente" : "Crear cliente";

  return `
    <section class="module-view module-view--clientes" aria-label="Clientes">
      ${renderClientesSummary(summary)}

      <div class="clientes-layout">
        <form class="panel cliente-form customers-form-card" data-clientes-form>
          <input type="hidden" name="id" value="${escapeHtml(editingCliente?.id ?? "")}" />

          <div class="panel__header">
            <h3><span class="section-icon customers-section-icon">${icons.userPlus}</span>${formTitle}</h3>
            ${
              editingCliente
                ? '<button class="button button--ghost" type="button" data-clientes-cancel>Cancelar</button>'
                : ""
            }
          </div>

          <div class="form-grid">
            <label class="field">
              <span>Nombre</span>
              <input name="nombre" type="text" value="${escapeHtml(editingCliente?.nombre ?? "")}" autocomplete="name" />
              ${renderError("nombre", errors)}
            </label>

            <label class="field">
              <span>Teléfono</span>
              <input name="telefono" type="tel" value="${escapeHtml(editingCliente?.telefono ?? "")}" autocomplete="tel" />
              ${renderError("telefono", errors)}
            </label>

            <label class="field">
              <span>Correo</span>
              <input name="correo" type="email" value="${escapeHtml(editingCliente?.correo ?? "")}" autocomplete="email" />
              ${renderError("correo", errors)}
            </label>

            <label class="field">
              <span>Fecha de registro</span>
              <input name="fechaRegistro" type="date" value="${escapeHtml(
                editingCliente?.fechaRegistro ?? new Date().toISOString().slice(0, 10),
              )}" />
            </label>

            <label class="field">
              <span>Tipo de cliente</span>
              <select name="tipoCliente">
                ${renderOptions(CLIENTE_TIPOS, editingCliente?.tipoCliente ?? CLIENTE_TIPOS[0])}
              </select>
              ${renderError("tipoCliente", errors)}
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="estado">
                ${renderOptions(CLIENTE_ESTADOS, editingCliente?.estado ?? CLIENTE_ESTADOS[0])}
              </select>
              ${renderError("estado", errors)}
            </label>

            <label class="field field--full">
              <span>Dirección</span>
              <input name="direccion" type="text" value="${escapeHtml(editingCliente?.direccion ?? "")}" autocomplete="street-address" />
            </label>

            <label class="field field--full">
              <span>Observaciones</span>
              <textarea name="observaciones" rows="3">${escapeHtml(editingCliente?.observaciones ?? "")}</textarea>
            </label>
          </div>

          <button class="button button--primary customers-submit" type="submit">
            ${icons.userPlus}
            <span>${submitLabel}</span>
          </button>
        </form>

        <section class="panel clientes-table-panel customers-table-card" aria-label="Listado de clientes">
          <div class="panel__header panel__header--stack">
            <div>
              <h3><span class="section-icon customers-section-icon">${icons.users}</span>Listado de clientes</h3>
              <p>${clientes.length} registro${clientes.length === 1 ? "" : "s"}</p>
            </div>
            <label class="search-field customers-search-field">
              <span>Buscar cliente</span>
              <input
                name="clienteSearch"
                type="search"
                value="${escapeHtml(searchTerm)}"
                placeholder="Nombre, teléfono, correo o estado"
                data-clientes-search
              />
            </label>
          </div>

          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                  <th>Registro</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${renderClientesRows(clientes)}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  `;
};
