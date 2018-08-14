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
  public imageSrc:string;
  public today:any;

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
    this.buildForm();


    this.today = new Date();
  }
  getLocation()
  {
    this.location.getLocation().subscribe(data=>this.position=data);

  }
  readURL(event:any): void
  {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
    }
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
    console.log(param);
    this.service.AddEquipment(param).subscribe(data=> {
      console.log(data);
      let r=data[0];
      if(r['barcodeError']>=0)
      {
        this.barcodeError=true;
        this.tService.barcodeInUse(e.value['barcode']);
      }
      else
      {
        console.log("Im in the else");
        try {
          let image = this.newEquipmentImage.nativeElement;
          let newImage = image.files[0];
          console.log(image.files[0]);
          let allowedImages = ['image/jpg','image/png'];
          if(allowedImages.indexOf(newImage.type) >=0) {
            console.log('IF statement was true');
              let frmData = new FormData();
              frmData.append('file', newImage);
              this.service.uploadImage(frmData).subscribe();
          }
          else
          {
            console.log("IF statement was false")
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
        'barcode':['',Validators.compose([Validators.required,Validators.maxLength(12),Validators.minLength(12)])],
        'suppliers':['',Validators.required]
        
    });
}
  
}


