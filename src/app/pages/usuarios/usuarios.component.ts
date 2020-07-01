import { Component, OnInit } from '@angular/core';

declare var swal: any;

// Services
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// Model
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;

  totalRegistros = 0;
  cargando = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(
      (response) => {
        this.cargarUsuarios();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.obtenerUsuarios(this.desde).subscribe(
      (response: any) => {
        this.totalRegistros = response.totalItems;
        this.usuarios = response.usuarios;
        this.cargando = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino).subscribe(
      (response: any) => {
        this.usuarios = response.usuarios;
        this.cargando = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal(
        'No puede borrar usuario',
        'No te puedes borrar a si mismo',
        'error'
      );
      return;
    }

    swal({
      title: '¿Estas Seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((borrar) => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(
          (response) => {
            this.cargarUsuarios();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
