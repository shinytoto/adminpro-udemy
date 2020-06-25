import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}
}
