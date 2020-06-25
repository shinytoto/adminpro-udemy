import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { URL_SERVICIOS } from '../../config/config';
// Models
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public _http: HttpClient, private _router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this._http.post(url, usuario).pipe(
      map((response: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return response.usuario;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this._http.post(url, usuario).pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario);
        return true;
      })
    );
  }

  // ? Google
  googleLogin(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this._http.post(url, { token }).pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario);
        return true;
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token'), localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
  }
}
