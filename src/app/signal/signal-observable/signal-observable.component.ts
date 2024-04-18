import { Component } from '@angular/core';
import { Observable, interval, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signal-observable',
  standalone: true,
  imports: [],
  templateUrl: './signal-observable.component.html',
  styleUrl: './signal-observable.component.scss'
})
export class SignalObservableComponent {

  signal = toSignal(
    interval(1000)
    .pipe(
      tap(() => console.log('tick')),
      map(() => new Date())
    ));

}


