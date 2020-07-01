import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    private _router: Router
  ) {}

  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
