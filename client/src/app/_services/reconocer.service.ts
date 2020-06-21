import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ReconocerService {

  public API = '//localhost:8086';
  public CAPTURE_API = this.API + '/captura';

  constructor(private http: HttpClient) {}

  post(): Observable<any> {
    return this.http.post(this.API + '/captura', {});
  }

}