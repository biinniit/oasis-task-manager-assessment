import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <main>
      <header class="brand-name">
        <mat-toolbar class="justify-content-between">
          <div>
            <a href="/"><img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" /></a>
          </div>

          <div>
            @if (isLoggedIn) {
              <button mat-icon-button class="profile-button" aria-label="Profile icon">
                <mat-icon>account_circle</mat-icon>
              </button>
            } @else {
              <a mat-button routerLink="/sign-up" routerLinkActive="active" ariaCurrentWhenActive="page"
                >Sign up</a
              >
              <a mat-flat-button routerLink="/login" routerLinkActive="active" ariaCurrentWhenActive="page"
                >Login</a
              >
            }
          </div>
        </mat-toolbar>
      </header>
      <section class="container-fluid m-0 pt-5">
        <router-outlet />
      </section>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasks'
  isLoggedIn: boolean | null

  constructor() {
    this.isLoggedIn = false
  }
}
