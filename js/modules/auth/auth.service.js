import {
  clearRecoveryRequest,
  clearSession,
  ensureAdminUser,
  getRecoveryRequest,
  getSession,
  getUsers,
  saveRecoveryRequest,
  saveSession,
  saveUsers,
} from "./auth.store.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const RECOVERY_TTL_MS = 15 * 60 * 1000;

const normalizeEmail = (email) => String(email ?? "").trim().toLowerCase();
const normalizeText = (value) => String(value ?? "").trim();

const isValidEmail = (email) => EMAIL_PATTERN.test(normalizeEmail(email));

const createUserId = (users) => {
  const nextNumber =
    users.reduce((highest, user) => {
      const [, rawNumber] = String(user.id ?? "").split("-");
      const currentNumber = Number(rawNumber);
      return Number.isInteger(currentNumber) ? Math.max(highest, currentNumber) : highest;
    }, 0) + 1;

  return `USR-${String(nextNumber).padStart(5, "0")}`;
};

const createRecoveryCode = () => String(Math.floor(100000 + Math.random() * 900000));

export const initializeAuthUsers = () => ensureAdminUser();

export const getCurrentSession = () => {
  initializeAuthUsers();
  return getSession();
};

export const login = ({ email, password, rememberSession }) => {
  const users = initializeAuthUsers();
  const normalizedEmail = normalizeEmail(email);
  const user = users.find((currentUser) => normalizeEmail(currentUser.email) === normalizedEmail);

  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, error: "Ingresa un correo válido." };
  }

  if (!user || user.password !== String(password ?? "")) {
    return { ok: false, error: "Correo o contraseña incorrectos." };
  }

  const session = {
    name: user.name,
    email: user.email,
    role: user.role,
    mode: "authenticated",
    userId: user.id,
    rememberSession: rememberSession === "on" || rememberSession === true,
    startedAt: new Date().toISOString(),
  };

  saveSession(session);
  return { ok: true, session };
};

export const startDemoSession = () => {
  const sessionUser = {
    name: "Visitante APX",
    email: "demo@apx.local",
    role: "Visitante",
    mode: "demo",
    startedAt: new Date().toISOString(),
  };

  saveSession(sessionUser);
  return { ok: true, session: sessionUser };
};

export const registerUser = ({ name, email, password, confirmPassword }) => {
  const users = initializeAuthUsers();
  const normalizedName = normalizeText(name);
  const normalizedEmail = normalizeEmail(email);
  const rawPassword = String(password ?? "");

  if (!normalizedName) {
    return { ok: false, error: "Ingresa tu nombre." };
  }

  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, error: "Ingresa un correo válido." };
  }

  if (rawPassword.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, error: "La contraseña debe tener al menos 6 caracteres." };
  }

  if (rawPassword !== String(confirmPassword ?? "")) {
    return { ok: false, error: "Las contraseñas no coinciden." };
  }

  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    return { ok: false, error: "Ya existe una cuenta registrada con ese correo." };
  }

  const user = {
    id: createUserId(users),
    name: normalizedName,
    email: normalizedEmail,
    password: rawPassword,
    role: "Usuario",
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);
  return { ok: true, user, message: "Cuenta creada correctamente. Ya puedes iniciar sesión." };
};

export const requestPasswordReset = ({ email }) => {
  const users = initializeAuthUsers();
  const normalizedEmail = normalizeEmail(email);
  const user = users.find((currentUser) => normalizeEmail(currentUser.email) === normalizedEmail);

  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, error: "Ingresa un correo válido." };
  }

  if (!user) {
    return { ok: false, error: "No existe una cuenta registrada con ese correo." };
  }

  const code = createRecoveryCode();
  const recoveryRequest = {
    email: normalizedEmail,
    code,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + RECOVERY_TTL_MS).toISOString(),
  };

  saveRecoveryRequest(recoveryRequest);
  console.log(`[APX Manager] Código de recuperación para ${normalizedEmail}: ${code}`);

  return {
    ok: true,
    code,
    message: "Código enviado al correo registrado.",
  };
};

export const resetPassword = ({ code, password, confirmPassword }) => {
  const recoveryRequest = getRecoveryRequest();
  const rawPassword = String(password ?? "");
  const rawCode = normalizeText(code);

  if (!recoveryRequest) {
    return { ok: false, error: "Solicita un código de recuperación primero." };
  }

  if (new Date(recoveryRequest.expiresAt).getTime() < Date.now()) {
    clearRecoveryRequest();
    return { ok: false, error: "El código expiró. Solicita uno nuevo." };
  }

  if (rawCode !== recoveryRequest.code) {
    return { ok: false, error: "El código ingresado no es correcto." };
  }

  if (rawPassword.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, error: "La contraseña debe tener al menos 6 caracteres." };
  }

  if (rawPassword !== String(confirmPassword ?? "")) {
    return { ok: false, error: "Las contraseñas no coinciden." };
  }

  const users = getUsers();
  const updatedUsers = users.map((user) =>
    normalizeEmail(user.email) === normalizeEmail(recoveryRequest.email)
      ? { ...user, password: rawPassword, updatedAt: new Date().toISOString() }
      : user,
  );

  saveUsers(updatedUsers);
  clearRecoveryRequest();

  return { ok: true, message: "Contraseña actualizada. Inicia sesión con tus nuevos datos." };
};

export const logout = () => {
  clearSession();
};
