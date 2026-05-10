import { APP_SETTINGS } from "../../config/settings.js";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const AUTH_COPY = {
  login: {
    eyebrow: "Acceso seguro",
    title: "Bienvenido de nuevo",
    description: "Ingresa para gestionar clientes, ventas, soporte y reportes internos.",
  },
  register: {
    eyebrow: "Nueva cuenta",
    title: "Crea tu acceso APX",
    description: "Registra un usuario local para trabajar dentro del entorno de pruebas.",
  },
  recovery: {
    eyebrow: "Recuperación",
    title: "Recupera tu contraseña",
    description: "Generaremos un código temporal de seis dígitos para validar tu cuenta.",
  },
  verify: {
    eyebrow: "Verificación",
    title: "Actualiza tu contraseña",
    description: "Ingresa el código recibido y define una nueva contraseña segura.",
  },
};

const renderStatus = ({ error = "", message = "", recoveryCode = "" }) => `
  ${error ? `<p class="auth-message auth-message--error" role="alert">${escapeHtml(error)}</p>` : ""}
  ${
    message
      ? `<p class="auth-message auth-message--success" role="status">${escapeHtml(message)}</p>`
      : ""
  }
  ${
    recoveryCode
      ? `<p class="auth-message auth-message--code" role="note">Código de prueba: <strong>${escapeHtml(recoveryCode)}</strong></p>`
      : ""
  }
`;

const renderLoginForm = () => `
  <form class="auth-form" data-login-form>
    <label class="auth-field">
      <span>Correo</span>
      <input name="email" type="email" autocomplete="username" placeholder="admin@apx.com" required />
    </label>

    <label class="auth-field">
      <span>Contraseña</span>
      <input name="password" type="password" autocomplete="current-password" placeholder="Ingresa tu contraseña" required />
    </label>

    <div class="auth-form__row">
      <label class="auth-check">
        <input name="rememberSession" type="checkbox" />
        <span>Mantener sesión</span>
      </label>
      <button class="auth-link" type="button" data-auth-view="recovery">¿Olvidaste tu contraseña?</button>
    </div>

    <button class="auth-submit" type="submit">Iniciar sesión</button>
    <button class="auth-submit auth-submit--secondary" type="button" data-demo-login>Visualizar sistema</button>
    <p class="auth-switch">¿No tienes cuenta? <button type="button" data-auth-view="register">Crear cuenta</button></p>
  </form>
`;

const renderPasswordToggle = (targetName) => `
  <button
    class="auth-password-toggle"
    type="button"
    data-register-password-toggle="${targetName}"
    aria-label="Mostrar contraseña"
    title="Mostrar contraseña"
  >
    <svg class="auth-password-toggle__icon auth-password-toggle__icon--show" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
    <svg class="auth-password-toggle__icon auth-password-toggle__icon--hide" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6" />
      <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c6 0 9.5 7 9.5 7a16.7 16.7 0 0 1-3.2 4.1" />
      <path d="M6.6 6.8C4 8.5 2.5 12 2.5 12s3.5 7 9.5 7a10 10 0 0 0 4-.8" />
    </svg>
  </button>
`;

const renderRegisterForm = () => `
  <form class="auth-form" data-register-form>
    <label class="auth-field">
      <span>Nombre</span>
      <input name="name" type="text" autocomplete="name" placeholder="Nombre completo" required />
    </label>

    <label class="auth-field">
      <span>Correo</span>
      <input name="email" type="email" autocomplete="email" placeholder="usuario@apx.com" required />
    </label>

    <label class="auth-field">
      <span>Contraseña</span>
      <span class="auth-password-field">
        <input name="password" type="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" required />
        ${renderPasswordToggle("password")}
      </span>
    </label>

    <label class="auth-field">
      <span>Confirmar contraseña</span>
      <span class="auth-password-field">
        <input name="confirmPassword" type="password" autocomplete="new-password" placeholder="Repite tu contraseña" required />
        ${renderPasswordToggle("confirmPassword")}
      </span>
    </label>

    <button class="auth-submit" type="submit">Crear cuenta</button>
    <p class="auth-switch">¿Ya tienes cuenta? <button type="button" data-auth-view="login">Iniciar sesión</button></p>
  </form>
`;

const renderRecoveryForm = () => `
  <form class="auth-form" data-recovery-form>
    <label class="auth-field">
      <span>Correo registrado</span>
      <input name="email" type="email" autocomplete="email" placeholder="admin@apx.com" required />
    </label>

    <button class="auth-submit" type="submit">Enviar código</button>
    <p class="auth-switch">¿Recordaste tu contraseña? <button type="button" data-auth-view="login">Volver al login</button></p>
  </form>
`;

const renderVerifyForm = () => `
  <form class="auth-form" data-verify-form>
    <label class="auth-field">
      <span>Código recibido</span>
      <input name="code" type="text" inputmode="numeric" maxlength="6" placeholder="000000" required />
    </label>

    <label class="auth-field">
      <span>Nueva contraseña</span>
      <input name="password" type="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" required />
    </label>

    <label class="auth-field">
      <span>Confirmar nueva contraseña</span>
      <input name="confirmPassword" type="password" autocomplete="new-password" placeholder="Repite tu contraseña" required />
    </label>

    <button class="auth-submit" type="submit">Actualizar contraseña</button>
    <p class="auth-switch"><button type="button" data-auth-view="recovery">Solicitar otro código</button></p>
  </form>
`;

const renderCurrentForm = (screen) => {
  if (screen === "register") {
    return renderRegisterForm();
  }

  if (screen === "recovery") {
    return renderRecoveryForm();
  }

  if (screen === "verify") {
    return renderVerifyForm();
  }

  return renderLoginForm();
};

export const renderAuth = ({ screen = "login", error = "", message = "", recoveryCode = "" } = {}) => {
  const currentScreen = AUTH_COPY[screen] ? screen : "login";
  const copy = AUTH_COPY[currentScreen];

  return `
    <main class="auth-screen" aria-label="Autenticación APX">
      <section class="auth-layout">
        <aside class="auth-visual" aria-label="Resumen APX Manager">
          <div class="auth-visual__orb auth-visual__orb--one" aria-label="Logo APX">APX</div>
          <div class="auth-visual__orb auth-visual__orb--two"></div>
          <div class="auth-visual__content">
            <span class="auth-visual__tag">APX v${APP_SETTINGS.version}</span>
            <h2>Gestión empresarial clara, modular y lista para crecer.</h2>
            <p>Controla operaciones, finanzas y soporte técnico desde un entorno interno diseñado para Apex Prime X.</p>
            <div class="auth-visual__metrics" aria-label="Módulos principales">
              <span>Clientes</span>
              <span>Ventas</span>
              <span>Soporte</span>
              <span>Reportes</span>
            </div>
          </div>
        </aside>

        <section class="auth-card">
          <div class="auth-brand" aria-label="${APP_SETTINGS.name}">
            <span class="auth-brand__logo">APX</span>
            <div>
              <h1>${APP_SETTINGS.name}</h1>
              <p>${APP_SETTINGS.company}</p>
            </div>
          </div>

          <div class="auth-card__intro">
            <p class="auth-card__eyebrow">${copy.eyebrow}</p>
            <h2>${copy.title}</h2>
            <p>${copy.description}</p>
          </div>

          ${renderStatus({ error, message, recoveryCode })}
          ${renderCurrentForm(currentScreen)}
        </section>
      </section>
    </main>
  `;
};
