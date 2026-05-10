import { renderAuth } from "./auth.ui.js";

export const renderLogin = ({ error = "", message = "", recoveryCode = "" } = {}) =>
  renderAuth({ screen: "login", error, message, recoveryCode });
