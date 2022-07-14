import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // path = 'http://103.76.183.192:10/api/';
  // path = 'https://localhost:5001/api/';
  path = 'https://www.thekey39.com/api/api/';

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
