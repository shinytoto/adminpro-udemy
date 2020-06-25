import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Guards
import { LoginGuardGuard } from '../services/guards/login-guard.guard';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard', description: 'Dashboard de la aplicación.'}},
      { path: 'graficas1', component: Graficas1Component, data: {title: 'Gráficas', description: 'Gráficas de donas.'}},
      { path: 'progress', component: ProgressComponent, data: {title: 'Progress', description: 'Barras de progreso.'}},
      { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas', description: 'Promesas.'}},
      { path: 'rxjs', component: RxjsComponent, data: {title: 'Observable', description: 'Observables.'}},
      { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Temas', description: 'Configuración de tema.'}},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
