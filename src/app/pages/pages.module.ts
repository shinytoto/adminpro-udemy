import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

// Routes
import { PAGES_ROUTES } from './pages.routing';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
  ],
  imports: [CommonModule, SharedModule, PAGES_ROUTES],
  exports: [DashboardComponent, Graficas1Component, ProgressComponent],
  providers: [],
})
export class PagesModule {}
