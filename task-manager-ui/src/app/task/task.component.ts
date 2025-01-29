import { Component, computed, model } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'

import { MatIconModule } from '@angular/material/icon'
import { Priority, Task } from './task.model'

@Component({
  selector: 'app-task',
  imports: [FormsModule, MatButtonModule, MatCheckboxModule, MatIconModule],
  template: `
    @if (task()) {
      <div id="taskContainer" class="d-flex align-items-center focus-ring">
        <mat-checkbox [ngModel]="task().completed"></mat-checkbox>
        <input
          type="text"
          class="flex-grow-1 bg-transparent border border-0"
          id="taskTitle"
          [ngModel]="task().title" />
        <button mat-icon-button type="button" class="lg-icon-button {{ priority() ?? '' }}">
          <mat-icon>{{ priorityIcon() }}</mat-icon>
        </button>
      </div>
    }
  `,
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task = model.required<Task>()
  priority = computed(() => this.task().priority)

  priorityIcon(): string {
    switch (this.priority()) {
      case Priority.HIGH:
        return 'arrow_drop_up'
      case Priority.MEDIUM:
        return 'horizontal_rule'
      case Priority.LOW:
        return 'arrow_drop_down'
      default:
        return ''
    }
  }
}
