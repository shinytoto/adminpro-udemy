import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

// Modules
import { SharedModule } from '../shared/shared.module';

// Routes
import { PAGES_ROUTES } from './pages.routing';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    SharedModule,
    PAGES_ROUTES,
  ],
  exports: [DashboardComponent, Graficas1Component, ProgressComponent],
  providers: [],
})
export class PagesModule {}
