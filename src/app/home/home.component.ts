import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // localStorage.removeItem('users');
    console.log('userLogin: ');
    console.log(JSON.parse(localStorage.getItem('login')));
    console.log('userList: ');
    console.log(JSON.parse(localStorage.getItem('users')));
  }

}
