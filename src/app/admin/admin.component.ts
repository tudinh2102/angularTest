import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.scss',
    './../home/header/header.component.scss'
  ]
})
export class AdminComponent implements OnInit {

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('login')) + `dang vao trang admin`);
  }

}
