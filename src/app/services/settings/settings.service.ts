import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public ajustes: Ajustes = {
    tema: 'default',
    temaUrl: 'assets/css/colors/default.css',
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('tema', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('tema')) {
      this.ajustes = JSON.parse(localStorage.getItem('tema'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  tema: string;
  temaUrl: string;
}
