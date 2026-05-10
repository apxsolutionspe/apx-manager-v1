export const formatAppVersion = (version) => `v${version}`;

export const formatDate = (dateValue, locale = "es-PE") => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
