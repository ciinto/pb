import { Injectable } from '@angular/core';

@Injectable()
export class RandomName {
  headName = ["Cáo", "Dê", "Chó", "Mèo", "Thỏ", "Hổ", "Sư tử", "Voi", "Gà", "Khỉ", "Đại bàng", "Chuột", "Hải cẩu", "Ngựa", "Lợn", "Báo", "Gấu", "Cá mập"]
  color = ["Đỏ", "Vàng", "Xanh", "Tím", "Hồng", "Đen", "Trắng"]

  constructor() {
  }

  random(field) {
    var index = Math.floor(Math.random() * field.length)
    return field[index]
  }

  getRandomName() {
    return `${this.random(this.headName)} ${this.random(this.color)}`
  }
}