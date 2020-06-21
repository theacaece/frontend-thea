import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class IngresoService {
  
  public API = '//localhost:8080';
  public INGRESO_API = this.API + '/ingresos';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.INGRESO_API);
  }

}