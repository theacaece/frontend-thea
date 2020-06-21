import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class PhotoService {

  public API = '//localhost:8080';
  public FOTO_API = this.API + '/fotos';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/fotos');
  }
  
  get(dni: any): Observable<any> {
    return this.http.get(this.FOTO_API + '/dni/' + dni);
  }

}
