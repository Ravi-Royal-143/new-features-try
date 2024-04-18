import { AsyncPipe } from '@angular/common';
import { Component, effect } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, tap } from 'rxjs';

@Component({
  selector: 'app-signal-observable',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './signal-observable.component.html',
  styleUrl: './signal-observable.component.scss'
})
export class SignalObservableComponent {

  items = [1, 2, 3, 4, 5];

  signal = toSignal(
    interval(1000)
      .pipe(
        tap(() => console.log('tick')),
        // map(() => new Date())
      )
    , { initialValue: 0 });

  obsSignal$ = toObservable(this.signal);

}


