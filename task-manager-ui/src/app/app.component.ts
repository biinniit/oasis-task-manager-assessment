import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { TaskComponent } from './task/task.component'

@Component({
  selector: 'app-root',
  imports: [TaskComponent, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <main>
      <header class="brand-name">
        <mat-toolbar class="justify-content-between">
          <div>
            <a href="/"><img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" /></a>
          </div>
          <div>
            <button mat-icon-button class="profile-button" aria-label="Profile icon">
              <mat-icon>account_circle</mat-icon>
            </button>
          </div>
        </mat-toolbar>
      </header>
      <section class="content">
        <app-task></app-task>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasks'
}
