import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { LoginPayload, RegisterPayload, Token, User } from '../profile/user.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  public static readonly LOGIN_PATH = '/login'
  public static readonly INITIAL_PATH = '/'
  public static readonly JWT_KEY = 'jwt_token'

  private readonly http = inject(HttpClient)

  private user?: User
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(!!this.user)

  get currentUser(): User | undefined {
    return this.user
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject
  }

  register(payload: RegisterPayload): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, payload).pipe(
      tap((user) => (this.user = user)),
      catchError((err: HttpErrorResponse) => {
        throw err.error
      })
    )
  }

  login(payload: LoginPayload): Observable<void> {
    return this.http.post<Token>(`${environment.apiUrl}/auth/login`, payload).pipe(
      map((response) => window.localStorage.setItem(AuthService.JWT_KEY, response.accessToken)),
      catchError((err: HttpErrorResponse) => {
        throw err.error
      })
    )
  }

  logout() {
    window.localStorage.removeItem(AuthService.JWT_KEY)
  }
}
