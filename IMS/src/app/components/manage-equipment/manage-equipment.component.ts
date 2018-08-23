import { Component, OnInit } from '@angular/core';
import { ManageEquipmentService, iActivateEquipment } from './manage-equipment.service';
import { ToastrNotificationService } from '../../globalServices/toastr-notification.service';
import * as jsPdf from 'jspdf';
import * as html2Canvas from 'html2canvas';
@Component({
  selector: 'app-manage-equipment',
  templateUrl: './manage-equipment.component.html',
  styleUrls: ['./manage-equipment.component.css'],
  providers: [ManageEquipmentService]
  
})
export class ManageEquipmentComponent implements OnInit {
  // Global Variables
  public info:any;
  public filter:null;
  public qrSerial;
  constructor(private service:ManageEquipmentService, private toast:ToastrNotificationService) { }

  ngOnInit() {
    this.service.GetEquipmentInfo().subscribe(data=>this.info=data);
  }
  activeEquipment(e,id,name,serial)
  {
    
    let active;
    if(e==true)
    {
      active=1;
    }
    else if(e==false)
    {
      active=0;
    }
    let param: iActivateEquipment={id:id,active:active}
    this.service.ActivateEquipment(param).subscribe(
      data=>
      {
        if(data==true)
        {
          if(e==true)
          {
            this.qrSerial=serial;
            this.onClick();
            this.toast.equipmentActivateSuccess(name);
          }
          else if(e==false)
          {
            this.toast.equipmentDeactivateSuccess(name);
          }
        }
      }

    );
  }
 // Qr to PDF
 onClick() {
  var data = document.getElementById('qrCode');
  html2Canvas(data).then(
      canvas => {
      // Image settings
      var imgWidth = 150;
      var pageHeight = 200;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      // A4 size page of PDF
      let pdf = new jsPdf('p', 'mm', 'a4');
      var topPx = 5;
      var leftPx = 5;
      pdf.addImage(contentDataURL, 'PNG', leftPx, topPx, imgWidth, imgHeight);
      // Generated PDF
      pdf.save(this.qrSerial+'.pdf');
  });
}

}
