import { Component, inject, OnInit, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatTabsModule } from '@angular/material/tabs'
import { CategoryService } from './category.service'
import { TaskCategory } from './task-category.model'

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTabsModule, MatProgressBarModule],
  template: `
    <div id="dashboardContainer" class="row d-flex justify-content-center">
      <mat-card class="col col-md-9 col-lg-8 col-xl-6 p-3">
        @if (taskCategories.length === 0) {
          <mat-progress-bar mode="query" class="py-5"></mat-progress-bar>
        } @else {
          <mat-tab-group
            [selectedIndex]="currentCategory()"
            (selectedIndexChange)="currentCategory.set($event)">
            @for (category of taskCategories; track $index) {
              <mat-tab [label]="category.title"></mat-tab>
            }
          </mat-tab-group>
        }
      </mat-card>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  taskCategories: TaskCategory[] = []
  currentCategory = signal(0)

  private readonly categoryService = inject(CategoryService)

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => (this.taskCategories = categories))
  }
}
