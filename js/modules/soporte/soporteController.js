import {
  createSoporte,
  deleteSoporte,
  findClienteById,
  findEquipoById,
  findSoporteById,
  getClientes,
  getEquipos,
  getSoportes,
  updateSoporte,
} from "./soporteService.js";
import { renderSoporteModule } from "./soporteView.js";

const state = {
  editingSoporteId: null,
  errors: {},
};

const getFormData = (form) => Object.fromEntries(new FormData(form).entries());

const getClienteName = (clienteId) => findClienteById(clienteId)?.nombre ?? "Cliente no encontrado";

const getEquipoName = (equipoId) => {
  const equipo = findEquipoById(equipoId);
  return equipo ? `${equipo.tipoEquipo} ${equipo.marca} ${equipo.modelo} (${equipo.serie})` : "Equipo no encontrado";
};

const getSoporteSummary = () => {
  const soportes = getSoportes();

  return {
    totalCases: soportes.length,
    repairing: soportes.filter((soporte) =>
      ["En reparación", "En reparaciÃ³n", "En reparacion"].includes(soporte.estado),
    ).length,
    ready: soportes.filter((soporte) => soporte.estado === "Listo").length,
    technicalTotal: soportes.reduce((total, soporte) => total + Number(soporte.total || 0), 0),
  };
};

export const renderSoporte = () =>
  renderSoporteModule({
    soportes: getSoportes(),
    summary: getSoporteSummary(),
    clientes: getClientes(),
    equipos: getEquipos(),
    editingSoporte: state.editingSoporteId ? findSoporteById(state.editingSoporteId) : null,
    errors: state.errors,
    getClienteName,
    getEquipoName,
  });

export const mountSoporte = (container) => {
  const rerender = () => {
    container.innerHTML = renderSoporte();
  };

  container.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-soporte-form]");

    if (!form) {
      return;
    }

    event.preventDefault();

    const soporteData = getFormData(form);
    const result = soporteData.id
      ? updateSoporte(soporteData.id, soporteData)
      : createSoporte(soporteData);

    if (!result.ok) {
      state.errors = result.errors;
      rerender();
      return;
    }

    state.editingSoporteId = null;
    state.errors = {};
    rerender();
  });

  container.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-soporte-edit]");
    const deleteButton = event.target.closest("[data-soporte-delete]");
    const cancelButton = event.target.closest("[data-soporte-cancel]");

    if (editButton) {
      state.editingSoporteId = editButton.dataset.soporteEdit;
      state.errors = {};
      rerender();
      return;
    }

    if (deleteButton) {
      const soporteId = deleteButton.dataset.soporteDelete;
      deleteSoporte(soporteId);

      if (state.editingSoporteId === soporteId) {
        state.editingSoporteId = null;
      }

      state.errors = {};
      rerender();
      return;
    }

    if (cancelButton) {
      state.editingSoporteId = null;
      state.errors = {};
      rerender();
    }
  });
};

export const resetSoporteState = () => {
  state.editingSoporteId = null;
  state.errors = {};
};
