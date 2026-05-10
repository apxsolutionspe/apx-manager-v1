import { renderHeader } from "./components/header.js";
import { renderSidebar } from "./components/sidebar.js";
import {
  getCurrentSession,
  initializeAuthUsers,
  login,
  logout,
  registerUser,
  requestPasswordReset,
  resetPassword,
  startDemoSession,
} from "./modules/auth/authService.js";
import { renderAuth } from "./modules/auth/auth.ui.js";
import { getSystemNotifications } from "./modules/notifications/notificationsService.js";
import { mountClientes, renderClientes } from "./modules/clientes/index.js";
import { renderDashboard } from "./modules/dashboard/index.js";
import { mountEquipos, renderEquipos } from "./modules/equipos/index.js";
import { mountGastos, renderGastos } from "./modules/gastos/index.js";
import { mountOrdenes, renderOrdenes } from "./modules/ordenes/index.js";
import { mountReportes, renderReportes } from "./modules/reportes/index.js";
import { mountServicios, renderServicios } from "./modules/servicios/index.js";
import { mountSoporte, renderSoporte } from "./modules/soporte/index.js";
import { mountVentas, renderVentas } from "./modules/ventas/index.js";
import { DEFAULT_MODULE_KEY, MODULES } from "./utils/constants.js";
import { formatAppVersion } from "./utils/formatter.js";
import { createInitialState, getStorageItem, setStorageItem } from "./storage/localStorage.js";
import { clearDemoData, loadDemoData } from "./storage/seedData.js";
import { APP_SETTINGS } from "./config/settings.js";

const appRoot = document.querySelector("#app");
let activeModuleKey = DEFAULT_MODULE_KEY;
let isSidebarOpen = false;
let isUserMenuOpen = false;
let isNotificationsOpen = false;
let authScreen = "login";
let authError = "";
let authMessage = "";
let authRecoveryCode = "";
let currentTheme = "light";

const DEMO_BLOCKED_MESSAGE = "Disponible solo con cuenta";
const DEMO_WRITE_FORM_SELECTORS = [
  "[data-clientes-form]",
  "[data-servicios-form]",
  "[data-ventas-form]",
  "[data-gastos-form]",
  "[data-ordenes-form]",
  "[data-equipos-form]",
  "[data-soporte-form]",
].join(", ");
const DEMO_WRITE_ACTION_SELECTORS = [
  "[data-cliente-edit]",
  "[data-cliente-delete]",
  "[data-servicio-edit]",
  "[data-servicio-delete]",
  "[data-venta-edit]",
  "[data-venta-delete]",
  "[data-gasto-edit]",
  "[data-gasto-delete]",
  "[data-orden-edit]",
  "[data-orden-delete]",
  "[data-equipo-edit]",
  "[data-equipo-delete]",
  "[data-soporte-edit]",
  "[data-soporte-delete]",
  "[data-clientes-cancel]",
  "[data-servicios-cancel]",
  "[data-ventas-cancel]",
  "[data-gastos-cancel]",
  "[data-ordenes-cancel]",
  "[data-equipos-cancel]",
  "[data-soporte-cancel]",
].join(", ");

const getStoredTheme = () => {
  const storedTheme = getStorageItem(APP_SETTINGS.storageKeys.theme);
  return storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
};

const applyTheme = (theme) => {
  currentTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = currentTheme;
};

const initializeAppState = () => {
  const currentState = getStorageItem(APP_SETTINGS.storageKeys.appState);

  if (currentState) {
    return currentState;
  }

  const initialState = createInitialState();
  setStorageItem(APP_SETTINGS.storageKeys.appState, initialState);
  return initialState;
};

const getModuleByKey = (moduleKey) =>
  MODULES.find((module) => module.key === moduleKey) ?? MODULES[0];

const renderPlaceholderContent = (activeModule) => `
  <div class="module-grid" aria-label="Resumen del modulo">
    <article class="metric-card">
      <span class="metric-card__label">Estado</span>
      <strong class="metric-card__value">Base lista</strong>
    </article>
    <article class="metric-card">
      <span class="metric-card__label">Persistencia</span>
      <strong class="metric-card__value">LocalStorage</strong>
    </article>
    <article class="metric-card">
      <span class="metric-card__label">Arquitectura</span>
      <strong class="metric-card__value">Modular</strong>
    </article>
  </div>
`;

