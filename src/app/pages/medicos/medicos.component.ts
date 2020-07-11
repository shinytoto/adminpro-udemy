import { Component, OnInit } from '@angular/core';

// Services
import { MedicoService } from '../../services/medico/medico.service';

// Models
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  totalRegistros = 0;
  cargando = true;

  constructor(public _medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;

    this._medicoService.cargarMedicos().subscribe(
      (response) => {
        this.totalRegistros = this._medicoService.totalMedicos;
        this.medicos = response;
        this.cargando = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.buscarMedicos(termino).subscribe(
      (response: any) => {
        this.medicos = response;
        this.cargando = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id).subscribe(
      (response) => {
        this.cargarMedicos();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
