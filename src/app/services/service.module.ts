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
  ],
  imports: [CommonModule, HttpClientModule],
})
export class ServiceModule {}
