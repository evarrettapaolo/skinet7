import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  //DI router and toastr notification
  constructor(private router: Router, private toastr: ToastrService) {}

  //Utilizes rxjs methods
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error) {
          if(error.status === 400) {
            if(error.error.errors) {
              throw error.error; //throw so components can catch them, used in forms
            } else {
              this.toastr.error(error.error.message, error.status.toString()); //used toastr
            }
          }
          if(error.status === 401) {
            this.toastr.error(error.error.message, error.status.toString());
          }
          if(error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if(error.status === 500) {
            //save the error state and pass it to the component
            const navigateExtras: NavigationExtras = {state: {error: error.error}};
            this.router.navigateByUrl('server-error', navigateExtras); 
          }
        }
        return throwError(() => new Error(error.message));
      })
    )
  }
}
