import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API = '//localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<User[]>(this.API + '/users');
  }
    
  get(id: string): Observable<any> {
    return this.http.get(this.API + '/' + id);
  }

  save(usuario: any): Observable<any> {
    let result: Observable<Object>;
    if (usuario['href']) {
      result = this.http.put(usuario.href, usuario);
    } else {
      result = this.http.post(this.API + '/save', usuario);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}