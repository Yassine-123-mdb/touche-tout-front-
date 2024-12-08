import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const toExclude = "/login";
// Tester s'il s'agit de login, on n'ajoute pas le header Authorization puisqu'on n'a pas de JWT (il est null)
if (request.url.search(toExclude) === -1) {
  let jwt = this.authService.getToken();
  if (jwt) {
    let reqWithToken = request.clone({
      setHeaders: { Authorization: "Bearer " + jwt }
    });
    return next.handle(reqWithToken);
  }
}
return next.handle(request);
  }
}