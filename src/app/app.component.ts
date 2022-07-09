import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'onmyoji-arena-front';
  showFiller = false;

  base64test() {
    this.toDataUrl(
      'https://i.pximg.net/img-original/img/2022/05/07/03/28/56/98163333_p0.jpg',
      function (myBase64: any) {
        console.log(myBase64); // myBase64 is the base64 string
      }
    );
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
