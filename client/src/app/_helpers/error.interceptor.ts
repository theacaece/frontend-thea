import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
        private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            switch (err.status) {
                case 401:
                    this.authenticationService.logout();
                    location.reload(true);
                    break;
                case 403:
                    this.router.navigate(['/httpError/403']);
                    break;
                default:
                    this.authenticationService.logout();
                    location.reload(true);
                    break;
            }
            /* if (err.status === 401) {
                 // auto logout if 401 response returned from api
                 if (location.pathname != "/login") {
                     this.authenticationService.logout();
                     location.reload(true);
                 }
             }*/
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
