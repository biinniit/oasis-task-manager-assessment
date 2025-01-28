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

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div id="loginContainer" class="row d-flex justify-content-center">
      <mat-card class="col col-md-9 col-lg-8 col-xl-6 p-3 p-md-5">
        <form id="loginForm" [formGroup]="loginForm" (ngSubmit)="onSubmit()" autocomplete="on">
          <mat-card-header class="justify-content-center mb-5">
            <mat-card-title>Login</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field class="mb-3 w-100">
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                formControlName="email"
                (blur)="updateEmailError()"
                placeholder="user@example.com"
                required />
              @if (loginForm.get('email')!.invalid) {
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
                required />
              <button
                matSuffix
                mat-icon-button
                type="button"
                (click)="passwordVisible = !passwordVisible"
                aria-label="Show password">
                <mat-icon>{{ passwordVisible ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              @if (loginForm.get('password')!.invalid) {
                <mat-error>{{ passwordError() }}</mat-error>
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
          form="loginForm"
          type="submit"
          class="shadow-sm"
          [disabled]="loginForm.invalid">
          Login
        </button>
      </div>
    </div>
  `,
  styleUrls: []
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  emailError = signal('')
  passwordError = signal('')

  passwordVisible = false

  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)
  private readonly snackBar = inject(MatSnackBar)

  constructor() {
    merge(this.loginForm.get('email')!.statusChanges, this.loginForm.get('email')!.valueChanges).subscribe(
      () => this.updateEmailError
    )
    merge(
      this.loginForm.get('password')!.statusChanges,
      this.loginForm.get('password')!.valueChanges
    ).subscribe(() => this.updatePasswordError())
  }

  updateEmailError() {
    const emailControl = this.loginForm.get('email')!
    if (emailControl.hasError('required')) this.emailError.set('You must provide an email address')
    else if (emailControl.hasError('email')) this.emailError.set('Not a valid email')
    else this.emailError.set('')
  }

  updatePasswordError() {
    if (this.loginForm.get('password')!.hasError('required'))
      this.passwordError.set('You must provide a password')
    else this.passwordError.set('')
  }

  onSubmit() {
    this.auth
      .login({
        email: this.loginForm.get('email')!.value!,
        password: this.loginForm.get('password')!.value!
      })
      .subscribe({
        next: () => this.router.navigateByUrl(AuthService.INITIAL_PATH),
        error: (err: ApiError) =>
          this.snackBar.open(`Could not login: ${err.error}`, undefined, {
            duration: 10000,
            panelClass: 'snack-bar-error',
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          })
      })
  }
}
