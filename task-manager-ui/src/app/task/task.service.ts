import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { TaskCategory } from '../dashboard/task-category.model'
import { Task } from './task.model'

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient)

  getBy(category?: TaskCategory): Observable<Task[]> {
    const params = Object.create({})
    if (category != null) params['category'] = category.id

    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`, { params }).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err.error
      })
    )
  }
}
