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
  news:any;
  search:any = ""

  ngOnInit(): void {
    this.GetAllNews();
  }

  async GetAllNews() {
    let response: any = await this.service.Post('GetAllNews', {
      limit: '10',
      page: '0',
      search: this.search ?? null
    });
    this.news = response
  }

  href(path: any) {
    this.service.Href(path);
  }
}
