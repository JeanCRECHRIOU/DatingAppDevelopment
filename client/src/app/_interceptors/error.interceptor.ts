import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toast: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 400:
              var errors = error.error.errors;
              if (errors) {
                const modelStateErrors = [];
                for (const key in errors) {
                  if (errors[ key ]) {
                    modelStateErrors.push(errors[ key ])
                  }
                }
                throw modelStateErrors.flat(); //flat method permet de regrouper les tableaux en un seul

              } else {
                this.toast.error(error.error, error.status.toString())
              }
              break;
            case 401:
              this.toast.error('Unauthorised', error.status.toString());
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationsExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('/server-error', navigationsExtras);
              break;
            default:
              this.toast.error('Something inexpected went wrong');
              console.log(error);
              break;
          }
        }
        throw error;
      })
    )
  }
}
