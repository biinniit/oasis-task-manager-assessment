import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  if (req.url.includes('/auth')) return next(req)

  const authToken = window.localStorage.getItem(AuthService.JWT_KEY)
  const authReq = req.clone({ headers: req.headers.append('Authorization', `Bearer ${authToken}`) })
  return next(authReq)
}
