import {Injectable} from '@angular/core';
import {Util} from './untils/util';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  checkUser(): boolean {
    if (JSON.parse(localStorage.getItem('login'))[0].role === +1) {
      return true;
    } else {
      alert('ban khong co quyen thuc hien chuc nang nay');
      return false;
    }
  }
}
