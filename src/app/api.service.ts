import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // path = 'http://103.76.183.192:10/api/';
  path = 'http://localhost:80/';
  // path = 'https://www.thekey39.com/api/';

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  SetUser(data: any) {
    console.log(data);
    sessionStorage.setItem('user', data);
  }

  GetUser() {
    return sessionStorage.getItem('user')
      ? JSON.parse(atob(sessionStorage.getItem('user') || ''))
      : null;
  }

  GetToken() {
    return sessionStorage.getItem('user') ? sessionStorage.getItem('user') : '';
  }

  Logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  Href(path: any) {
    this.router.navigate([path]);
    // window.location.href = './' + path;
  }
  HrefBack() {
    this.router.navigate([".."]);
    // window.location.href = './' + path;
  }

  async Snack(text:any,f: any) {
    await this._snackBar.open(text, 'ตกลง', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
    f;
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
    this.spinner.show();
    return new Promise((resolve, reject) => {
      path = path + '?token=' + this.GetToken();

      this.http.post<any>(this.path + path, data).subscribe(
        (res) => {
          this.spinner.hide()
          resolve(res);
        },
        (error) => {
          this.spinner.hide()
          resolve(false);
        }
      );
    });
  }
}
