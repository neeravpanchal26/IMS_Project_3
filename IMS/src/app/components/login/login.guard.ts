import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService} from "./login.service";

@Injectable()

export class LoginGuard implements CanActivate {

  constructor(private service: LoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.service.getUserLoggedIn());
    return this.service.getUserLoggedIn();
  }
}
