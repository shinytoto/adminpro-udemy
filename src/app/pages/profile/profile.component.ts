import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';

// Services
import { UsuarioService } from '../../services/service.index';

// Models
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {}

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal(
        'Solo imágenes',
        'El archivo seleccionado no es una imagen.',
        'error'
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
