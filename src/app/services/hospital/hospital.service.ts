import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';

import { URL_SERVICIOS } from '../../config/config';

// Services
import { UsuarioService } from '../usuario/usuario.service';

// Models
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  token: string;
  totalHospitales = 0;

  constructor(
    private _http: HttpClient,
    public _usuarioService: UsuarioService
  ) {
    this.token = _usuarioService.token;
  }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';

    return this._http.get(url).pipe(
      map((response: any) => {
        this.totalHospitales = response.totalItems;
        return response.hospitales;
      })
    );
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this._http.get(url).pipe(
      map((response: any) => {
        return response.hospital;
      })
    );
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    url += '?token=' + this.token;

    return this._http.delete(url).pipe(
      map((response) => {
        swal(
          'Hospital Eliminado',
          'El hospital ha sido eliminado exitosamente!',
          'success'
        );
      })
    );
  }

  crearHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital';

    url += '?token=' + this.token;

    return this._http.post(url, hospital).pipe(
      map((response: any) => {
        return response.hospital;
      })
    );
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this._http.get(url).pipe(
      map((response: any) => {
        return response.hospitales;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;

    url += '?token=' + this.token;

    return this._http.put(url, hospital).pipe(
      map((response) => {
        swal(
          'Hospital Actualizado',
          'El hospital se ha actualizado exitosamente!',
          'success'
        );

        return true;
      })
    );
  }
}
