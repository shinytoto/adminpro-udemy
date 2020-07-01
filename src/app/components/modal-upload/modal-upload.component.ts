import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';

// Services
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {}

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

  subirImagen() {
    this._subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this._modalUploadService.tipo,
        this._modalUploadService.id
      )
      .then((response) => {
        console.log(response);

        this._modalUploadService.notificacion.emit(response);
        this.cerrarModal();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }
}
