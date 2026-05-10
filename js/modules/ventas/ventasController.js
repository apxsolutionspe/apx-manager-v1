import {
  createVenta,
  deleteVenta,
  filterVentas,
  findClienteById,
  findServicioById,
  findVentaById,
  getClientes,
  getServicios,
  getVentas,
  updateVenta,
} from "./ventasService.js";
import { renderVentasModule } from "./ventasView.js";

const state = {
  filters: {
    fecha: "",
    clienteSearch: "",
  },
  editingVentaId: null,
  errors: {},
};

const getFormData = (form) => Object.fromEntries(new FormData(form).entries());

const notifySidebarSummaryChange = () => {
  window.dispatchEvent(new CustomEvent("apx:sidebar-summary-change"));
};

const getClienteName = (clienteId) => findClienteById(clienteId)?.nombre ?? "Cliente no encontrado";

const getServicioName = (servicioId) =>
  findServicioById(servicioId)?.nombreServicio ?? "Servicio no encontrado";

const getCurrentVentas = () => filterVentas(state.filters);

const getVentasSummary = () => {
  const ventas = getVentas();
  const clientes = getClientes();
  const todayKey = new Date().toISOString().slice(0, 10);
  const monthKey = todayKey.slice(0, 7);
  const ventasDelDia = ventas.filter((venta) => venta.fecha === todayKey);
  const ventasDelMes = ventas.filter((venta) => venta.fecha?.startsWith(monthKey));
  const totalVentas = ventas.reduce((total, venta) => total + Number(venta.montoTotal || 0), 0);

  return {
    ventasDia: ventasDelDia.reduce((total, venta) => total + Number(venta.montoTotal || 0), 0),
    ventasMes: ventasDelMes.reduce((total, venta) => total + Number(venta.montoTotal || 0), 0),
    clientesActivos: clientes.filter((cliente) => cliente.estado === "Activo").length,
    ticketPromedio: ventas.length > 0 ? totalVentas / ventas.length : 0,
  };
};

export const renderVentas = () =>
  renderVentasModule({
    ventas: getCurrentVentas(),
    clientes: getClientes(),
    servicios: getServicios(),
    summary: getVentasSummary(),
    editingVenta: state.editingVentaId ? findVentaById(state.editingVentaId) : null,
    filters: state.filters,
    errors: state.errors,
    getClienteName,
    getServicioName,
  });

export const mountVentas = (container) => {
  const rerender = () => {
    container.innerHTML = renderVentas();
  };

  container.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-ventas-form]");

    if (!form) {
      return;
    }

    event.preventDefault();

    const ventaData = getFormData(form);
    const result = ventaData.id ? updateVenta(ventaData.id, ventaData) : createVenta(ventaData);

    if (!result.ok) {
      state.errors = result.errors;
      rerender();
      return;
    }

    state.editingVentaId = null;
    state.errors = {};
    rerender();
    notifySidebarSummaryChange();
  });

  container.addEventListener("change", (event) => {
    const servicioSelect = event.target.closest("[data-venta-servicio-select]");
    const dateFilter = event.target.closest("[data-ventas-date-filter]");

    if (servicioSelect) {
      const selectedOption = servicioSelect.selectedOptions[0];
      const priceInput = container.querySelector('[name="precioUnitario"]');

      if (priceInput && selectedOption?.dataset.precioBase) {
        priceInput.value = selectedOption.dataset.precioBase;
      }
      return;
    }

    if (dateFilter) {
      state.filters.fecha = dateFilter.value;
      rerender();
    }
  });

  container.addEventListener("input", (event) => {
    const clientSearchInput = event.target.closest("[data-ventas-client-search]");

    if (!clientSearchInput) {
      return;
    }

    state.filters.clienteSearch = clientSearchInput.value;
    rerender();

    const nextSearchInput = container.querySelector("[data-ventas-client-search]");
    nextSearchInput?.focus();
    nextSearchInput?.setSelectionRange(state.filters.clienteSearch.length, state.filters.clienteSearch.length);
  });

  container.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-venta-edit]");
    const deleteButton = event.target.closest("[data-venta-delete]");
    const cancelButton = event.target.closest("[data-ventas-cancel]");

    if (editButton) {
      state.editingVentaId = editButton.dataset.ventaEdit;
      state.errors = {};
      rerender();
      notifySidebarSummaryChange();
      return;
    }

    if (deleteButton) {
      const ventaId = deleteButton.dataset.ventaDelete;
      deleteVenta(ventaId);

      if (state.editingVentaId === ventaId) {
        state.editingVentaId = null;
      }

      state.errors = {};
      rerender();
      return;
    }

    if (cancelButton) {
      state.editingVentaId = null;
      state.errors = {};
      rerender();
    }
  });
};

export const resetVentasState = () => {
  state.filters.fecha = "";
  state.filters.clienteSearch = "";
  state.editingVentaId = null;
  state.errors = {};
};
