import { APP_SETTINGS } from "../config/settings.js";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getSessionName = (session) =>
  session?.mode === "demo"
    ? "Visitante APX"
    : session?.email === "admin@apx.com"
      ? "Admin APX"
      : (session?.name ?? "Usuario APX");

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "AP";

const renderThemeIcon = (theme) =>
  theme === "dark"
    ? `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      </svg>
    `
    : `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
      </svg>
    `;

const notificationIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
    <path d="M10 21h4" />
  </svg>
`;

const renderNotificationItems = (notifications) => {
  if (!notifications?.items?.length) {
    return `
      <div class="notifications-empty">
        <strong>No hay notificaciones pendientes.</strong>
      </div>
    `;
  }

  return notifications.items
    .map(
      (item) => `
        <article class="notification-item notification-item--${escapeHtml(item.tone)}">
          <span class="notification-item__indicator">${escapeHtml(item.count)}</span>
          <div>
            <strong>${escapeHtml(item.label)}</strong>
            <span>${escapeHtml(item.detail)}</span>
          </div>
        </article>
      `,
    )
    .join("");
};

export const renderHeader = ({
  isSidebarOpen = false,
  session = null,
  isUserMenuOpen = false,
  isNotificationsOpen = false,
  theme = "light",
  notifications = { total: 0, items: [] },
} = {}) => `
  <header class="app-header">
    <button
      class="sidebar-toggle"
      type="button"
      data-sidebar-toggle
      aria-label="${isSidebarOpen ? "Cerrar menu" : "Abrir menu"}"
      aria-expanded="${isSidebarOpen ? "true" : "false"}"
    >
      <span aria-hidden="true">&#9776;</span>
    </button>

    <div class="app-brand" aria-label="${APP_SETTINGS.name}">
      <span class="app-brand__logo">APX</span>
      <div class="app-brand__text">
        <p class="app-brand__name">${APP_SETTINGS.name}</p>
        <p class="app-brand__company">${APP_SETTINGS.company}</p>
      </div>
    </div>

    ${session?.mode === "demo" ? '<span class="demo-mode-badge">Modo demo</span>' : ""}

    <div class="app-header__actions">
      ${
        session
          ? `
            <div class="notifications-menu${isNotificationsOpen ? " notifications-menu--open" : ""}">
              <button
                class="notifications-menu__button"
                type="button"
                data-notifications-toggle
                aria-label="Abrir notificaciones"
                aria-expanded="${isNotificationsOpen ? "true" : "false"}"
              >
                ${notificationIcon}
                ${notifications.total > 0 ? `<span class="notifications-menu__badge">${escapeHtml(notifications.total)}</span>` : ""}
              </button>

              <div class="notifications-menu__dropdown" role="menu" aria-label="Notificaciones del sistema">
                <div class="notifications-menu__header">
                  <strong>Notificaciones</strong>
                  <span>${escapeHtml(notifications.total)} alerta${notifications.total === 1 ? "" : "s"}</span>
                </div>
                <div class="notifications-menu__list">
                  ${renderNotificationItems(notifications)}
                </div>
              </div>
            </div>

            <button
              class="theme-toggle"
              type="button"
              data-theme-toggle
              aria-label="${theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}"
              title="${theme === "dark" ? "Modo claro" : "Modo oscuro"}"
            >
              ${renderThemeIcon(theme)}
            </button>

            <div class="user-menu${isUserMenuOpen ? " user-menu--open" : ""}">
              <button
                class="user-menu__avatar"
                type="button"
                data-user-menu-toggle
                aria-label="Abrir menu de usuario"
                aria-expanded="${isUserMenuOpen ? "true" : "false"}"
              >
                ${escapeHtml(getInitials(getSessionName(session)))}
              </button>

              <div class="user-menu__dropdown" role="menu" aria-label="Menu de usuario">
                <div class="user-menu__details">
                  <p><span>Usuario</span><strong>${escapeHtml(getSessionName(session))}</strong></p>
                  <p><span>Correo</span><strong>${escapeHtml(session.email)}</strong></p>
                  <p><span>Rol</span><strong>${escapeHtml(session.role ?? "Administrador")}</strong></p>
                  ${session.mode === "demo" ? "<p><span>Modo</span><strong>Solo lectura</strong></p>" : ""}
                </div>
                <div class="user-menu__dev-tools" aria-label="Herramientas de desarrollo">
                  <span>Datos demo</span>
                  <button type="button" data-seed-load>Cargar datos demo</button>
                  <button type="button" data-seed-clear>Limpiar datos demo</button>
                </div>
                <button class="user-menu__logout" type="button" data-auth-logout role="menuitem">
                  Cerrar sesión
                </button>
              </div>
            </div>
          `
          : ""
      }
    </div>
  </header>
`;
