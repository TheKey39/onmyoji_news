import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  path = 'http://thekey39.com:10/api/';

  constructor(private http: HttpClient) {}
  Post(path: any, data: any): Observable<any> {
    let URL = this.path + path;
    return this.http.post(URL, data);
  }
  Get(path: any): Observable<any> {
    let URL = this.path + path;
    return this.http.get(URL);
  }

  uploadFile<T>(path: any, data: any): Observable<any> {
    let URL = this.path + path;
    let formData = new FormData();
    formData.append('file', data.image, data.image.name);
    formData.append('name', 'test');
    formData.append('description', 'test');

    return this.http.post(URL, formData);
  }
}
