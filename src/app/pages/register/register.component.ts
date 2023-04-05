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
  array_dup: any = [];
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
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    first_name: [''],
    last_name: [''],
  });
  back() {
    window.history.back();
  }

  async InsertUser() {
    if (this.data.invalid) {
      return;
    }
    if (
      this.array_dup.find((e: any) => e.username == this.data.value.username)
    ) {
      await this.service.Swal('ชื่อผู้ใช้งานนี้มีคนใช้แล้ว', 'warning', null);
      return;
    }
    if (this.array_dup.find((e: any) => e.username == this.data.value.email)) {
      await this.service.Swal('อีเมลนี้มีคนใช้แล้ว', 'warning', null);
      return;
    }
    if (this.data.value.password != this.data.value.confirm_password) {
      await this.service.Swal('รหัสผ่านไม่ตรงกัน', 'warning', null);
      return;
    }
    let data = this.data.value;
    data.image = this.profile;
    delete data.confirm_password;
    let response: any = await this.service.Post('InsertUser', data);
    if (response) {
      await this.service.Swal(
        'สมัครสมาชิกสำเร็จ',
        'success',
        this.service.Href('login')
      );
    }
  }

  async CheckDuplicateUser() {
    let response: any = await this.service.Post('CheckDuplicateUser', {});
    if (response) {
      this.array_dup = response;
    }
  }

  ngOnInit(): void {
    this.CheckDuplicateUser();
  }
}
