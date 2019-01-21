import {User} from './user';

export class Blog {
  categoryId: number;
  id: number;
  title: string;
  describe: string; // 1 - neu nguoi dung nhap -> in ra --- 2 - k dien bat 30 tu dau tien cua body
  body: string;
  status: number; // private-public
  approve: number; // 1- approve 0-unapprove
  timeApprover: Date;
  timeCreate: Date;
  userCreate: string;
  timeUpdate: Date; // gan nhat
  userUpdate: string; // gan nhat
  view: number;
  image: string;
}
