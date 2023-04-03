import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: ApiService) {}

  user: any = this.service.GetUser();

  ngOnInit(): void {
    this.GetAllNews();
  }

  async GetAllNews() {
    let response:any = await this.service.Post('GetAllNews', {
      limit: '2',
      page: '0',
    });
    console.log(response);
  }

  href(path: any) {
    this.service.Href(path);
  }
}
