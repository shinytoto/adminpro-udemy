import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  SubirArchivoService,
  LoginGuardGuard,
  ModalUploadService,
  HospitalService,
  MedicoService,
} from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    ModalUploadService,
    HospitalService,
    MedicoService,
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ServiceModule {}
