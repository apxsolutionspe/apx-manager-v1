import { localStorageService, STORAGE_COLLECTIONS } from "./localStorage.js";

const DEMO_FLAG = "isDemoData";

const toDate = (daysOffset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().slice(0, 10);
};

const withMeta = (record, createdOffset = 0) => ({
  ...record,
  [DEMO_FLAG]: true,
  createdAt: new Date(`${toDate(createdOffset)}T09:00:00`).toISOString(),
  updatedAt: new Date(`${toDate(createdOffset)}T09:00:00`).toISOString(),
});

const buildId = (prefix, index) => `${prefix}-${String(index).padStart(5, "0")}`;

const demoClientes = [
  ["Apex Retail SAC", "987654321", "contacto@apexretail.pe", "Av. Javier Prado 1240, Lima", "Empresa", "Activo"],
  ["Lucia Fernandez", "956321478", "lucia.fernandez@mail.com", "Calle Los Cedros 245, Surco", "Persona", "Activo"],
  ["NovaTech Peru", "944785632", "soporte@novatech.pe", "Av. Arequipa 3450, San Isidro", "Empresa", "Activo"],
  ["Municipalidad San Borja", "014785632", "sistemas@sanborja.gob.pe", "Av. Joaquin Madrid 200, San Borja", "Gobierno", "Activo"],
  ["Carlos Mendoza", "965874123", "carlos.mendoza@mail.com", "Jr. Las Flores 310, Lince", "Persona", "Prospecto"],
  ["Innova Print SAC", "933214587", "operaciones@innovaprint.pe", "Av. Colonial 1800, Callao", "Empresa", "Activo"],
  ["Mariana Torres", "977441258", "mariana.torres@mail.com", "Calle Las Gardenias 520, Miraflores", "Persona", "Activo"],
  ["DataCorp Solutions", "922658741", "admin@datacorp.pe", "Av. La Marina 2300, Pueblo Libre", "Empresa", "Activo"],
  ["Colegio Horizonte", "014444555", "ti@colegiohorizonte.edu.pe", "Av. Brasil 1320, Jesus Maria", "Otro", "Activo"],
  ["Raul Paredes", "988774411", "raul.paredes@mail.com", "Jr. Amazonas 840, Lima", "Persona", "Inactivo"],
].map(([nombre, telefono, correo, direccion, tipoCliente, estado], index) =>
  withMeta(
    {
      id: buildId("CLI", index + 1),
      nombre,
      telefono,
      correo,
      direccion,
      tipoCliente,
      fechaRegistro: toDate(-18 + index),
      estado,
      observaciones: "Registro demo para pruebas visuales.",
    },
    -18 + index,
  ),
);

const demoServicios = [
  ["Mantenimiento preventivo PC", "Mantenimiento", "Limpieza, optimizacion y revision general.", 120, 35, "Activo"],
  ["Formateo e instalacion Windows", "Tecnico", "Instalacion de sistema operativo y drivers.", 150, 45, "Activo"],
  ["Instalacion de red local", "Instalacion", "Cableado, configuracion basica y pruebas.", 480, 180, "Activo"],
  ["Soporte remoto mensual", "Consultoria", "Bolsa de soporte remoto para incidencias.", 350, 80, "Activo"],
  ["Reparacion de laptop", "Tecnico", "Diagnostico y reparacion de fallas comunes.", 220, 90, "Activo"],
  ["Configuracion de impresora", "Instalacion", "Conexion, drivers y pruebas de impresion.", 95, 20, "Activo"],
  ["Auditoria tecnologica", "Consultoria", "Evaluacion de equipos, red y seguridad.", 650, 180, "Activo"],
  ["Backup y recuperacion", "Mantenimiento", "Respaldo, restauracion y validacion de datos.", 280, 70, "Activo"],
  ["Instalacion de software", "Tecnico", "Instalacion y configuracion de aplicaciones.", 90, 18, "Activo"],
  ["Servicio express", "Otro", "Atencion prioritaria para incidencias urgentes.", 180, 55, "Inactivo"],
].map(([nombreServicio, categoria, descripcion, precioBase, costoEstimado, estado], index) =>
  withMeta(
    {
      id: buildId("SER", index + 1),
      nombreServicio,
      categoria,
      descripcion,
      precioBase,
      costoEstimado,
      gananciaEstimada: precioBase - costoEstimado,
      estado,
    },
    -15 + index,
  ),
);

