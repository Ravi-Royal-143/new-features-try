import { Component, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-linked-signal',
  imports: [FormsModule],
  templateUrl: './linked-signal.component.html',
  styleUrl: './linked-signal.component.scss',
})
export class LinkedSignalComponent {
  celsius = signal<number>(0);

  fahrenheit = linkedSignal({
    source: this.celsius,
    computation: (celsius) => {
      return (celsius * 9) / 5 + 32;
    },
  });
}
