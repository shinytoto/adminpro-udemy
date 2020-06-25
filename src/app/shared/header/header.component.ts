import { Component, OnInit } from '@angular/core';

// Services
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(public _usuarioService: UsuarioService) {}

  ngOnInit(): void {}
}
