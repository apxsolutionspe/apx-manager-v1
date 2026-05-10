import {
  createCliente,
  deleteCliente,
  findClienteById,
  getClientes,
  searchClientes,
  updateCliente,
} from "./clientesService.js";
import { renderClientesModule } from "./clientesView.js";

const state = {
  searchTerm: "",
  editingClienteId: null,
  errors: {},
};

const getFormData = (form) => Object.fromEntries(new FormData(form).entries());

const getCurrentClientes = () => searchClientes(state.searchTerm);

export const getClientesSummary = () => {
  const clientes = getClientes();

  return {
    total: clientes.length,
    active: clientes.filter((cliente) => cliente.estado === "Activo").length,
    companies: clientes.filter((cliente) => cliente.tipoCliente === "Empresa").length,
    people: clientes.filter((cliente) => cliente.tipoCliente === "Persona").length,
  };
};

export const renderClientes = () =>
  renderClientesModule({
    clientes: getCurrentClientes(),
    summary: getClientesSummary(),
    editingCliente: state.editingClienteId ? findClienteById(state.editingClienteId) : null,
    searchTerm: state.searchTerm,
    errors: state.errors,
  });

export const mountClientes = (container) => {
  const rerender = () => {
    container.innerHTML = renderClientes();
  };

  container.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-clientes-form]");

    if (!form) {
      return;
    }

    event.preventDefault();

    const clienteData = getFormData(form);
    const result = clienteData.id
      ? updateCliente(clienteData.id, clienteData)
      : createCliente(clienteData);

    if (!result.ok) {
      state.errors = result.errors;
      rerender();
      return;
    }

    state.editingClienteId = null;
    state.errors = {};
    rerender();
  });

  container.addEventListener("input", (event) => {
    const searchInput = event.target.closest("[data-clientes-search]");

    if (!searchInput) {
      return;
    }

    state.searchTerm = searchInput.value;
    rerender();

    const nextSearchInput = container.querySelector("[data-clientes-search]");
    nextSearchInput?.focus();
    nextSearchInput?.setSelectionRange(state.searchTerm.length, state.searchTerm.length);
  });

  container.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-cliente-edit]");
    const deleteButton = event.target.closest("[data-cliente-delete]");
    const cancelButton = event.target.closest("[data-clientes-cancel]");

    if (editButton) {
      state.editingClienteId = editButton.dataset.clienteEdit;
      state.errors = {};
      rerender();
      return;
    }

    if (deleteButton) {
      const clienteId = deleteButton.dataset.clienteDelete;
      deleteCliente(clienteId);

      if (state.editingClienteId === clienteId) {
        state.editingClienteId = null;
      }

      state.errors = {};
      rerender();
      return;
    }

    if (cancelButton) {
      state.editingClienteId = null;
      state.errors = {};
      rerender();
    }
  });
};

export const resetClientesState = () => {
  state.searchTerm = "";
  state.editingClienteId = null;
  state.errors = {};
};
