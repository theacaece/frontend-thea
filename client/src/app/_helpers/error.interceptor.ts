import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    msj_error: string = "Error desconocido";

    constructor(private authenticationService: AuthenticationService, 
                private route: ActivatedRoute,
                private router: Router) {
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            
            if (err.statusText) {
                this.msj_error = err.statusText;
            }

            if (err.error.message) {
                this.msj_error = err.error.message; 
            }  

            if (err.status === 0) {
                this.msj_error = "Error de conexión";
            }

            if (err.status === 401) {
                if(location.pathname != "/login"){
                    this.authenticationService.logout();
                    location.reload(true);
                }
            }

            return throwError(this.msj_error);
        }))
    }
}