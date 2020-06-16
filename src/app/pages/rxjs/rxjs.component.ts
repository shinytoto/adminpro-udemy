import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit {
  constructor() {
    const obs = new Observable((observer) => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador += 1;

        observer.next(contador);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        // if (contador === 2) {
        //   observer.error('Error');
        // }
      }, 500);
    });

    obs.subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('El observador termino.')
    );
  }

  ngOnInit(): void {}
}