const renderModuleHeading = (activeModule) => `
  <section class="module-heading" aria-label="Modulo actual">
    <p class="module-heading__version">${formatAppVersion(APP_SETTINGS.version)}</p>
    <h1 class="module-heading__title">${activeModule.label}</h1>
    <p class="module-heading__description">${activeModule.description}</p>
  </section>
`;

const renderDemoNotice = (session) =>
  session?.mode === "demo"
    ? `
      <aside class="demo-readonly-notice" role="status">
        Estás visualizando el sistema. Regístrate o inicia sesión para usar todas las funcionalidades.
      </aside>
    `
    : "";

const renderModuleContent = (activeModule) => `
  ${
    activeModule.key === "customers"
      ? renderClientes()
      : activeModule.key === "dashboard"
        ? renderDashboard()
        : activeModule.key === "services"
          ? renderServicios()
          : activeModule.key === "sales"
            ? renderVentas()
            : activeModule.key === "expenses"
              ? renderGastos()
              : activeModule.key === "orders"
                ? renderOrdenes()
                : activeModule.key === "equipment"
                  ? renderEquipos()
                  : activeModule.key === "support"
                    ? renderSoporte()
                    : activeModule.key === "reports"
                      ? renderReportes()
                      : `<section class="module-view" aria-label="${activeModule.label}">${renderPlaceholderContent(activeModule)}</section>`
  }
`;

const resetSessionUiState = () => {
  authScreen = "login";
  authError = "";
  authMessage = "";
  authRecoveryCode = "";
  activeModuleKey = DEFAULT_MODULE_KEY;
  isSidebarOpen = false;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
};

const setAuthFeedback = ({ error = "", message = "", recoveryCode = "" } = {}) => {
  authError = error;
  authMessage = message;
  authRecoveryCode = recoveryCode;
};

const isDemoSessionActive = () => getCurrentSession()?.mode === "demo";

const applyDemoModeRestrictions = (session) => {
  if (session?.mode !== "demo") {
    return;
  }

  const mainContent = document.querySelector("#main-content");

  if (!mainContent) {
    return;
  }

  mainContent.querySelectorAll(DEMO_WRITE_FORM_SELECTORS).forEach((form) => {
    form.classList.add("demo-locked-form");
    form.setAttribute("title", DEMO_BLOCKED_MESSAGE);
    form.querySelectorAll("button[type='submit'], .button--primary").forEach((button) => {
      button.disabled = true;
      button.setAttribute("title", DEMO_BLOCKED_MESSAGE);
      button.setAttribute("aria-label", DEMO_BLOCKED_MESSAGE);
    });
  });

  mainContent.querySelectorAll(DEMO_WRITE_ACTION_SELECTORS).forEach((button) => {
    button.disabled = true;
    button.classList.add("demo-locked-action");
    button.setAttribute("title", DEMO_BLOCKED_MESSAGE);
    button.setAttribute("aria-label", DEMO_BLOCKED_MESSAGE);
  });
};

const renderApp = () => {
  applyTheme(currentTheme);
  initializeAuthUsers();
  const session = getCurrentSession();

  if (!session) {
    appRoot.innerHTML = renderAuth({
      screen: authScreen,
      error: authError,
      message: authMessage,
      recoveryCode: authRecoveryCode,
    });
    return;
  }

  initializeAppState();
  const activeModule = getModuleByKey(activeModuleKey);
  const notifications = getSystemNotifications();

  appRoot.innerHTML = `
    <div class="app-shell${isSidebarOpen ? " sidebar-open" : ""}">
      <div class="sidebar-backdrop${isSidebarOpen ? " sidebar-backdrop--visible" : ""}" data-sidebar-backdrop></div>
      ${renderSidebar(activeModule.key)}
      <div class="workspace">
        ${renderHeader({
          isSidebarOpen,
          session,
          isUserMenuOpen,
          isNotificationsOpen,
          theme: currentTheme,
          notifications,
        })}
        <main class="main-content" id="main-content">
          ${renderModuleHeading(activeModule)}
          ${renderDemoNotice(session)}
          ${renderModuleContent(activeModule)}
        </main>
      </div>
    </div>
  `;

  if (activeModule.key === "customers") {
    mountClientes(document.querySelector("#main-content"));
  }

  if (activeModule.key === "services") {
    mountServicios(document.querySelector("#main-content"));
  }

  if (activeModule.key === "sales") {
    mountVentas(document.querySelector("#main-content"));
  }

  if (activeModule.key === "expenses") {
    mountGastos(document.querySelector("#main-content"));
  }

  if (activeModule.key === "orders") {
    mountOrdenes(document.querySelector("#main-content"));
  }

  if (activeModule.key === "equipment") {
    mountEquipos(document.querySelector("#main-content"));
  }

  if (activeModule.key === "support") {
    mountSoporte(document.querySelector("#main-content"));
  }

  if (activeModule.key === "reports") {
    mountReportes(document.querySelector("#main-content"));
  }

  applyDemoModeRestrictions(session);
};

