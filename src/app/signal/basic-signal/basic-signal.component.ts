import { Component, computed, effect, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-basic-signal',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './basic-signal.component.html',
  styleUrl: './basic-signal.component.scss',
})
export class BasicSignalComponent {
  query = signal('');
  search = signal('');

  computedQuery = computed(() => {
    return `query is ${this.query()}`;
  });

  computedSearch = computed(() => {
    return `search is ${this.search()}`;
  });

  consolidatedQueryandSearch = computed(() => {
    return `query: ${this.query()}, search: ${this.search()}`;
  });

  printing = computed(() => {
    console.log('priting:', this.consolidatedQueryandSearch());
  });

  constructor() {
    // effect(() => {
    //   console.log('query:', this.query());
    // });
    // effect(() => {
    //   console.log('search:', this.search());
    // });
    // effect(() => {
    //   console.log('consolidatedQueryandSearch:', this.consolidatedQueryandSearch());
    // });
    effect(() => {
      this.query();
      // this.printing();
      untracked(() => {
        this.printing();
        // console.log('printing:', this.printing());
      });
    });
  }
}
