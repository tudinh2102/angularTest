import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginContact: FormGroup;
  check = true;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.loginContact = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  onSubmit(): void {
    const us = this.loginContact.value['username'];
    const pw = this.loginContact.value['password'];

    this.check = this.userService.checkLogin(us, pw);

    if (this.check === true) {
      this.route.navigate(['/admin']);
    }

  }

  onChanges() {
    this.check = true;
  }

}
