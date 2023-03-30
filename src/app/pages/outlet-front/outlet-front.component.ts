import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2';
import { trigger, transition, useAnimation } from '@angular/animations';
import { moveFromTop, moveFromBottom } from 'ngx-router-animations';

@Component({
  selector: 'app-outlet-front',
  templateUrl: './outlet-front.component.html',
  styleUrls: ['./outlet-front.component.css'],
  animations: [
    trigger('moveFromTop', [
      transition('home => login', useAnimation(moveFromTop)),
    ]),
    trigger('moveFromBottom', [
      transition('login => home', useAnimation(moveFromBottom)),
    ]),
  ],
})
export class OutletFrontComponent implements OnInit {
  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

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
  }

  href(path: any) {
    this.service.Href(path);
  }
}
