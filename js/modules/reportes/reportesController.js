import { getReportesData } from "./reportesService.js";
import { renderReportesModule } from "./reportesView.js";

const state = {
  filters: {
    fechaInicio: "",
    fechaFin: "",
  },
};

const getFormData = (form) => Object.fromEntries(new FormData(form).entries());

export const renderReportes = () => renderReportesModule(getReportesData(state.filters));

export const mountReportes = (container) => {
  const rerender = () => {
    container.innerHTML = renderReportes();
  };

  container.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-reportes-filters]");

    if (!form) {
      return;
    }

    event.preventDefault();
    state.filters = {
      ...state.filters,
      ...getFormData(form),
    };
    rerender();
  });

  container.addEventListener("click", (event) => {
    const clearButton = event.target.closest("[data-reportes-clear]");

    if (!clearButton) {
      return;
    }

    state.filters.fechaInicio = "";
    state.filters.fechaFin = "";
    rerender();
  });
};

export const resetReportesState = () => {
  state.filters.fechaInicio = "";
  state.filters.fechaFin = "";
};
