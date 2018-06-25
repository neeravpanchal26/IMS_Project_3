import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {
  // Global Variable
  private username;
  constructor() { }

  // set username
  setUserName(info) {
    this.username = info;
  }

  // get username
  getUserName() {
    return this.username;
  }

}
