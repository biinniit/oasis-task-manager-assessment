import { Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { merge } from 'rxjs'
import { ApiError } from '../app.model'
import { AuthService } from './auth.service'
import { equalTo, oneLowercase, oneNumeric, oneSpecial, oneUppercase } from './password.directive'

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
    <div id="registerContainer" class="row d-flex justify-content-center">
      <mat-card class="col col-md-9 col-lg-8 col-xl-6 p-3 p-md-5">
        <form id="registerForm" [formGroup]="registerForm" (ngSubmit)="onSubmit()" autocomplete="on">
          <mat-card-header class="justify-content-center mb-5">
            <mat-card-title>Create an account</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Given name</mat-label>
              <input
                matInput
                type="text"
                formControlName="givenName"
                (blur)="updateGivenNameError()"
                placeholder="John"
                required />
              @if (registerForm.get('givenName')!.invalid) {
                <mat-error>{{ givenNameError() }}</mat-error>
              }
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Middle name</mat-label>
              <input matInput type="text" formControlName="middleName" />
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Family name</mat-label>
              <input
                matInput
                type="text"
                formControlName="familyName"
                (blur)="updateFamilyNameError()"
                placeholder="Doe"
                required />
              @if (registerForm.get('familyName')!.invalid) {
                <mat-error>{{ familyNameError() }}</mat-error>
              }
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                formControlName="email"
                (blur)="updateEmailError()"
                placeholder="user@example.com"
                required />
              @if (registerForm.get('email')!.invalid) {
                <mat-error>{{ emailError() }}</mat-error>
              }
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Password</mat-label>
              <input
                matInput
                [type]="passwordVisible ? 'text' : 'password'"
                formControlName="password"
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
              @if (registerForm.get('password')!.invalid) {
                <mat-error>{{ passwordError() }}</mat-error>
              }
            </mat-form-field>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Reenter password</mat-label>
              <input
                matInput
                [type]="passwordConfirmationVisible ? 'text' : 'password'"
                formControlName="confirmPassword"
                (blur)="updatePasswordConfirmationError()"
                placeholder="Reenter your password"
                required />
              <button
                matSuffix
                mat-icon-button
                type="button"
                (click)="passwordConfirmationVisible = !passwordConfirmationVisible"
                aria-label="Show password">
                <mat-icon>{{ passwordConfirmationVisible ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (registerForm.get('confirmPassword')!.invalid) {
                <mat-error>{{ passwordConfirmationError() }}</mat-error>
              }
            </mat-form-field>
          </mat-card-content>
        </form>
      </mat-card>

      <!-- Force next columns to break to new line -->
      <div class="w-100 d-block"></div>

      <div class="col col-md-9 col-lg-8 col-xl-6 p-3 p-md-5 d-flex justify-content-center">
        <button
          mat-flat-button
          form="registerForm"
          type="submit"
          class="shadow-sm"
          [disabled]="registerForm.invalid">
          Sign up
        </button>
      </div>
    </div>
  `,
  styleUrls: []
})
export class RegisterComponent {
  readonly registerForm = new FormGroup({
    givenName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    familyName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      oneUppercase,
      oneLowercase,
      oneSpecial,
      oneNumeric
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  })
  givenNameError = signal('')
  familyNameError = signal('')
  emailError = signal('')
  passwordError = signal('')
  passwordConfirmationError = signal('')

  passwordVisible = false
  passwordConfirmationVisible = false

  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)
  private readonly snackBar = inject(MatSnackBar)

  constructor() {
    this.registerForm.get('confirmPassword')!.addValidators(equalTo(this.registerForm.get('password')!))

    merge(
      this.registerForm.get('givenName')!.statusChanges,
      this.registerForm.get('givenName')!.valueChanges
    ).subscribe(() => this.updateGivenNameError())
    merge(
      this.registerForm.get('familyName')!.statusChanges,
      this.registerForm.get('familyName')!.valueChanges
    ).subscribe(() => this.updateFamilyNameError())
    merge(
      this.registerForm.get('email')!.statusChanges,
      this.registerForm.get('email')!.valueChanges
    ).subscribe(() => this.updateEmailError())
    merge(
      this.registerForm.get('password')!.statusChanges,
      this.registerForm.get('password')!.valueChanges
    ).subscribe(() => {
      this.updatePasswordError()
      this.registerForm.get('confirmPassword')!.updateValueAndValidity()
    })
    merge(
      this.registerForm.get('confirmPassword')!.statusChanges,
      this.registerForm.get('confirmPassword')!.valueChanges
    ).subscribe(() => this.updatePasswordConfirmationError())
  }

  updateGivenNameError() {
    if (this.registerForm.get('givenName')!.hasError('required'))
      this.givenNameError.set('Please provide your name')
    else this.givenNameError.set('')
  }

  updateFamilyNameError() {
    if (this.registerForm.get('familyName')!.hasError('required'))
      this.familyNameError.set('Please provide your name')
    else this.familyNameError.set('')
  }

  updateEmailError() {
    const emailControl = this.registerForm.get('email')!
    if (emailControl.hasError('required')) this.emailError.set('You must provide an email address')
    else if (emailControl.hasError('email')) this.emailError.set('Not a valid email')
    else this.emailError.set('')
  }

  updatePasswordError() {
    const passwordControl = this.registerForm.get('password')!
    if (passwordControl.hasError('required')) this.passwordError.set('You must provide a password')
    else if (passwordControl.hasError('minlength')) this.passwordError.set('Your password is not long enough')
    else if (passwordControl.hasError('oneUppercase'))
      this.passwordError.set('At least 1 uppercase character')
    else if (passwordControl.hasError('oneLowercase'))
      this.passwordError.set('At least 1 lowercase character')
    else if (passwordControl.hasError('oneSpecial'))
      this.passwordError.set('At least 1 special character, like !@#$&*')
    else if (passwordControl.hasError('oneNumeric')) this.passwordError.set('At least 1 number')
    else if (passwordControl.hasError('weakPassword')) this.passwordError.set('Your password is weak')
    else this.passwordError.set('')
  }

  updatePasswordConfirmationError() {
    const passwordConfirmationControl = this.registerForm.get('confirmPassword')!
    if (passwordConfirmationControl.hasError('required'))
      this.passwordConfirmationError.set('You must reenter your password')
    else if (passwordConfirmationControl.hasError('equalTo'))
      this.passwordConfirmationError.set('Does not match provided password')
    else this.passwordConfirmationError.set('')
  }

  onSubmit() {
    this.auth
      .register({
        givenName: this.registerForm.get('givenName')!.value!,
        middleName: this.registerForm.get('middleName')!.value ?? undefined,
        familyName: this.registerForm.get('familyName')!.value!,
        email: this.registerForm.get('email')!.value!,
        password: this.registerForm.get('password')!.value!
      })
      .subscribe({
        next: (user) => this.router.navigateByUrl(AuthService.LOGIN_PATH),
        error: (err: ApiError) =>
          this.snackBar.open(`Could not sign up: ${err.error}`, undefined, {
            duration: 10000,
            panelClass: 'snack-bar-error',
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          })
      })
  }
}
