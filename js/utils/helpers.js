export const capitalizeText = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const createId = (prefix = "apx") => `${prefix}-${crypto.randomUUID()}`;
