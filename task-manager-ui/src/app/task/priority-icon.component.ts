import { Component, model } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Priority } from './priority.enum'

@Component({
  selector: 'app-priority-icon',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button matSuffix mat-icon-button [class]="priority()" type="button">
      <mat-icon>{{ getIcon() }}</mat-icon>
    </button>
  `,
  styleUrls: ['./priority-icon.component.scss']
})
export class PriorityIconComponent {
  priority = model<Priority>(Priority.LOW)

  getIcon(): string {
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
