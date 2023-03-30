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
    });
  }

  ngOnInit(): void {}

  user: any = this.service.GetUser();

  signOut(): void {
    this.authService.signOut();
    this.service.Logout();
    localStorage.clear();
    window.location.reload();
  }

  href(path: any) {
    this.service.Href(path);
  }
}
