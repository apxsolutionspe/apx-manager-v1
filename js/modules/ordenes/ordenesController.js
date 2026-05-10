import {
  createOrden,
  deleteOrden,
  filterOrdenes,
  findClienteById,
  findOrdenById,
  getClientes,
  getOrdenes,
  updateOrden,
} from "./ordenesService.js";
import { renderOrdenesModule } from "./ordenesView.js";

const state = {
  filters: {
    estado: "",
  },
  editingOrdenId: null,
  errors: {},
};

const getFormData = (form) => Object.fromEntries(new FormData(form).entries());

const getClienteName = (clienteId) => findClienteById(clienteId)?.nombre ?? "Cliente no encontrado";

const getCurrentOrdenes = () => filterOrdenes(state.filters);

const getOrdenesSummary = () => {
  const ordenes = getOrdenes();

  return {
    total: ordenes.length,
    pending: ordenes.filter((orden) => orden.estado === "Pendiente").length,
    inProgress: ordenes.filter((orden) => orden.estado === "En proceso").length,
    delivered: ordenes.filter((orden) => orden.estado === "Entregado").length,
  };
};

export const renderOrdenes = () =>
  renderOrdenesModule({
    ordenes: getCurrentOrdenes(),
    summary: getOrdenesSummary(),
    clientes: getClientes(),
    editingOrden: state.editingOrdenId ? findOrdenById(state.editingOrdenId) : null,
    filters: state.filters,
    errors: state.errors,
    getClienteName,
  });

export const mountOrdenes = (container) => {
  const rerender = () => {
    container.innerHTML = renderOrdenes();
  };

  container.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-ordenes-form]");

    if (!form) {
      return;
    }

    event.preventDefault();

    const ordenData = getFormData(form);
    const result = ordenData.id ? updateOrden(ordenData.id, ordenData) : createOrden(ordenData);

    if (!result.ok) {
      state.errors = result.errors;
      rerender();
      return;
    }

    state.editingOrdenId = null;
    state.errors = {};
    rerender();
  });

  container.addEventListener("change", (event) => {
    const statusFilter = event.target.closest("[data-ordenes-status-filter]");

    if (!statusFilter) {
      return;
    }

    state.filters.estado = statusFilter.value;
    rerender();
  });

  container.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-orden-edit]");
    const deleteButton = event.target.closest("[data-orden-delete]");
    const cancelButton = event.target.closest("[data-ordenes-cancel]");

    if (editButton) {
      state.editingOrdenId = editButton.dataset.ordenEdit;
      state.errors = {};
      rerender();
      return;
    }

    if (deleteButton) {
      const ordenId = deleteButton.dataset.ordenDelete;
      deleteOrden(ordenId);

      if (state.editingOrdenId === ordenId) {
        state.editingOrdenId = null;
      }

      state.errors = {};
      rerender();
      return;
    }

    if (cancelButton) {
      state.editingOrdenId = null;
      state.errors = {};
      rerender();
    }
  });
};

export const resetOrdenesState = () => {
  state.filters.estado = "";
  state.editingOrdenId = null;
  state.errors = {};
};
