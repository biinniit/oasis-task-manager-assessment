import { Component } from '@angular/core'

import { TaskComponent } from './task/task.component'

@Component({
  selector: 'app-root',
  imports: [TaskComponent],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
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
