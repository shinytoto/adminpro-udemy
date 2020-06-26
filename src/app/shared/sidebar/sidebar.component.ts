import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

// Models
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
  ) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {}
}
