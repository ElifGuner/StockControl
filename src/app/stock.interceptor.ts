import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StockInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('http interceptor tetiklendi…');
    // Encode username and password
    const username = localStorage.getItem("username");;
    const password = localStorage.getItem("password");;
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    // Clone the request and set the new headers
    const authReq = request.clone({
      headers: request.headers.set('Authorization', authHeader)
    });
    return next.handle(authReq);
  }
}
