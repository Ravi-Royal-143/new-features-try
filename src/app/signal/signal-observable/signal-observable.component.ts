import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
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

  signal = toSignal(
    interval(1000)
      .pipe(
        tap(() => console.log('tick')),
        map(() => new Date())
      )
  );

  obsSignal$ = toObservable(this.signal);

}


