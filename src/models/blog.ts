import {User} from './user';

export class Blog {
  categoryId: number;

  id: number;
  title: string;
  describe: string; // 1 - neu nguoi dung nhap -> in ra --- 2 - k dien bat 30 tu dau tien cua body
  body: string;
  status: number; // private-public-approved
  timeApprover: Date;
  timeCreate: Date;
  userCreate: User;
  timeUpdate: Date; // gan nhat
  userUpdate: User; // gan nhat
  vew: number;
  image: string;
}
