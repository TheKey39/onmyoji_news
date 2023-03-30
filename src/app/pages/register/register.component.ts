import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private service: ApiService,
    private fb: FormBuilder
  ) {}

  imageChangedEvent: any = '';
  cropping: any = false;
  croppedImage: any = '';
  profile: any =
    'https://yt3.googleusercontent.com/PlaGES2nez9zeKrsLlkfFRRLgl4BkZYP6JytcVYki-ZsiS3pNQqXCHdJP1eSxhyYAzNAruc_zw=s900-c-k-c0x00ffffff-no-rj';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.cropping = !this.cropping;
  }
  imageCropped(event: any) {
    this.profile = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  data = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    confirm_password: [''],
    first_name: [''],
    last_name: [''],
  });
  back() {
    window.history.back();
  }

  async InsertUser() {
    let data = this.data.value
    delete data.confirm_password
    let response: any = await this.service.Post('InsertUser', data);
    if (response) {
      Swal.fire({
        title: 'สมัครสมาชิกสำเร็จ',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#4267B2',
        imageUrl:
          'https://4.bp.blogspot.com/-Rw3Qv5EqUqw/XS8yF8a_lRI/AAAAAAA1r_s/6GPEiTLa1zY-phxOIaQMsnw-Mul2hLZ1gCLcBGAs/s1600/AW3952781_08.gif',
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        this.service.Href('login');
      });
    }
  }

  ngOnInit(): void {}
}
