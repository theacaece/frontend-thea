import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Person } from '../_models/person';

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  
  public API = '//localhost:8080';
  public PERSON_API = this.API + '/personas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<Person[]>(this.API + '/personas');
  }
  
  get(id: any): Observable<any> {
    return this.http.get<any>(this.PERSON_API + '/edit/' + id);
  }

  save(person: any): Observable<any> {
    let result: Observable<Object>;
    if (person['href']) {
      result = this.http.put(person.href, person);
    } else {
      result = this.http.post(this.PERSON_API + '/save', person);
    }
    return result;
  }

  update(id: any, person: any) {
    return this.http.post(this.PERSON_API + "/update/" + id, person);
  }

  remove(id: any) {
    return this.http.delete<Person>(this.PERSON_API + "/" + id);
  }

}