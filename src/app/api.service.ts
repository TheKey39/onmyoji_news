import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // path = 'http://103.76.183.192:10/api/';
  path = 'http://localhost:80/';
  // path = 'https://www.thekey39.com/api/';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  SetUser(data: any) {
    this.cookieService.set('user', btoa(JSON.stringify(data)));
  }

  GetUser() {
    return this.cookieService.get('user')
      ? JSON.parse(atob(this.cookieService.get('user')))
      : null;
  }

  GetToken() {
    return this.cookieService.get('user') ? this.cookieService.get('user') : '';
  }

  Logout() {
    localStorage.clear();
    window.location.reload();
    this.cookieService.delete('user');
  }

  Href(path: any) {
    this.router.navigate([path]);
    // window.location.href = './' + path;
  }

  async Swal(title: any, icon: any, f: any) {
    await Swal.fire({
      title: title,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#4267B2',
      showConfirmButton: false,
      icon: icon,
      timer: 1500,
    }).then((result) => {
      f;
    });
  }

  async Post(path: any, data: any) {
    return new Promise((resolve, reject) => {
      path = path + '?token=' + this.GetToken();

      this.http.post<any>(this.path + path, data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }
}