const paymentMethods = ["Efectivo", "Yape/Plin", "Transferencia", "Tarjeta", "Efectivo"];
const saleStates = ["Pagado", "Pendiente", "Parcial", "Pagado", "Pagado"];

const demoVentas = Array.from({ length: 10 }, (_, index) => {
  const cantidad = index % 3 === 0 ? 2 : 1;
  const servicio = demoServicios[index];
  const precioUnitario = servicio.precioBase;

  return withMeta(
    {
      id: buildId("VEN", index + 1),
      fecha: toDate(index < 3 ? 0 : -index),
      clienteId: buildId("CLI", (index % 10) + 1),
      servicioId: buildId("SER", (index % 10) + 1),
      descripcion: `Venta demo: ${servicio.nombreServicio}`,
      cantidad,
      precioUnitario,
      montoTotal: cantidad * precioUnitario,
      metodoPago: paymentMethods[index % paymentMethods.length],
      estadoPago: saleStates[index % saleStates.length],
      observaciones: "Venta generada para pruebas.",
    },
    -index,
  );
});

const demoGastos = [
  ["Compra de cable UTP", "Materiales", 145, "Efectivo", "B001-102"],
  ["Pago de internet oficina", "Internet", 189, "Transferencia", "F001-221"],
  ["Licencia antivirus", "Software", 260, "Tarjeta", "F002-118"],
  ["Movilidad tecnica", "Transporte", 48, "Yape/Plin", "S/N"],
  ["Memoria RAM DDR4", "Equipos", 220, "Transferencia", "B001-140"],
  ["Campana redes sociales", "Publicidad", 180, "Tarjeta", "F003-081"],
  ["Mantenimiento herramientas", "Mantenimiento", 95, "Efectivo", "B002-210"],
  ["Adaptadores HDMI", "Materiales", 72, "Yape/Plin", "S/N"],
  ["Hosting mensual", "Software", 110, "Transferencia", "F004-333"],
  ["Otros insumos", "Otros", 65, "Efectivo", "S/N"],
].map(([concepto, categoria, monto, metodoPago, comprobante], index) =>
  withMeta(
    {
      id: buildId("GAS", index + 1),
      fecha: toDate(index < 2 ? 0 : -index),
      concepto,
      categoria,
      monto,
      metodoPago,
      comprobante,
      observaciones: "Gasto demo para validacion.",
    },
    -index,
  ),
);

const orderStates = ["Pendiente", "En proceso", "Terminado", "Entregado", "Cancelado"];
const priorities = ["Baja", "Media", "Alta", "Urgente"];

const demoOrdenes = Array.from({ length: 10 }, (_, index) => {
  const montoEstimado = [220, 350, 480, 150, 650, 280, 120, 390, 180, 520][index];
  const adelanto = [50, 100, 180, 0, 300, 80, 40, 150, 60, 200][index];

  return withMeta(
    {
      id: buildId("ORD", index + 1),
      fecha: toDate(-index),
      clienteId: buildId("CLI", (index % 10) + 1),
      tipoServicio: demoServicios[index].nombreServicio,
      descripcionTrabajo: `Orden demo para ${demoServicios[index].nombreServicio.toLowerCase()}.`,
      montoEstimado,
      adelanto,
      saldo: montoEstimado - adelanto,
      fechaEntrega: toDate(index + 2),
      estado: orderStates[index % orderStates.length],
      prioridad: priorities[index % priorities.length],
      observaciones: "Seguimiento operativo demo.",
    },
    -index,
  );
});

