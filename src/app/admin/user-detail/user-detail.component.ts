import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  username: string;
  userForm: FormGroup;
  newUser: User;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.getUserFormRoute();

    if (this.username === '0') {
      this.userForm = this.fb.group({
        username: this.fb.control('', [Validators.required]),
        password: this.fb.control('', [Validators.required]),
        fullName: this.fb.control('', [Validators.required]),
        role: this.fb.control('', [Validators.required])
      });
    } else {
      this.userForm = this.fb.group({
        username: this.fb.control(this.newUser.username, [Validators.required]),
        password: this.fb.control(this.newUser.password, [Validators.required]),
        fullName: this.fb.control(this.newUser.fullName, [Validators.required]),
        role: this.fb.control(+this.newUser.role, [Validators.required])
      });
    }
  }

  onSubmit(): void {
    if (this.username === '0') { // them
      const username = this.userForm.value['username'];

      // check username
      this.userService.getUserByUsername(username).subscribe((user) => this.newUser = user[0]); // trả ra mảng

      if (this.newUser) {
        alert('Username đã tồn tại!');
      } else {
        const password = this.userForm.value['password'];
        const fullName = this.userForm.value['fullName'];
        const role = +this.userForm.value['role'];

        const user = new User();
        user.username = username;
        user.password = password;
        user.fullName = fullName;
        user.role = role;

        // them
        this.userService.onAdd(user);
        alert('them thanh cong');
        location.replace('/admin/user/0');
      }
    } else { // sua
      const username = this.userForm.value['username'];
      const password = this.userForm.value['password'];
      const fullName = this.userForm.value['fullName'];
      const role = +this.userForm.value['role'];

      const user = new User();
      user.username = username;
      user.password = password;
      user.fullName = fullName;
      user.role = role;

      // sua
      this.userService.onEdit(user);
      alert('sua thanh cong');
      location.replace('/admin/user-list');

    }
  }

  getUserFormRoute(): void {
    this.username = this.route.snapshot.paramMap.get('username'); // + chuyển string thành số
    console.log(`+this.route.snapshot.paramMap.get('id') = ${JSON.stringify(this.route.snapshot.paramMap.get('username'))}`);

    if (this.username === '0') { // them
      this.title = 'new User';
    } else {
      this.title = 'Edit User';
      this.userService.getUserByUsername(this.username).subscribe(value => this.newUser = value[0]);

      // loi
      if (!this.newUser) {
        alert('Mã không hợ lệ!');
        location.replace('/admin/user-list');
      }
    }
  }

}
