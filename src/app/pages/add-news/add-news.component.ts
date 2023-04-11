import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  constructor(private service: ApiService, private fb: FormBuilder) {}

  region: any;
  info: any;
  ngOnInit(): void {
    this.GetRegion();
    if (!this.service.GetUser()) {
      this.service.Href('home')
    }
  }

  data = this.fb.group({
    detail: [''],
    title: ['', [Validators.required]],
    region_id: ['', [Validators.required]],
    image_path: [
      'https://w0.peakpx.com/wallpaper/21/752/HD-wallpaper-video-game-onmyoji.jpg',
    ],
    info: [''],
    created_date: [new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()],
    created_by: [this.service.GetUser()?.id],
  });

  async fileChangeEvent(event: any) {
    this.data.controls['image_path'].setValue(
      await this.convertBase64(event.target.files[0])
    );
    console.log(this.data.value);
  }

  async convertBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async InsertNews() {
    if (this.data.invalid) {
      return;
    }
    if (!this.data.value.info) {
      this.data.value.info = '-'
    }
    this.data.value.status = 1;
    let response: any = await this.service.Post('InsertNews', this.data.value);
    if (response) {
      this.service.Snack(`เพิ่มข่าวสำเร็จ`, (this.service.Href('home')));
    } else {
      this.service.Snack(`กรุณาติดต่อแอดมิน`,null)
    }
  }

  async GetRegion() {
    let response: any = await this.service.Post('GetRegion', {});
    this.region = response;
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '55vh',
    defaultFontName: 'Athiti',
  };
}