const handleLogin = (event) => {
  const form = event.target.closest("[data-login-form]");

  if (!form) {
    return;
  }

  event.preventDefault();
  const credentials = Object.fromEntries(new FormData(form).entries());
  const result = login(credentials);

  if (!result.ok) {
    setAuthFeedback({ error: result.error });
    renderApp();
    return;
  }

  resetSessionUiState();
  renderApp();
};

const handleRegister = (event) => {
  const form = event.target.closest("[data-register-form]");

  if (!form) {
    return;
  }

  event.preventDefault();
  const result = registerUser(Object.fromEntries(new FormData(form).entries()));

  if (!result.ok) {
    setAuthFeedback({ error: result.error });
    renderApp();
    return;
  }

  authScreen = "login";
  setAuthFeedback({ message: result.message });
  renderApp();
};

const handleDemoAccess = (event) => {
  const demoButton = event.target.closest("[data-demo-login]");

  if (!demoButton) {
    return;
  }

  startDemoSession();
  resetSessionUiState();
  renderApp();
};

const handleRecovery = (event) => {
  const form = event.target.closest("[data-recovery-form]");

  if (!form) {
    return;
  }

  event.preventDefault();
  const result = requestPasswordReset(Object.fromEntries(new FormData(form).entries()));

  if (!result.ok) {
    setAuthFeedback({ error: result.error });
    renderApp();
    return;
  }

  authScreen = "verify";
  setAuthFeedback({ message: result.message, recoveryCode: result.code });
  renderApp();
};

const handlePasswordReset = (event) => {
  const form = event.target.closest("[data-verify-form]");

  if (!form) {
    return;
  }

  event.preventDefault();
  const result = resetPassword(Object.fromEntries(new FormData(form).entries()));

  if (!result.ok) {
    setAuthFeedback({ error: result.error, recoveryCode: authRecoveryCode });
    renderApp();
    return;
  }

  authScreen = "login";
  setAuthFeedback({ message: result.message });
  renderApp();
};

const handleAuthViewChange = (event) => {
  const viewButton = event.target.closest("[data-auth-view]");

  if (!viewButton) {
    return;
  }

  authScreen = viewButton.dataset.authView;
  setAuthFeedback();
  renderApp();
};

const handleRegisterPasswordToggle = (event) => {
  const toggleButton = event.target.closest("[data-register-password-toggle]");

  if (!toggleButton) {
    return;
  }

  const fieldName = toggleButton.dataset.registerPasswordToggle;
  const form = toggleButton.closest("[data-register-form]");
  const input = form?.querySelector(`input[name="${fieldName}"]`);

  if (!input) {
    return;
  }

  const shouldShowPassword = input.type === "password";
  input.type = shouldShowPassword ? "text" : "password";
  toggleButton.classList.toggle("auth-password-toggle--visible", shouldShowPassword);
  toggleButton.setAttribute("aria-label", shouldShowPassword ? "Ocultar contraseña" : "Mostrar contraseña");
  toggleButton.setAttribute("title", shouldShowPassword ? "Ocultar contraseña" : "Mostrar contraseña");
};

const handleDemoWriteBlock = (event) => {
  if (!isDemoSessionActive()) {
    return;
  }

  const blockedForm = event.target.closest?.(DEMO_WRITE_FORM_SELECTORS);
  const blockedAction = event.target.closest?.(DEMO_WRITE_ACTION_SELECTORS);

  if (!blockedForm && !blockedAction) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
};

const handleSeedLoad = (event) => {
  const loadButton = event.target.closest("[data-seed-load]");

  if (!loadButton) {
    return;
  }

  if (!window.confirm("¿Cargar datos demo en clientes, servicios, ventas, gastos, órdenes, equipos y soporte?")) {
    return;
  }

  loadDemoData();
  isUserMenuOpen = false;
  renderApp();
  window.alert("Datos de prueba cargados correctamente.");
};

