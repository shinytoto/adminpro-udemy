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
      console.log('GUARD ACTIVADO.');
      return true;
    } else {
      console.log('BLOQUEO DE GUARD.');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
