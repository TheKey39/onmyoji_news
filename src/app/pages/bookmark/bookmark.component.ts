import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  constructor(
    private service: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  user: any = localStorage.getItem('user');
  member: any;
  bookmark: any = [];
  p :any = 1;

  ngOnInit(): void {
    this.user = JSON.parse(this.user);
    this.spinner.show();
    this.GetMemberByEmail();
  }

  GetMemberByEmail() {
    this.service.Get('User/GetMemberByEmail/' + this.user.email).subscribe(
      (res) => {
        this.member = res;
        this.GetItemSetByMemberId(res.id);
      },
      (error) => {
        this.spinner.hide();
        window.history.back();
      }
    );
  }

  GetItemSetByMemberId(id: any) {
    this.service
      .Get('ItemSetByUser/GetItemSetByMemberId/' + id)
      .subscribe((res) => {
        this.spinner.hide();
        this.bookmark = res;
        console.log(this.bookmark);
      });
  }

  delete_item(id: any) {
    this.spinner.show();

    let set = JSON.parse(this.member.itemSet);
    const index = set.indexOf(id);
    if (index > -1) {
      set.splice(index, 1);
    }

    this.service
      .Put('ItemSetByUser/EditItemsetByMemberId/' + this.member.id, {
        id: this.member.id,
        itemSet: JSON.stringify(set),
        maxSet: this.member.maxSet,
      })
      .subscribe((res) => {
        this.DeleteSet(id);
      });
  }

  DeleteSet(id: any) {
    this.service.Delete('ItemSetByUser/DeleteSet/' + id).subscribe((res) => {
      Swal.fire('ลบสำเร็จ', '', 'success');
      this.spinner.hide();
      this.GetMemberByEmail();
    });
  }
}
