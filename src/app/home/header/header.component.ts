import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../../models/user';
import {Util} from '../../untils/util';
import {fakeCategory} from '../../../models/fake-category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  users: User[];
  categoryList = fakeCategory;

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit() {
    this.loadUser();
  }

  checkLogin(): boolean {
    if (localStorage.getItem('login')) {
      this.user = Util.copyProps(JSON.parse(localStorage.getItem('login'))[0], new User());
      return true;
    }
    return false;
  }

  logOut(): void {
    this.userService.onLogout();
  }

  loadUser(): void {
    this.userService.getuserList().subscribe((userList) => this.users = userList);
  }

}
