import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  data: any = {};
  type: any;
  constructor(private service: ApiService) {
    this.service.Get('Items/GetAllItemsType').subscribe((res) => {
      this.type = res;
    });
  }

  ngOnInit(): void {}

  back() {
    window.history.back()
  }

  AddItem() {
    this.service.Post('Items/AddItems', this.data).subscribe((res) => {
      Swal.fire('Success', '', 'success');
    });
  }
}
