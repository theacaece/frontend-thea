import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { Registro } from '../_models/registro';

@Injectable({providedIn: 'root'})

export class RegistroService {
  
  public API = '//localhost:8080';
  public REGISTRO_API = this.API + '/registros';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/registros');
  }
  
  get(id: any): Observable<any> {
    return this.http.get<any>(this.REGISTRO_API + '/edit/' + id);
  }

  save(registro: any): Observable<any> {
    return this.http.post(this.REGISTRO_API + '/save', registro);
  }

}