import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'onmyoji-arena-front';
  showFiller = false;
  user: any = localStorage.getItem('user');
  constructor(private authService: SocialAuthService) {
    this.user = JSON.parse(this.user) || null;
    if(this.user) {
      return
    }
    this.authService.authState.subscribe((user) => {
      if (user) localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
    });
  }

  base64test() {
    this.toDataUrl(
      'https://i.pximg.net/img-original/img/2022/05/07/03/28/56/98163333_p0.jpg',
      function (myBase64: any) {
        console.log(myBase64); // myBase64 is the base64 string
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.clear();
    window.location.reload();
  }

  toDataUrl(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
