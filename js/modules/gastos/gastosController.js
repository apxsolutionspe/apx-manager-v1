import {
  createGasto,
  deleteGasto,
  filterGastos,
  findGastoById,
  getGastos,
  updateGasto,
} from "./gastosService.js";
import { renderGastosModule } from "./gastosView.js";

const state = {
  filters: {
    fecha: "",
    categoria: "",
  },
  editingGastoId: null,
  errors: {},
};

const getFormData = (form) => Object.fromEntries(new FormData(form).entries());

const notifySidebarSummaryChange = () => {
  window.dispatchEvent(new CustomEvent("apx:sidebar-summary-change"));
};

const getCurrentGastos = () => filterGastos(state.filters);

const getGastosSummary = () => {
  const gastos = getGastos();
  const todayKey = new Date().toISOString().slice(0, 10);
  const monthKey = todayKey.slice(0, 7);
  const gastosDelDia = gastos.filter((gasto) => gasto.fecha === todayKey);
  const gastosDelMes = gastos.filter((gasto) => gasto.fecha?.startsWith(monthKey));
  const categoryCount = gastos.reduce((summary, gasto) => {
    summary[gasto.categoria] = (summary[gasto.categoria] ?? 0) + 1;
    return summary;
  }, {});
  const categoriaMasUsada = Object.entries(categoryCount).sort((first, second) => second[1] - first[1])[0]?.[0] ?? "Sin datos";

  return {
    gastosDia: gastosDelDia.reduce((total, gasto) => total + Number(gasto.monto || 0), 0),
    gastosMes: gastosDelMes.reduce((total, gasto) => total + Number(gasto.monto || 0), 0),
    categoriaMasUsada,
    ultimoGasto: gastos[0]?.monto ?? 0,
  };
};

export const renderGastos = () =>
  renderGastosModule({
    gastos: getCurrentGastos(),
    summary: getGastosSummary(),
    editingGasto: state.editingGastoId ? findGastoById(state.editingGastoId) : null,
    filters: state.filters,
    errors: state.errors,
  });

export const mountGastos = (container) => {
  const rerender = () => {
    container.innerHTML = renderGastos();
  };

  container.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-gastos-form]");

    if (!form) {
      return;
    }

    event.preventDefault();

    const gastoData = getFormData(form);
    const result = gastoData.id ? updateGasto(gastoData.id, gastoData) : createGasto(gastoData);

    if (!result.ok) {
      state.errors = result.errors;
      rerender();
      return;
    }

    state.editingGastoId = null;
    state.errors = {};
    rerender();
    notifySidebarSummaryChange();
  });

  container.addEventListener("change", (event) => {
    const dateFilter = event.target.closest("[data-gastos-date-filter]");
    const categoryFilter = event.target.closest("[data-gastos-category-filter]");

    if (dateFilter) {
      state.filters.fecha = dateFilter.value;
      rerender();
      return;
    }

    if (categoryFilter) {
      state.filters.categoria = categoryFilter.value;
      rerender();
    }
  });

  container.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-gasto-edit]");
    const deleteButton = event.target.closest("[data-gasto-delete]");
    const cancelButton = event.target.closest("[data-gastos-cancel]");

    if (editButton) {
      state.editingGastoId = editButton.dataset.gastoEdit;
      state.errors = {};
      rerender();
      notifySidebarSummaryChange();
      return;
    }

    if (deleteButton) {
      const gastoId = deleteButton.dataset.gastoDelete;
      deleteGasto(gastoId);

      if (state.editingGastoId === gastoId) {
        state.editingGastoId = null;
      }

      state.errors = {};
      rerender();
      return;
    }

    if (cancelButton) {
      state.editingGastoId = null;
      state.errors = {};
      rerender();
    }
  });
};

export const resetGastosState = () => {
  state.filters.fecha = "";
  state.filters.categoria = "";
  state.editingGastoId = null;
  state.errors = {};
};
