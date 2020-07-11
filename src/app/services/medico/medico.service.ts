import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { URL_SERVICIOS } from '../../config/config';

// Services
import { UsuarioService } from '../usuario/usuario.service';

// Models
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  token: string;
  totalMedicos = 0;

  constructor(
    public _http: HttpClient,
    public _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';

    return this._http.get(url).pipe(
      map((response: any) => {
        this.totalMedicos = response.totalItems;
        return response.medicos;
      })
    );
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this._http.get(url).pipe(
      map((response: any) => {
        return response.medicos;
      })
    );
  }

  obtenerMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this._http.get(url).pipe(
      map((response: any) => {
        return response.medico;
      })
    );
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.token;

    return this._http.delete(url).pipe(
      map((response) => {
        swal('Médico Borrado', 'Médico borrado correctamente', 'success');

        return response;
      })
    );
  }

  crearMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this.token;

      return this._http.put(url, medico).pipe(
        map((response: any) => {
          swal('Médico Actualizado', medico.nombre, 'success');
          return response.medico;
        })
      );
    } else {
      // creando
      url += '?token=' + this.token;

      return this._http.post(url, medico).pipe(
        map((response: any) => {
          swal('Médico Creado', medico.nombre, 'success');
          return response.medico;
        })
      );
    }
  }
}