const handleSeedClear = (event) => {
  const clearButton = event.target.closest("[data-seed-clear]");

  if (!clearButton) {
    return;
  }

  if (!window.confirm("¿Limpiar únicamente los datos demo? Los usuarios y la sesión se mantendrán.")) {
    return;
  }

  clearDemoData();
  isUserMenuOpen = false;
  renderApp();
  window.alert("Datos demo limpiados correctamente.");
};

const handleLogout = (event) => {
  const logoutButton = event.target.closest("[data-auth-logout]");

  if (!logoutButton) {
    return;
  }

  logout();
  resetSessionUiState();
  renderApp();
};

const handleUserMenuToggle = (event) => {
  const toggleButton = event.target.closest("[data-user-menu-toggle]");
  const dropdown = event.target.closest(".user-menu__dropdown");

  if (toggleButton) {
    isUserMenuOpen = !isUserMenuOpen;
    isNotificationsOpen = false;
    renderApp();
    return;
  }

  if (!dropdown && isUserMenuOpen) {
    isUserMenuOpen = false;
    renderApp();
  }
};

const handleNotificationsToggle = (event) => {
  const toggleButton = event.target.closest("[data-notifications-toggle]");
  const dropdown = event.target.closest(".notifications-menu__dropdown");

  if (toggleButton) {
    isNotificationsOpen = !isNotificationsOpen;
    isUserMenuOpen = false;
    renderApp();
    return;
  }

  if (!dropdown && isNotificationsOpen) {
    isNotificationsOpen = false;
    renderApp();
  }
};

const handleThemeToggle = (event) => {
  const toggleButton = event.target.closest("[data-theme-toggle]");

  if (!toggleButton) {
    return;
  }

  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  setStorageItem(APP_SETTINGS.storageKeys.theme, nextTheme);
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  applyTheme(nextTheme);
  renderApp();
};

const handleNavigation = (event) => {
  const navigationButton = event.target.closest("[data-module-key]");

  if (!navigationButton) {
    return;
  }

  activeModuleKey = navigationButton.dataset.moduleKey;
  isSidebarOpen = false;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  renderApp();
};

const handleSidebarToggle = (event) => {
  const toggleButton = event.target.closest("[data-sidebar-toggle]");
  const backdrop = event.target.closest("[data-sidebar-backdrop]");

  if (toggleButton) {
    isSidebarOpen = !isSidebarOpen;
    isUserMenuOpen = false;
    isNotificationsOpen = false;
    renderApp();
    return;
  }

  if (backdrop) {
    isSidebarOpen = false;
    isUserMenuOpen = false;
    isNotificationsOpen = false;
    renderApp();
  }
};

const handleKeyboardNavigation = (event) => {
  if (event.key !== "Escape" || (!isSidebarOpen && !isUserMenuOpen && !isNotificationsOpen)) {
    return;
  }

  isSidebarOpen = false;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  renderApp();
};

const handleSidebarSummaryChange = () => {
  if (!getCurrentSession()) {
    return;
  }

  renderApp();
};

const handleSessionStorageChange = (event) => {
  if (event.key !== APP_SETTINGS.storageKeys.authSession && event.key !== null) {
    return;
  }

  resetSessionUiState();
  renderApp();
};

appRoot.addEventListener("submit", handleDemoWriteBlock, true);
appRoot.addEventListener("click", handleDemoWriteBlock, true);
appRoot.addEventListener("submit", handleLogin);
appRoot.addEventListener("submit", handleRegister);
appRoot.addEventListener("submit", handleRecovery);
appRoot.addEventListener("submit", handlePasswordReset);
appRoot.addEventListener("click", handleLogout);
appRoot.addEventListener("click", handleDemoAccess);
appRoot.addEventListener("click", handleAuthViewChange);
appRoot.addEventListener("click", handleRegisterPasswordToggle);
appRoot.addEventListener("click", handleSeedLoad);
appRoot.addEventListener("click", handleSeedClear);
appRoot.addEventListener("click", handleUserMenuToggle);
appRoot.addEventListener("click", handleNotificationsToggle);
appRoot.addEventListener("click", handleThemeToggle);
appRoot.addEventListener("click", handleNavigation);
appRoot.addEventListener("click", handleSidebarToggle);
document.addEventListener("keydown", handleKeyboardNavigation);
window.addEventListener("apx:sidebar-summary-change", handleSidebarSummaryChange);
window.addEventListener("storage", handleSessionStorageChange);
applyTheme(getStoredTheme());
renderApp();
