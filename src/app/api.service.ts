import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // path = 'http://103.76.183.192:10/api/';
  // path = 'http://localhost:8080/';
  path = 'https://www.thekey39.com/api/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  SetUser(data: any) {
    this.cookieService.set('user', btoa(JSON.stringify(data)));
  }

  GetUser() {
    return this.cookieService.get('user') ? JSON.parse(atob(this.cookieService.get('user'))) : null;
  }

  Logout() {
    this.cookieService.delete('user');
  }

  Href(path:any) {
    window.location.href = './' + path;
  }

  async Post(path: any, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.path + path, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          resolve(error);
        }
      );
    });
  }
}
