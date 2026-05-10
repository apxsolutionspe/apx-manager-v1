import {
  createEquipo,
  deleteEquipo,
  findClienteById,
  findEquipoById,
  getClientes,
  getEquipos,
  searchEquipos,
  updateEquipo,
} from "./equiposService.js";
import { renderEquiposModule } from "./equiposView.js";

const state = {
  searchTerm: "",
  editingEquipoId: null,
  errors: {},
};

const getFormData = (form) => Object.fromEntries(new FormData(form).entries());

const getClienteName = (clienteId) => findClienteById(clienteId)?.nombre ?? "Cliente no encontrado";

const getCurrentEquipos = () => searchEquipos(state.searchTerm);

const getEquiposSummary = () => {
  const equipos = getEquipos();
  const needsAttention = (equipo) => ["Regular", "DaÃ±ado", "Incompleto", "Dañado"].includes(equipo.estadoFisico);

  return {
    total: equipos.length,
    pending: equipos.filter(needsAttention).length,
    delivered: equipos.filter((equipo) => equipo.estadoFisico === "Bueno").length,
    repairing: equipos.filter(needsAttention).length,
  };
};

export const renderEquipos = () =>
  renderEquiposModule({
    equipos: getCurrentEquipos(),
    summary: getEquiposSummary(),
    clientes: getClientes(),
    editingEquipo: state.editingEquipoId ? findEquipoById(state.editingEquipoId) : null,
    searchTerm: state.searchTerm,
    errors: state.errors,
    getClienteName,
  });

export const mountEquipos = (container) => {
  const rerender = () => {
    container.innerHTML = renderEquipos();
  };

  container.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-equipos-form]");

    if (!form) {
      return;
    }

    event.preventDefault();

    const equipoData = getFormData(form);
    const result = equipoData.id ? updateEquipo(equipoData.id, equipoData) : createEquipo(equipoData);

    if (!result.ok) {
      state.errors = result.errors;
      rerender();
      return;
    }

    state.editingEquipoId = null;
    state.errors = {};
    rerender();
  });

  container.addEventListener("input", (event) => {
    const searchInput = event.target.closest("[data-equipos-search]");

    if (!searchInput) {
      return;
    }

    state.searchTerm = searchInput.value;
    rerender();

    const nextSearchInput = container.querySelector("[data-equipos-search]");
    nextSearchInput?.focus();
    nextSearchInput?.setSelectionRange(state.searchTerm.length, state.searchTerm.length);
  });

  container.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-equipo-edit]");
    const deleteButton = event.target.closest("[data-equipo-delete]");
    const cancelButton = event.target.closest("[data-equipos-cancel]");

    if (editButton) {
      state.editingEquipoId = editButton.dataset.equipoEdit;
      state.errors = {};
      rerender();
      return;
    }

    if (deleteButton) {
      const equipoId = deleteButton.dataset.equipoDelete;
      deleteEquipo(equipoId);

      if (state.editingEquipoId === equipoId) {
        state.editingEquipoId = null;
      }

      state.errors = {};
      rerender();
      return;
    }

    if (cancelButton) {
      state.editingEquipoId = null;
      state.errors = {};
      rerender();
    }
  });
};

export const resetEquiposState = () => {
  state.searchTerm = "";
  state.editingEquipoId = null;
  state.errors = {};
};
