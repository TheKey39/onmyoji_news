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
  news: any;
  search: any = '';
  p: any = 1;
  total: any = 0;
  limit: any = 8;
  region: any;
  region_id: any = 0;

  ngOnInit(): void {
    this.GetAllNews(1);
    this.CountNews();
    this.GetRegion();
  }

  async GetAllNews(page: any) {
    let response: any = await this.service.Post('GetAllNews', {
      limit: this.limit,
      page: page - 1,
      search: this.search ?? null,
      region_id: parseInt(this.region_id),
    });
    this.news = response;
  }
  async CountNews() {
    let response: any = await this.service.Post('CountNews', {
      search: this.search ?? null,
      region_id: parseInt(this.region_id),
    });
    this.total = response[0].News;
    this.p = 1;
    this.service.Snack('ข้อมูลที่พบ : ' + this.total ,null)
  }
  async GetRegion() {
    let response: any = await this.service.Post('GetRegion', {});
    this.region = response;
  }

  href(path: any) {
    this.service.Href(path);
  }
}
