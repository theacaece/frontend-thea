import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class PhotoService {

  public API = '//localhost:8080';
  public FOTO_API = this.API + '/photos';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/photos');
  }
  
  get(id: string) {
    return this.http.get(this.FOTO_API + '/' + id);
  }

  save(photo: any): Observable<any> {
    let result: Observable<Object>;
    if (photo['href']) {
      result = this.http.put(photo.href, photo);
    } else {
      result = this.http.post(this.FOTO_API + '/save', photo);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
