import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [
    './user-list.component.scss',
    './../blog-list/blog-list.component.scss'
  ]
})
export class UserListComponent implements OnInit {

  users: User[];
  search: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsersFromervice();
  }

  getUsersFromervice(): void {
    this.userService.getuserList().subscribe((users) => this.users = users);
  }

  onChange(id: number) {
    if (+id === 0) {
      this.getUsersFromervice();
    } else {
      this.userService.getListUserByRole(id).subscribe(users => this.users = users);
    }
  }

  onDelete(username: string): void {
    this.userService.onDelete(username);

    location.replace('admin/user-list');
  }

}
