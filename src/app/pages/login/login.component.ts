import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private service: ApiService,
    private fb: FormBuilder
  ) {
    this.authService.authState.subscribe((user) => {
      if (!user) {
        return;
      }
      this.LoginSocial(user);
    });
  }

  user:any = this.service.GetUser()

  ngOnInit(): void {
    if(this.user) {
      this.service.Href('home')
    }
  }

  data = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  async LoginSocial(user: any) {
    user.social_id = user.id;
    let response: any = await this.service.Post('LoginSocial', user);
    if (response?.length) {
      this.service.SetUser(response[0].token.token);
      window.location.href = './home';
    } else {
      await this.service.Swal(`ไม่พบผู้ใช้ในระบบ`, 'error', null);
    }
  }

  async Login() {
    if (this.data.invalid) {
      return;
    }
    let response: any = await this.service.Post('Login', this.data.value);
    console.log(response);
    if (!response?.length) {
      await this.service.Swal('ไม่พบผู้ใช้ในระบบ', 'error', null);
    } else {
      response[0]?.image ? delete response[0]?.image : null;
      this.service.SetUser(response[0].token.token);
      await this.service.Swal(
        `ยินดีต้อนรับ ( ${response[0].username} )`,
        'success',
        (window.location.href = './home')
      );
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  href(path: any) {
    this.service.Href(path);
  }
}
