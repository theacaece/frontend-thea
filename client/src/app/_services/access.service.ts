import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AccessService {
  
  public API = '//localhost:8080';
  public REGISTRO_API = this.API + '/accesos';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/accesos');
  }
  
  get(id: any): Observable<any> {
    return this.http.get<any>(this.REGISTRO_API + '/edit/' + id);
  }

  save(registro: any): Observable<any> {
    return this.http.post(this.REGISTRO_API + '/save', registro);
  }

}