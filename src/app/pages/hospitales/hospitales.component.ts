import { Component, OnInit } from '@angular/core';

declare var swal: any;

// Services
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// Models
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  hospital: Hospital;

  totalRegistros = 0;
  cargando = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(
      (response) => {
        this.cargarHospitales();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService.cargarHospitales().subscribe(
      (response: any) => {
        this.totalRegistros = this._hospitalService.totalHospitales;
        this.hospitales = response;
        this.cargando = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cargarHospital(id: string) {
    this.cargando = true;

    this._hospitalService.obtenerHospital(id).subscribe(
      (response: any) => {
        this.hospital = response.hospital;
        this.cargando = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital(termino).subscribe(
      (response: any) => {
        this.hospitales = response;
        this.cargando = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarHospital(id: string) {
    swal({
      title: '¿Estas Seguro?',
      text: 'Esta a punto de borrar el hospital',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((borrar) => {
      if (borrar) {
        this._hospitalService.borrarHospital(id).subscribe(
          (response) => {
            this.cargarHospitales();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Escribe el nombre del hospital a crear.',
      content: 'input',
      buttons: true,
      dangerMode: true,
    }).then((nombre: string) => {
      if (!nombre || nombre.length === 0) {
        return;
      }
      const hospitalcrear = new Hospital(nombre);
      this._hospitalService.crearHospital(hospitalcrear).subscribe(
        (response) => {
          swal(
            'Hospital Creado',
            'El hospital ha sido creado exitosamente!',
            'success'
          );
          this.cargarHospitales();
        },
        (error) => {
          console.log(error);
          swal('Error al crear Hospital', 'Error en el servidor', 'error');
          this.cargarHospitales();
        }
      );
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }
}
