import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatTabsModule } from '@angular/material/tabs'
import { TaskComponent } from '../task/task.component'
import { Task } from '../task/task.model'
import { TaskService } from '../task/task.service'
import { CategoryService } from './category.service'
import { TaskCategory } from './task-category.model'

@Component({
  selector: 'app-dashboard',
  imports: [
    TaskComponent,
    MatCardModule,
    MatTabsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  template: `
    <div id="dashboardContainer" class="row d-flex justify-content-center">
      <mat-card class="col col-md-9 col-lg-8 col-xl-6 p-3">
        @if (taskCategories.length === 0) {
          <mat-progress-bar mode="query" class="py-5"></mat-progress-bar>
        } @else {
          <mat-tab-group
            [selectedIndex]="currentIdx()"
            (selectedIndexChange)="onTabChange($event)"
            dynamicHeight>
            @for (category of taskCategories; track category.id; let i = $index) {
              <mat-tab [label]="category.title">
                <ng-template matTabContent>
                  <div class="d-flex justify-content-end my-1">
                    <button mat-icon-button [matMenuTriggerFor]="categoryMenu">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu #categoryMenu xPosition="before" yPosition="below">
                      <button mat-menu-item>
                        <mat-icon class="sm-icon">edit</mat-icon><span>Rename category</span>
                      </button>
                      <button mat-menu-item [disabled]="taskCategories.length <= 1">
                        <mat-icon>delete</mat-icon><span>Delete category</span>
                      </button>
                      <button mat-menu-item [disabled]="!hasCompletedTasks(i)">
                        <mat-icon>clear_all</mat-icon><span>Delete completed tasks</span>
                      </button>
                    </mat-menu>
                  </div>

                  @if (tasks[i].length > 0) {
                    @for (task of tasks[i]; track task().id) {
                      <app-task [(task)]="task"></app-task>
                    }
                  } @else {
                    <div class="d-flex flex-column align-items-center justify-content-center py-5">
                      <mat-icon class="fs-1" inline="true">cloud_off</mat-icon>
                      <p>No tasks found for this category</p>
                    </div>
                  }
                </ng-template>
              </mat-tab>
            }
            <mat-tab>
              <ng-template mat-tab-label> <mat-icon class="me-1">add</mat-icon> New Category </ng-template>
            </mat-tab>
          </mat-tab-group>
        }
      </mat-card>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  taskCategories: TaskCategory[] = []
  tasks: WritableSignal<Task>[][] = []
  currentIdx = signal(0)

  private readonly categoryService = inject(CategoryService)
  private readonly taskService = inject(TaskService)

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.taskCategories = categories
      this.tasks = Array.from(categories, (cat) => [])
      this.loadTasks(0)
    })
  }

  onTabChange(i: number) {
    this.currentIdx.set(i)
    if (this.tasks[i].length === 0) this.loadTasks(i)
  }

  loadTasks(i: number) {
    this.taskService.getBy(this.taskCategories[i]).subscribe((list) => {
      this.tasks[i] = list.map((t) => signal(t))
    })
  }

  hasCompletedTasks(i: number): boolean {
    return this.tasks[i].some((t) => t().completed)
  }
}
