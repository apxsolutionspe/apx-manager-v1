import { getDashboardData } from "./dashboardService.js";
import { renderDashboardModule } from "./dashboardView.js";

export const renderDashboard = () => renderDashboardModule(getDashboardData());
