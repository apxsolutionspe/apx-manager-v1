import { APP_SETTINGS } from "../../config/settings.js";
import { getStorageItem, removeStorageItem, setStorageItem } from "../../storage/localStorage.js";

const ADMIN_USER = {
  id: "USR-ADMIN",
  name: "Admin APX",
  email: "admin@apx.com",
  password: "admin123",
  role: "Administrador",
};

export const getInitialAdminUser = () => ({ ...ADMIN_USER });

export const getUsers = () => {
  const users = getStorageItem(APP_SETTINGS.storageKeys.authUsers);
  return Array.isArray(users) ? users : [];
};

export const saveUsers = (users) => {
  setStorageItem(APP_SETTINGS.storageKeys.authUsers, Array.isArray(users) ? users : []);
};

export const ensureAdminUser = () => {
  const users = getUsers();
  const hasAdmin = users.some((user) => user.email === ADMIN_USER.email);

  if (hasAdmin) {
    return users;
  }

  const nextUsers = [ADMIN_USER, ...users];
  saveUsers(nextUsers);
  return nextUsers;
};

export const getSession = () => getStorageItem(APP_SETTINGS.storageKeys.authSession);

export const saveSession = (session) => {
  setStorageItem(APP_SETTINGS.storageKeys.authSession, session);
};

export const clearSession = () => {
  removeStorageItem(APP_SETTINGS.storageKeys.authSession);
};

export const getRecoveryRequest = () => getStorageItem(APP_SETTINGS.storageKeys.authRecovery);

export const saveRecoveryRequest = (request) => {
  setStorageItem(APP_SETTINGS.storageKeys.authRecovery, request);
};

export const clearRecoveryRequest = () => {
  removeStorageItem(APP_SETTINGS.storageKeys.authRecovery);
};
