import { Component, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-linked-signal',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
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
