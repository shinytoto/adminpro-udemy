import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { MedicoService } from '../../services/service.index';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../services/service.index';

// Models
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    private _router: Router,
    private _route: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    this._route.params.subscribe((params) => {
      const id = params.id;

      if (id !== 'nuevo') {
        this.obtenerMedico(id);
      }
    });
  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales().subscribe(
      (response) => {
        this.hospitales = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this._modalUploadService.notificacion.subscribe((response) => {
      this.medico.img = response.medico.img;
    });
  }

  guardarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this._medicoService.crearMedico(this.medico).subscribe(
      (response: any) => {
        this.medico._id = response._id;
        this._router.navigate(['/medico', response._id]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id).subscribe(
      (response) => {
        this.hospital = response;
      },
      (error) => {
        error;
      }
    );
  }

  obtenerMedico(id: string) {
    this._medicoService.obtenerMedico(id).subscribe(
      (response) => {
        this.medico = response;
        this.medico.hospital = response.hospital._id;
        this.cambioHospital(this.medico.hospital);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
