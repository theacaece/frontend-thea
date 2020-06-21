import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class EntrenamientoService {

  public API = '//localhost:8085';
  public ENTRENAMIENTO_API = this.API + '/entrenamiento';

  constructor(private http: HttpClient) {}

  post(): Observable<any> {
    return this.http.post(this.API + '/entrenamiento', {});
  }

}