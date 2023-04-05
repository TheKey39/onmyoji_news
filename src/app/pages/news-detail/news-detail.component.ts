import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
})
export class NewsDetailComponent implements OnInit {
  constructor(
    private service: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id =
      this.activatedRoute.snapshot.paramMap.get('id') ??
      this.service.Href('home');
  }

  id: any;
  data:any;
  comments:any;

  ngOnInit(): void {
    this.GetNewsById();
    this.GetCommentByHostId();
  }

  async GetNewsById() {
    let response: any = await this.service.Post('GetNewsById', { id: this.id });
    if (!response?.length) {
      this.service.Href('home');
      return;
    }
    this.data = response[0]
  }
  async GetCommentByHostId() {
    let response: any = await this.service.Post('GetCommentByHostId', { id: this.id });
    this.comments = response
    console.log(this.comments)
  }
}
