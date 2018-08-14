import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { DomSanitizer} from "@angular/platform-browser";
import { environment} from "../../environments/environment";
import { Observable} from "rxjs/Observable";

@Injectable()
export class ImageRetrieveService {
  // Global Variable
  apiUrl = environment.api;

  // Default Constructor
  constructor(private http:HttpClient,
              private sanitizer:DomSanitizer) { }

  // Get Logo
  public getLogo():Observable<Blob> {
      return this.http.get(this.apiUrl+'/api/BLL/business.php?action=logoDownload',{responseType:'blob'}) as Observable<Blob>;
  }

  // Image to URL
  selectPhoto(photos: any) {
      return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(photos));
  }
}
