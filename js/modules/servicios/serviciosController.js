import {
  createServicio,
  deleteServicio,
  findServicioById,
  getServicios,
  searchServicios,
  updateServicio,
} from "./serviciosService.js";
import { renderServiciosModule } from "./serviciosView.js";

const state = {
  searchTerm: "",
  editingServicioId: null,
  errors: {},
};

const getFormData = (form) => Object.fromEntries(new FormData(form).entries());

const getCurrentServicios = () => searchServicios(state.searchTerm);

export const getServiciosSummary = () => {
  const servicios = getServicios();
  const totalPrecio = servicios.reduce((total, servicio) => total + Number(servicio.precioBase || 0), 0);
  const totalGanancia = servicios.reduce((total, servicio) => total + Number(servicio.gananciaEstimada || 0), 0);

  return {
    total: servicios.length,
    active: servicios.filter((servicio) => servicio.estado === "Activo").length,
    averagePrice: servicios.length > 0 ? totalPrecio / servicios.length : 0,
    estimatedProfit: totalGanancia,
  };
};

export const renderServicios = () =>
  renderServiciosModule({
    servicios: getCurrentServicios(),
    summary: getServiciosSummary(),
    editingServicio: state.editingServicioId ? findServicioById(state.editingServicioId) : null,
    searchTerm: state.searchTerm,
    errors: state.errors,
  });

export const mountServicios = (container) => {
  const rerender = () => {
    container.innerHTML = renderServicios();
  };

  container.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-servicios-form]");

    if (!form) {
      return;
    }

    event.preventDefault();

    const servicioData = getFormData(form);
    const result = servicioData.id
      ? updateServicio(servicioData.id, servicioData)
      : createServicio(servicioData);

    if (!result.ok) {
      state.errors = result.errors;
      rerender();
      return;
    }

    state.editingServicioId = null;
    state.errors = {};
    rerender();
  });

  container.addEventListener("input", (event) => {
    const searchInput = event.target.closest("[data-servicios-search]");

    if (!searchInput) {
      return;
    }

    state.searchTerm = searchInput.value;
    rerender();

    const nextSearchInput = container.querySelector("[data-servicios-search]");
    nextSearchInput?.focus();
    nextSearchInput?.setSelectionRange(state.searchTerm.length, state.searchTerm.length);
  });

  container.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-servicio-edit]");
    const deleteButton = event.target.closest("[data-servicio-delete]");
    const cancelButton = event.target.closest("[data-servicios-cancel]");

    if (editButton) {
      state.editingServicioId = editButton.dataset.servicioEdit;
      state.errors = {};
      rerender();
      return;
    }

    if (deleteButton) {
      const servicioId = deleteButton.dataset.servicioDelete;
      deleteServicio(servicioId);

      if (state.editingServicioId === servicioId) {
        state.editingServicioId = null;
      }

      state.errors = {};
      rerender();
      return;
    }

    if (cancelButton) {
      state.editingServicioId = null;
      state.errors = {};
      rerender();
    }
  });
};

export const resetServiciosState = () => {
  state.searchTerm = "";
  state.editingServicioId = null;
  state.errors = {};
};
