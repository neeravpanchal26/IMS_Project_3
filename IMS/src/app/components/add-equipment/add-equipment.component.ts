import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEquipmentService, iAddEquipment} from './add-equipment.service';
import { GeoLocationService } from '../../globalServices/geolocation.service';
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";
import { FormGroup, FormBuilder,Validators,Form } from '../../../../node_modules/@angular/forms';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
  providers:[AddEquipmentService,DatePipe]
})

export class AddEquipmentComponent implements OnInit {
  @ViewChild ('EquipmentImage') newEquipmentImage;
  public brands:any;
  public status:any;
  public position:any;
  public coords:any;
  public users:any;
  public types:any;
  public conditions:any;
  public sections:any;
  public suppliers:any;
  public addEquipmentForm:FormGroup;
  public barcodeError:boolean;
  public today:any;
  public defaultImage:any;

constructor(private service:AddEquipmentService,
            private location:GeoLocationService,
            private tService:ToastrNotificationService,
            private fBuilder:FormBuilder,
            private date:DatePipe) {}
  
  ngOnInit()
  {
    this.service.GetBrands().subscribe(data=>this.brands=data);
    this.service.GetStatus().subscribe(data=>this.status=data);
    this.service.GetConditions().subscribe(data=>this.conditions=data);
    this.service.GetSections().subscribe(data=>this.sections=data);
    this.service.GetTypes().subscribe(data=>this.types=data);
    this.service.GetSuppliers().subscribe(data=>this.suppliers=data);
    this.defaultImage='/assets/blank350x150.png';
    this.buildForm();


    this.today = new Date();
  }
  getLocation()
  {
    this.location.getLocation().subscribe(data=>this.position=data);

  }
  getToday(e)
  {
    let now=this.date.transform(this.today,'yyyy-MM-dd');
    console.log(now);

    this.addEquipmentForm.controls['dateReceived'].setValue(now);
  }
  addEquipment(e,type)
  {
    let param:iAddEquipment=
    {
      name:e.value['name'],
      desc:e.value['desc'],
      cost:e.value['cost'],
      equipmentCondition:e.value['condition'],
      brand:e.value['brand'],
      section:e.value['section'],
      type:e.value['type'],
      dateReceived:e.value['dateReceived'],
      barcode:e.value['barcode'],
      supplier:e.value['suppliers']
    };
    this.service.AddEquipment(param).subscribe(data=> {
      console.log(JSON.stringify(data));
      let r = data[0];
      if(r['barcodeError']==1)
      {
        console.log(r);
        this.barcodeError=true;
      }
      else if(r['TRUE']==1)
      {
        this.tService.addEquipmentSuccess(e.value['name']);
        try {
          let image = this.newEquipmentImage.nativeElement;
          let newImage = image.files[0];
          console.log(newImage);
          let allowedImages = ['image/jpeg','image/png'];
          if(allowedImages.indexOf(newImage.type) >-1) {
              let frmData = new FormData();
              frmData.append('file', newImage);
              this.service.uploadImage(frmData).subscribe();
          }
      } catch {}
      }});
  }
  buildForm():void {
    this.addEquipmentForm = this.fBuilder.group({
        'name':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
        'desc':[],
        'cost':['',Validators.compose([Validators.required,Validators.maxLength(50)])],
        'condition':['',Validators.required],
        'brand':['',Validators.required],
        'section':['',Validators.required],
        'type':['',Validators.required],
        'dateReceived':['',Validators.required],
        'barcode':['',Validators.compose([Validators.required,Validators.maxLength(24),Validators.minLength(12)])],
        'suppliers':['',Validators.required]
        
    });
}
  
}


