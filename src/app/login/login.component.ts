import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_plugins();
declare const gapi: any;

// Services
import { UsuarioService } from '../services/usuario/usuario.service';

// Models
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean;
  email: string;
  auth2: any;

  constructor(private _router: Router, public _usuarioService: UsuarioService) {
    this.recuerdame = false;
  }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 3) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe((response) => {
        this._router.navigate(['/dashboard']);
      }),
      console.log(forma.value);

    // this._router.navigate(['/dashboard']);
  }

  // ? Google

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '423464119403-qickabsp5c7ml9ljgilang81cmutiunv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.googleLogin(token).subscribe((response) => {
        window.location.href = '#/dashboard';
      });

      console.log(token);
    });
  }

  // ? Google
}
