import { Component, model, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInputModule } from '@angular/material/input'

import { PriorityIconComponent } from './priority-icon.component'
import { Priority } from './priority.enum'

@Component({
  selector: 'app-task',
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, FormsModule, PriorityIconComponent],
  template: `
    <div class="task-item">
      <mat-checkbox class="task-item-completed" [(ngModel)]="completed"></mat-checkbox>
      <input matInput type="text" [(ngModel)]="title" />
      <app-priority-icon [(priority)]="priority"></app-priority-icon>
    </div>
  `,
  styleUrls: []
})
export class TaskComponent {
  readonly completed = model(false)
  readonly title = model('Do laundry')
  readonly priority = signal<Priority>(Priority.LOW)
}
