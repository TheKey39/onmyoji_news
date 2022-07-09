import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  items: any;
  hidden: any = false;
  set: any = [[]];
  select_set: any = 0;
  class: any;

  constructor(private service: ApiService) {
    this.service.Get('Items/GetAllItems').subscribe((res) => {
      this.items = res;
    });
  }

  add_set() {
    this.set.push([]);
    this.select_set = this.set.length - 1;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.set[this.select_set],
      event.previousIndex,
      event.currentIndex
    );
  }
  drop_(event: CdkDragDrop<string[]>, index: any) {
    moveItemInArray(this.set[index], event.previousIndex, event.currentIndex);
  }

  delete_set(index: any) {
    this.set.splice(index, 1);
  }

  add_item() {
    window.location.href = '/add-item';
  }

  set_item(i: any) {
    this.set[this.select_set].push(i);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'ไอเท็มไดัถูกเพิ่มลง Set ' + (this.select_set + 1),
    });
  }

  ngOnInit(): void {
    if (window.innerWidth > 658) {
      this.class = 'col-md-1 pt-2 pb-2';
    } else {
      this.class = 'col-md-12 pt-2 pb-2';
    }
  }

  next() {
    sessionStorage.setItem("item",JSON.stringify(this.set));
    window.location.href="/result"
  }
}
