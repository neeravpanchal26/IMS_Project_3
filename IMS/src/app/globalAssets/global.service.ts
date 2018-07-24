import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Observable} from "rxjs/Observable";
import { HttpClient} from "@angular/common/http";
import { DomSanitizer} from "@angular/platform-browser";

@Injectable()
export class GlobalService {
  // Default Constructor
  constructor(private toast:ToastrService,
              private http:HttpClient,
              private sanitizer:DomSanitizer) { }

  // Error message
  handleError(error:Error) {
    return this.toast.error('An error has occurred\n'+error.message+'\nPlease contact the administrator for further assistance.','Oops!');
  }

  // Get Logo
  public getLogo():Observable<Blob> {
    return this.http.get('/api/BLL/logo.php',{responseType:'blob'}) as Observable<Blob>;
  }

  // Image to URL
  selectPhoto(photos: any) {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(photos));
  }

  // Deactivated user component notifications here
  activatedSuccess(user) {
    return this.toast.success(user + "'s status has been activated!", "Success!");
  }
  deactivatedSuccess(user) {
    return this.toast.warning(user + "'s status has been deactivated!", "Success!");
  }
  userRoleChange(user) {
    return this.toast.success(user + "'s role has been changed!", "Success!");
  }

  // It password reset component notifications here
  passwordResetSuccess(firstname,surname) {
    return this.toast.success('Password has been reset for '+firstname+' '+surname+'.','Success!')
  }

  // Login component notifications here
  loginSuccess(username) {
    return this.toast.success("Welcome "+username,'Success!');
  }
  loginFailure() {
    return this.toast.warning('Change a few things up and try submitting again.','Failure!');
  }
  loginDeactivated(username) {
    return this.toast.error(username+' Please contact the administrator. Your account has been deactivated.','Failure!');
  }
}