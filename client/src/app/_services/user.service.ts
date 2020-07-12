import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserData } from '../_models/user-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserData[]>(`${environment.apiUrl}/users/list`);
  }

  edit(userData: UserData) {
    return this.http.put<any>(`${environment.apiUrl}/users/update/${userData.id}`, userData)
      .pipe(map(userData => {
        return userData;
      }));
  }

  get(id: number){
    return this.http.get<any>(`${environment.apiUrl}/users/edit/${id}`)
      .pipe(map(result => {
        return result;
      }));
  }

  delete(id: number){
    return this.http.delete<any>(`${environment.apiUrl}/users/delete/${id}`)
      .pipe(map(result => {
        return result;
      }));
  }
}