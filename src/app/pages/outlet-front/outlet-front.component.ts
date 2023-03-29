import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-outlet-front',
  templateUrl: './outlet-front.component.html',
  styleUrls: ['./outlet-front.component.css'],
})
export class OutletFrontComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private service: ApiService
  ) {
    this.authService.authState.subscribe((user) => {
      if (!user) {
        return;
      }
      this.LoginSocial(user);
    });
  }

  ngOnInit(): void {}

  user: any = this.service.GetUser();

  async LoginSocial(user: any) {
    user.social_id = user.id;
    let response: any = await this.service.Post('LoginSocial', user);
    if (response?.length) {
      this.service.SetUser(response[0]);
      window.location.reload();
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.service.Logout();
    localStorage.clear();
    window.location.reload();
  }
}
