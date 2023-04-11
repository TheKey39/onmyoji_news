import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
})
export class NewsDetailComponent implements OnInit {
  constructor(
    private service: ApiService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.id =
      this.activatedRoute.snapshot.paramMap.get('id') ??
      this.service.Href('home');
  }

  id: any;
  data: any;
  comments: any;

  comment = this.fb.group({
    comment_detail: [''],
    comment_date: [new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()],
    comment_by: [this.service.GetUser()?.id],
  });

  ngOnInit(): void {
    this.GetNewsById();
    this.GetCommentByHostId();
    this.UpdateView();
  }

  async InsertComment() {
    this.comment.value.host_id = parseInt(this.id);
    let response: any = await this.service.Post(
      'InsertComment',
      this.comment.value
    );
    if (response) {
      this.GetNewsById();
      this.GetCommentByHostId();
    }
  }

  async GetNewsById() {
    let response: any = await this.service.Post('GetNewsById', { id: this.id });
    if (!response?.length) {
      this.service.Href('home');
      return;
    }
    this.data = response[0];
  }

  async GetCommentByHostId() {
    let response: any = await this.service.Post('GetCommentByHostId', {
      id: this.id,
    });
    this.comments = response;
    console.log(this.comments);
  }

  async UpdateView() {
    let response: any = await this.service.Post('UpdateView', { id: this.id });
  }
}
