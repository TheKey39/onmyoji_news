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
  ngOnInit(): void {
    this.GetRegion();
  }

  data = this.fb.group({
    detail: [''],
    title: ['', [Validators.required]],
    region_id: ['', [Validators.required]],
    image_path: [
      'https://w0.peakpx.com/wallpaper/21/752/HD-wallpaper-video-game-onmyoji.jpg',
    ],
  });

  async fileChangeEvent(event: any) {
    this.data.controls['image_path'].setValue(await this.convertBase64(event.target.files[0]));
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

  async GetRegion() {
    let response: any = await this.service.Post('GetRegion', {});
    this.region = response;
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '30vh',
    defaultFontName: 'Athiti',
  };
}
