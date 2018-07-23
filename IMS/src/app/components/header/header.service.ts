import { Injectable } from '@angular/core';
import { Observable} from "rxjs/Observable";
import { HttpClient} from "@angular/common/http";

@Injectable()
export class HeaderService {
  // Global Variable
  private username;

  // Default Constructor
  constructor(private http:HttpClient) { }

  // set username
  setUserName(info) {
    this.username = info;
  }

  // get username
  getUserName() {
    return this.username;
  }

  // Get Logo
  public getLogo():Observable<any> {
    return this.http.get('/api/BLL/logo.php') as Observable<any>;
  }

}
