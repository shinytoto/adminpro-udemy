import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

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
      { path: 'profile', component: ProfileComponent, data: {title: 'Perfil de Usuario', description: 'Perfil del usuario.'}},
       // * Mantenimientos
      { path: 'usuarios', component: UsuariosComponent,
       data: {title: 'Mantenimiento de Usuarios', description: 'Mantenimiento de usuarios de la aplicación.'}},
      { path: 'hospitales', component: HospitalesComponent,
        data: {title: 'Mantenimiento de Hospitales', description: 'Mantenimiento de hospitales de la aplicación.'}},
      { path: 'medicos', component: MedicosComponent,
        data: {title: 'Mantenimiento de Médicos', description: 'Mantenimiento de médicos de la aplicación.'}},
      { path: 'medico/:id', component: MedicoComponent,
        data: {title: 'Actualizar Médico', description: 'Actualizar un médico de la aplicación.'}},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
