import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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

  data: any = {};

  async LoginSocial(user: any) {
    user.social_id = user.id;
    let response: any = await this.service.Post('LoginSocial', user);
    if (response?.length) {
      this.service.SetUser(response[0]);
      window.location.reload();
    } else {
      Swal.fire('สวัสดี', '', 'success');
    }
  }

  async Login() {
    let response: any = await this.service.Post('Login', this.data);
    console.log(response);
    if (!response?.length) {
      // Swal.fire({
      //   title: 'ไม่พบผู้ใช้ในระบบ',
      //   color: '#716add',
      //   confirmButtonText: 'ตกลง',
      //   confirmButtonColor: '#4267B2',
      //   // background: '#fff url(/images/trees.png)',
      //   backdrop: `
      //     rgba(0,0,100,0.3)
      //     url("https://i.pinimg.com/originals/ec/4a/62/ec4a62252440001f1bec8aec4585d65e.gif")
      //     center top
      //     no-repeat
      //   `,
      // });

      Swal.fire({
        title: 'ไม่พบผู้ใช้ในระบบ',
        text: '',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#4267B2',
        imageUrl:
          'https://i.pinimg.com/originals/ec/4a/62/ec4a62252440001f1bec8aec4585d65e.gif',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: 'ยินดีต้อนรับ',
        text: `( ${response[0].username} )`,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#4267B2',
        imageUrl:
          'https://4.bp.blogspot.com/-_1oQJ81NkXY/XH4mOkTf92I/AAAAAAAxaSs/ghM1OaNtg3E2DYIQdh2gDjSNNjRZwwKfgCLcBGAs/s1600/AW3625434_00.gif',
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        this.service.Href('home')
      });
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
