import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { merge } from 'rxjs'

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
  template: `
    <div id="register-container" class="row d-flex justify-content-center">
      <mat-card class="col col-md-9 col-lg-8 col-xl-6 p-3 p-md-5 m-3">
        <form id="register-form" novalidate="novalidate" autocomplete="on">
          <mat-card-header class="justify-content-center mb-5">
            <mat-card-title>Create an account</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Email</mat-label>
              <input matInput type="email" [formControl]="email" placeholder="user@example.com" required />
              @if (email.invalid) {
                <mat-error>{{ emailError() }}</mat-error>
              }
            </mat-form-field>
          </mat-card-content>
        </form>
      </mat-card>
    </div>
  `,
  styleUrls: []
})
export class RegisterComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email])
  emailError = signal('')

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges).subscribe(() => this.updateErrorMessage())
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailError.set('You must provide an email address')
    } else if (this.email.hasError('email')) {
      this.emailError.set('Not a valid email')
    } else {
      this.emailError.set('')
    }
  }
}
