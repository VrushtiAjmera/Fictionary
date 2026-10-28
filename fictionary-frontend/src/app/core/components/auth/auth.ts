import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  readonly form: FormGroup;

  isSubmitting = false;
  credentialsError = '';

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  showError(control: AbstractControl<string>): boolean {
    return control.invalid && (control.touched || this.formSubmitted);
  }

  private formSubmitted = false;

  async submit(): Promise<void> {
    this.formSubmitted = true;
    this.credentialsError = '';
    this.form.markAllAsTouched();

    if (this.form.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      // Replace this placeholder with the authentication API when it is available.
      await new Promise((resolve) => setTimeout(resolve, 700));
      this.credentialsError = 'We couldn’t sign you in with those details. Check your email and password and try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}


