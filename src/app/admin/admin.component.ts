import {Component, OnInit} from '@angular/core';
import {Util} from '../untils/util';
import {User} from '../../models/user';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.scss',
    './../home/header/header.component.scss'
  ]
})
export class AdminComponent implements OnInit {

  user = null;
  role = JSON.parse(localStorage.getItem('login'))[0].role;

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    if (!this.checkLogin()) {
      alert('chuc nang nay can phai dang nhap');
      location.replace('/login');
    }
  }

  checkLogin(): boolean {
    if (localStorage.getItem('login')) {
      this.user = Util.copyProps(JSON.parse(localStorage.getItem('login'))[0], new User());
      return true;
    }
    return false;
  }

}
