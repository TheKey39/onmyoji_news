import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
  constructor(private service: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {}
}
