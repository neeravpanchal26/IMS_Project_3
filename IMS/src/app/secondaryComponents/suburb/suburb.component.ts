import { Component, OnInit } from '@angular/core';
import {AddUserService} from "../../components/add-user/add-user.service";
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import {Router} from "@angular/router";
import {SuburbService,iSuburb} from "./suburb.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-suburb',
  templateUrl: './suburb.component.html',
  styleUrls: ['./suburb.component.css'],
    providers:[AddUserService,SuburbService]
})
export class SuburbComponent implements OnInit {
  // Global Variables
  public addSuburbForm:FormGroup;
  public cities;

  // Default Constructors
  constructor(private aService:AddUserService,
              private formBuilder:FormBuilder,
              private tService:ToastrNotificationService,
              private router:Router,
              private service:SuburbService,
              private location:Location) { }

  // Form Load
  ngOnInit() {
      // Form Validation
      this.buildForm();

      // City Load up
      this.aService.getCity()
          .subscribe(
              data => this.cities = data,
              error => this.tService.handleError(error));
  }

  // Add suburb function
  addSuburb(e) {
    if(e.valid) {
      let param:iSuburb = {
        cityID:e.value['city'],
          suburbName:e.value['name']
      };
      this.service.addSuburb(param)
          .subscribe
          (
            data=> {
                if(data == true) {
                    this.tService.addSuburbSuccess();
                    e.reset();
                }
            },error => this.tService.handleError(error));
    }
  }

  // Add city Relocate
  addCity(e) {
      if (e == 'manage city') {
          this.router.navigate(['city']);
      }
  }

  // Locate Back
  locateBack() {
      this.location.back();
  }

  // Form Builder
  buildForm():void {
    this.addSuburbForm = this.formBuilder.group({
        'city': ['', Validators.required],
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(45)])]
    });
  }
}
