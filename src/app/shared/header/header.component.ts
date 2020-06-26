import { Component, OnInit } from '@angular/core';

// Services
import { UsuarioService } from '../../services/service.index';

// Models
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {}
}
