import { Component, OnInit } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,private service:ApiService) {}
  data: any = sessionStorage.getItem('item');
  detail: any = '';
  display: any = 'block';
  shiki: any = '';
  loading: any = false;
  background_color: any = 'rgba(128, 129, 163, 0.605)';
  background_image: any = '';
  user: any = localStorage.getItem('user');
  ngOnInit(): void {
    this.user = JSON.parse(this.user);
    this.data = JSON.parse(this.data);
    console.log(this.data);
  }

  back() {
    window.history.back();
  }

  async change_background() {
    const { value: file } = await Swal.fire({
      title: 'เลือกรูปภาพ',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'อัพโหลดรูปภาพพื้นหลัง',
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.background_image = 'url(' + e.target.result + ')';
      };
      reader.readAsDataURL(file);
    }
  }
  async change_shiki() {
    const { value: file } = await Swal.fire({
      title: 'เลือกรูปภาพ',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'อัพโหลดรูปภาพชิกิงามิ',
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.shiki = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async code_color() {
    const { value: color } = await Swal.fire({
      title: 'แก้ไขสีพื้นหลัง',
      input: 'text',
      inputLabel: 'เลือกโค้ดสีส่วน RGBA',
      inputValue: this.background_color,
      footer:
        '<a href="https://www.hexcolortool.com/" target="_blank">โค้ดสี</a>',
      showCancelButton: true,
    });

    if (color) {
      this.background_color = color;
    }
  }

  async save_image() {
    var node = document.getElementById('image') as HTMLElement;
    this.spinner.show();
    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        this.service.Get('User/GetMemberByEmail/' + this.user.email).subscribe((res)=> {
          let item_set = JSON.parse(res.itemSet);
          if(item_set.length >= res.maxSet) {
            Swal.fire('สมุดบันทึกของคุณเต็มแล้ว','กรุณาติดต่อแอดมิน','error');
            this.spinner.hide();
            return;
          }
          let body = {
            ownerId:res.id,
            ownerName:res.name,
            base64:dataUrl
          }

          this.service.Post('ItemSetByUser/InsertItemSet',body).subscribe((response)=> {
            let last = response;
            item_set.push(last);
            let obj = {
              id:res.id,
              itemSet:JSON.stringify(item_set),
              maxSet:res.maxSet
            }
            this.service.Put('ItemSetByUser/EditItemsetByMemberId/'+obj.id,obj).subscribe((success)=> {
              Swal.fire('บันทึกสำเร็จ','','success')
              this.spinner.hide();
            })
          })

        })
        
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  async download() {
    const { value: name } = await Swal.fire({
      title: 'ตั้งชื่อไฟล์',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
    });

    if (name) {
      this.spinner.show();
      var node = document.getElementById('image') as HTMLElement;

      htmlToImage
        .toPng(node)
        .then((dataUrl) => {
          var link = document.createElement('a');
          link.download = name;
          link.href = dataUrl;
          link.click();
          this.spinner.hide();
          // this.display = 'none';
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }
  }
}
