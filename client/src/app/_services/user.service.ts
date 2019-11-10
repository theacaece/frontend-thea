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
  public USER_API = this.API + '/users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<User[]>(this.API + '/users');
  }
    
  get(id: any): Observable<any> {
    return this.http.get<any>(this.USER_API + '/edit', id);
  }

  save(user: any): Observable<any> {
    let result: Observable<Object>;
    if (user['href']) {
      result = this.http.put(user.href, user);
    } else {
      result = this.http.post(this.USER_API + '/save', user);
    }
    return result;
  }

  remove(href: any) {
    alert('service');
    alert(href);
    return this.http.delete(this.USER_API + '/delete', href);
  }
}