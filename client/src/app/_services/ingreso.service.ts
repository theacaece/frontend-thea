import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Register } from '../_models/register';

@Injectable({providedIn: 'root'})

export class IngresoService {
  
  public API = '//localhost:8080';
  public REGISTRO_API = this.API + '/ingresos';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.REGISTRO_API);
  }

}