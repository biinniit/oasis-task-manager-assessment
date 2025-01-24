import { Component, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { merge } from 'rxjs'
import { oneLowercase, oneNumeric, oneSpecial, oneUppercase } from './password-strength.directive'

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div id="register-container" class="row d-flex justify-content-center">
      <mat-card class="col col-md-9 col-lg-8 col-xl-6 p-3 p-md-5 m-3">
        <form id="register-form" novalidate="novalidate" autocomplete="on">
          <mat-card-header class="justify-content-center mb-5">
            <mat-card-title>Create an account</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Given name</mat-label>
              <input
                matInput
                type="text"
                [formControl]="givenName"
                (blur)="updateGivenNameError()"
                placeholder="John"
                required />
              @if (givenName.invalid) {
                <mat-error>{{ givenNameError() }}</mat-error>
              }
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Middle name</mat-label>
              <input matInput type="text" [formControl]="middleName" />
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Family name</mat-label>
              <input
                matInput
                type="text"
                [formControl]="familyName"
                (blur)="updateFamilyNameError()"
                placeholder="Doe"
                required />
              @if (familyName.invalid) {
                <mat-error>{{ familyNameError() }}</mat-error>
              }
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                [formControl]="email"
                (blur)="updateEmailError()"
                placeholder="user@example.com"
                required />
              @if (email.invalid) {
                <mat-error>{{ emailError() }}</mat-error>
              }
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Password</mat-label>
              <input
                matInput
                [type]="passwordVisible ? 'text' : 'password'"
                [formControl]="password"
                (blur)="updatePasswordError()"
                placeholder="A strong password"
                required />
              <button
                matSuffix
                mat-icon-button
                type="button"
                (click)="passwordVisible = !passwordVisible"
                aria-label="Show password">
                <mat-icon>{{ passwordVisible ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (password.invalid) {
                <mat-error>{{ passwordError() }}</mat-error>
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
  readonly givenName = new FormControl('', Validators.required)
  givenNameError = signal('')
  readonly middleName = new FormControl('')
  readonly familyName = new FormControl('', Validators.required)
  familyNameError = signal('')
  readonly email = new FormControl('', [Validators.required, Validators.email])
  emailError = signal('')
  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    oneUppercase,
    oneLowercase,
    oneSpecial,
    oneNumeric
  ])
  passwordError = signal('')

  passwordVisible = false

  constructor() {
    merge(this.givenName.statusChanges, this.givenName.valueChanges).subscribe(() =>
      this.updateGivenNameError()
    )
    merge(this.familyName.statusChanges, this.familyName.valueChanges).subscribe(() =>
      this.updateFamilyNameError()
    )
    merge(this.email.statusChanges, this.email.valueChanges).subscribe(() => this.updateEmailError())
    merge(this.password.statusChanges, this.password.valueChanges).subscribe(() => this.updatePasswordError())
  }

  updateGivenNameError() {
    if (this.givenName.hasError('required')) this.givenNameError.set('Please provide your name')
    else this.givenNameError.set('')
  }

  updateFamilyNameError() {
    if (this.familyName.hasError('required')) this.familyNameError.set('Please provide your name')
    else this.familyNameError.set('')
  }

  updateEmailError() {
    if (this.email.hasError('required')) this.emailError.set('You must provide an email address')
    else if (this.email.hasError('email')) this.emailError.set('Not a valid email')
    else this.emailError.set('')
  }

  updatePasswordError() {
    if (this.password.hasError('required')) this.passwordError.set('You must provide a password')
    else if (this.password.hasError('minlength')) this.passwordError.set('Your password is not long enough')
    else if (this.password.hasError('oneUppercase')) this.passwordError.set('At least 1 uppercase character')
    else if (this.password.hasError('oneLowercase')) this.passwordError.set('At least 1 lowercase character')
    else if (this.password.hasError('oneSpecial'))
      this.passwordError.set('At least 1 special character, like !@#$&*')
    else if (this.password.hasError('oneNumeric')) this.passwordError.set('At least 1 number')
    else if (this.password.hasError('weakPassword')) this.passwordError.set('Your password is weak')
    else this.passwordError.set('')
  }
}
