export class Util {

  static copyProps(source: any, dest: any): any {
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) { // ktra xem source co thuoc tinh i khong
        dest[prop] = source[prop];
      }
    }
    return dest;
  }

  static phanTrang(list: object): void {
  }
}

