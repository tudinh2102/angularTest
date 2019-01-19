import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {BlogService} from '../blog.service';
import {Blog} from '../../models/blog';

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

    this.load();
  }


  load(): void {
    this.blogs = JSON.parse(localStorage.getItem('blogs'));
  }

}
