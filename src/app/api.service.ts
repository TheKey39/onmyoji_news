import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  path = 'http://thekey39.com:10/api/';
  // path = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}
  Post(path: any, data: any): Observable<any> {
    let URL = this.path + path;
    return this.http.post(URL, data);
  }
  Put(path: any, data: any): Observable<any> {
    let URL = this.path + path;
    return this.http.put(URL, data);
  }
  Get(path: any): Observable<any> {
    let URL = this.path + path;
    return this.http.get(URL);
  }
  Delete(path: any): Observable<any> {
    let URL = this.path + path;
    return this.http.delete(URL);
  }
}
