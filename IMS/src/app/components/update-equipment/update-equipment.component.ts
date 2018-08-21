import { Component, OnInit } from '@angular/core';
import { UpdateEquipmentService, iGetEquipmentDetails, iUpdateEquipment } from './update-equipment.service';
import { FormGroup, Validators, FormBuilder,Form } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ToastrNotificationService } from '../../globalServices/toastr-notification.service';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.css'],
  providers:[UpdateEquipmentService]
})
export class UpdateEquipmentComponent implements OnInit {

  constructor(private service:UpdateEquipmentService, private fBuilder:FormBuilder, private router:ActivatedRoute,private toastr:ToastrNotificationService) { }
  public brands:any;
  public status:any;
  public position:any;
  public coords:any;
  public users:any;
  public types:any;
  public conditions:any;
  public sections:any;
  public suppliers:any;
  public equipmentDetails:any;
  public updateEquipmentForm:FormGroup;
  public id:any;
  public defaultImage:any;
  ngOnInit() {
    let e:any;
    this.id = parseInt(this.router.snapshot.paramMap.get('id'));

    let param:iGetEquipmentDetails=
    {
      id:this.id
    };
    this.service.GetBrands().subscribe(data=>this.brands=data);
    this.service.GetStatus().subscribe(data=>this.status=data);
    this.service.GetConditions().subscribe(data=>this.conditions=data);
    this.service.GetSections().subscribe(data=>this.sections=data);
    this.service.GetTypes().subscribe(data=>this.types=data);
    this.service.GetSuppliers().subscribe(data=>this.suppliers=data);

    console.log(param);
    console.log(500);
    this.buildForm();
    this.service.getEquipmentDetails(param).subscribe((res:any)=>
    {
      console.log(res);this.getImage(param);
      console.log("Im here");
      this.equipmentDetails=res[0];
      this.updateEquipmentForm.controls['name'].setValue(this.equipmentDetails.Name);
      this.updateEquipmentForm.controls['desc'].setValue(this.equipmentDetails.Desc);
      this.updateEquipmentForm.controls['cost'].setValue(this.equipmentDetails.Cost);
      this.updateEquipmentForm.controls['condition'].setValue(this.equipmentDetails.EquipmentCondition);
      this.updateEquipmentForm.controls['brand'].setValue(this.equipmentDetails.Brand);
      this.updateEquipmentForm.controls['section'].setValue(this.equipmentDetails.Section);
      this.updateEquipmentForm.controls['type'].setValue(this.equipmentDetails.Type);
      this.updateEquipmentForm.controls['dateReceived'].setValue(this.equipmentDetails.DateReceived);
      this.updateEquipmentForm.controls['barcode'].setValue(this.equipmentDetails.Barcode);
      this.updateEquipmentForm.controls['suppliers'].setValue(this.equipmentDetails.Supplier);

      
      

      //this.eName=res[0].Name;
      //this.eDesc=res[0].Desc;
      //this.eCost=res[0].Cost;
      //this.eCondition=res[0].EquipmentCondition;
      //this.eBrand=res[0].Brand;
      //this.eSection=res[0].Section;
      //this.eType=res[0].Type;
      //this.eDate=res[0].DateReceived;
      //this.eBarcode=res[0].Barcode;
      //this.eSupplier=res[0].Supplier;
    });
  }
  readURL(event:any): void
  {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.defaultImage = reader.result;

        reader.readAsDataURL(file);
    }
  }
  getImage(param)
  {
   this.service.getEquipmentImage(param)
       .subscribe(
           data=>
           {
             this.defaultImage = this.service.sanitizeEquipmentPicture(data);
           console.log(this.defaultImage);

           });
  }
  updateEquipment(e)
  {
    let param:iUpdateEquipment=
    {
      id:this.id,
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
    }
    console.log(param);
    this.service.UpdateEquipment(param).subscribe(data=>
      {
        let res=data[0];
        console.log(res);
        
        if(res['eActive']>0)
        {
          this.toastr.equipmentIsActive(this.id);
        }
        else if(res['barcodeError']>0)
        {
          this.toastr.barcodeInUse(e.value['barcode']);
        }
        else
        {
          this.toastr.updateEquipmentSuccess(this.id);
        }
      });
  }
  buildForm():void {
    this.updateEquipmentForm = this.fBuilder.group({
        'name':['',Validators.compose([Validators.required,Validators.maxLength(45)])],
        'desc':[],
        'cost':['',Validators.compose([Validators.required,Validators.maxLength(50)])],
        'condition':['',Validators.required],
        'brand':['',Validators.required],
        'section':['',Validators.required],
        'type':['',Validators.required],
        'dateReceived':['',Validators.required],
        'suppliers':['',Validators.required],
        'barcode':['',Validators.compose([Validators.required,Validators.maxLength(12)])]
    });
}
}