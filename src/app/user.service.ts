import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable, of} from 'rxjs';

@Injectable()
export class UserService {

  userLogin: object;
  users: User[];

  constructor() {
  }

  checkLogin(us: string, pw: string): boolean {
    this.getUser(us, pw).subscribe((user) => this.userLogin = user);

    if (this.userLogin.toString()) { // login thành công
      localStorage.setItem('login', JSON.stringify(this.userLogin));
      return true;
    }
    return false;
  }

  getuserList(): Observable<User[]> {

    return of(JSON.parse(localStorage.getItem('users')));
  }

  getListUserByRole(id: number): Observable<User[]> {
    return of(JSON.parse(localStorage.getItem('users')).filter(users => users.role === +id));
  }

  getUserByUsername(username: string): Observable<User> {
    return of(JSON.parse(localStorage.getItem('users')).filter(user => user.username === username));
  }

  onLogout(): void {
    localStorage.removeItem('login');
  }

  // kiểm tra trong localStorage
  getUser(us: string, pw: string): Observable<User> {
    return of(JSON.parse(localStorage.getItem('users')).filter((user) => user.username === us && user.password === pw));
  }

  // them
  onAdd(user: User): void {

    this.users = JSON.parse(localStorage.getItem('users'));
    this.users.push(user);

    JSON.stringify(localStorage.setItem('users', JSON.stringify(this.users)));
  }

  // sua
  onEdit(user: User): void {
    this.users = JSON.parse(localStorage.getItem('users'));

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === user.username) {
        this.users[i] = user;
      }
    }
    JSON.stringify(localStorage.setItem('users', JSON.stringify(this.users)));
  }

  // xoa
  onDelete(username: string): void {
    const users = JSON.parse(localStorage.getItem('users'));

    const userIndex = users.findIndex(u => u.username === username);

    users.splice(userIndex, 1);

    localStorage.setItem('users', JSON.stringify(users));
  }
}