const equipmentTypes = ["Laptop", "Desktop", "Impresora", "Servidor", "Red", "Movil", "Laptop", "Desktop", "Impresora", "Otro"];
const equipmentStates = ["Bueno", "Regular", "Dañado", "Incompleto", "Bueno", "Regular", "Bueno", "Dañado", "Regular", "Bueno"];

const demoEquipos = Array.from({ length: 10 }, (_, index) =>
  withMeta(
    {
      id: buildId("EQP", index + 1),
      fechaRecepcion: toDate(-index),
      clienteId: buildId("CLI", (index % 10) + 1),
      tipoEquipo: equipmentTypes[index],
      marca: ["Lenovo", "HP", "Epson", "Dell", "TP-Link", "Samsung", "Asus", "Acer", "Canon", "Generico"][index],
      modelo: ["ThinkPad E14", "ProDesk 400", "L3250", "PowerEdge T40", "Archer C6", "Galaxy A54", "VivoBook", "Aspire TC", "G3110", "POS-100"][index],
      serie: `APX-DEMO-${String(index + 1).padStart(4, "0")}`,
      accesorios: ["Cargador", "Cable poder", "Cable USB", "Cable red", "Adaptador", "Funda", "Mouse", "Teclado", "Cable poder", "Base"][index],
      estadoFisico: equipmentStates[index],
      problemaReportado: [
        "Equipo lento y con ruido.",
        "No enciende correctamente.",
        "No imprime a color.",
        "Requiere revision de disco.",
        "Perdida intermitente de senal.",
        "Pantalla con fallas tactiles.",
        "Actualizacion y limpieza.",
        "Fuente con falla.",
        "Atasco frecuente de papel.",
        "Revision general.",
      ][index],
      observaciones: "Equipo demo recibido para seguimiento.",
    },
    -index,
  ),
);

const supportStates = ["Recibido", "Diagnosticado", "En reparación", "Listo", "Entregado", "Sin solución"];

const demoSoporte = Array.from({ length: 10 }, (_, index) => {
  const costoServicio = [90, 120, 75, 160, 220, 130, 95, 180, 110, 150][index];
  const costoRepuestos = [35, 0, 45, 80, 120, 0, 25, 150, 60, 40][index];

  return withMeta(
    {
      id: buildId("SOP", index + 1),
      fecha: toDate(-index),
      clienteId: buildId("CLI", (index % 10) + 1),
      equipoId: buildId("EQP", (index % 10) + 1),
      diagnostico: "Diagnostico demo registrado para pruebas.",
      solucionAplicada: index % 3 === 0 ? "Limpieza, ajustes y pruebas finales." : "Pendiente de validacion tecnica.",
      costoServicio,
      costoRepuestos,
      total: costoServicio + costoRepuestos,
      estado: supportStates[index % supportStates.length],
      tecnicoResponsable: ["Diego Ruiz", "Ana Salas", "Marco Vega", "Patricia Leon"][index % 4],
      garantia: index % 2 === 0 ? "Sin garantia" : "Con garantia",
      observaciones: "Caso demo para control tecnico.",
    },
    -index,
  );
});

export const DEMO_DATA = {
  clientes: demoClientes,
  servicios: demoServicios,
  ventas: demoVentas,
  gastos: demoGastos,
  ordenes: demoOrdenes,
  equipos: demoEquipos,
  soporte: demoSoporte,
};

const withoutDemoData = (collectionName) =>
  localStorageService.getAll(collectionName).filter((record) => record?.[DEMO_FLAG] !== true);

export const loadDemoData = () => {
  Object.keys(STORAGE_COLLECTIONS).forEach((collectionName) => {
    const currentRecords = withoutDemoData(collectionName);
    localStorageService.saveAll(collectionName, [...currentRecords, ...DEMO_DATA[collectionName]]);
  });
};

export const clearDemoData = () => {
  Object.keys(STORAGE_COLLECTIONS).forEach((collectionName) => {
    localStorageService.saveAll(collectionName, withoutDemoData(collectionName));
  });
};
