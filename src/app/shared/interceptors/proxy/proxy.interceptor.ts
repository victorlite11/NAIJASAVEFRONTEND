import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ProxyInterceptor implements HttpInterceptor {

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    @Inject('AUTH_KEY_PROPERTY_NAME') private authKey : string
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      setHeaders : {
        Authorization : `Bearer ${sessionStorage.getItem(this.authKey) || localStorage.getItem(this.authKey) || ''}`
      }
    })
    return next.handle(clonedRequest).pipe(
      catchError((err : HttpErrorResponse) => {
        if (err.status == 403) {
            // Forbidden
        
            this.router.navigate(['/'], {
              relativeTo : this.route
            })

        }
        return throwError(err)
      })
    )
  }
}
