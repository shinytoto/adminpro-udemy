import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.regresarObservable().subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('El observador termino.')
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('La pagina se cerró');
    this.subscription.unsubscribe();
  }

  regresarObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador,
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Error');
        // }
      }, 750);
    }).pipe(
      map((resp) => resp.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }
}
