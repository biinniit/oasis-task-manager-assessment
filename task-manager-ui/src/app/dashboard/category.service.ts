import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { TaskCategory } from './task-category.model'

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient)

  getAll(): Observable<TaskCategory[]> {
    return this.http.get<TaskCategory[]>(`${environment.apiUrl}/categories`).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err.error
      })
    )
  }
}
