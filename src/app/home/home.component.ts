import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {BlogService} from '../blog.service';
import {Blog} from '../../models/blog';
import {fakeUser} from '../../models/fake-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs: Blog[];

  constructor(
    private userService: UserService,
    private blogService: BlogService
  ) {
  }

  ngOnInit() {
    // localStorage.removeItem('users');
    // localStorage.removeItem('blogs');
    console.log('userLogin: ');
    console.log(JSON.parse(localStorage.getItem('login')));
    console.log('userList: ');
    console.log(JSON.parse(localStorage.getItem('users')));
    console.log('blogList: ');
    console.log(JSON.parse(localStorage.getItem('blogs')));
    console.log('setup: ');
    console.log(JSON.parse(localStorage.getItem('setup')));

    this.getData();
    this.load();
  }

  // nếu local chưa có data thì get từ fake
  getData(): void {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(fakeUser));
    }

    if (!localStorage.getItem('setup')) {
      const setup = {
        'title': 'Trang Blog',
        'dateFormat': 'dd-MM-yyyy',
        'coutBlog': 10,
      };
      localStorage.setItem('setup', JSON.stringify(setup));
    }
  }

  load(): void {
    this.blogs = JSON.parse(localStorage.getItem('blogs'));
  }

}
