import { JsonPipe } from '@angular/common';
import { Component, resource, signal } from '@angular/core';
import { email, form, FormField, required, validate, validateAsync } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-signal-form',
  imports: [
    FormField,
    JsonPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './signal-form.component.html',
  styleUrl: './signal-form.component.scss',
})
export class SignalFormComponent {
  personalDetails = signal({
    firstName: 'Ravi',
    lastName: 'Kumar',
    email: 'ravi.kumar@gmail.com',
    age: 0,
  });

  personalDetailForm = form(this.personalDetails, (form) => {
    required(form.firstName, { message: 'First name is required' });
    required(form.lastName, { message: 'Last name is required' });
    required(form.email, { message: 'Email address is required' });
    email(form.email, { message: 'Please enter a valid email address' });
    required(form.age, { message: 'Age is required' });
    validate(form.age, ({ value }) => {
      if (value() < 18) {
        return { message: 'Age must be at least 18', kind: 'age-must-be-18' };
      }
      return null;
    });
    validateAsync(form.firstName, {
      params: ({ value }) => value(),
      factory: (nameSignal) =>
        resource({
          params: nameSignal,
          loader: async ({ params }) => {
            return await this.mockfirstNameAPI(params);
          },
        }),
      onSuccess: (valuePresent) => {
        if (valuePresent) {
          return {
            message: 'Name is so already taken, please try another one!',
            kind: 'name-exists',
          };
        }
        return null;
      },
      onError: () => {
        return { message: 'Error in async validation', kind: 'async-error' };
      },
    });
  });

  async mockfirstNameAPI(value: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const valuePresent = ['ravi', 'royal'].includes(value);
    return valuePresent;
  }

  resetForm() {
    this.personalDetails.set({
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
    });
  }

  loadDemo(firstName: string, lastName: string, email: string, age: number) {
    this.personalDetails.set({
      firstName,
      lastName,
      email,
      age,
    });
  }
}
