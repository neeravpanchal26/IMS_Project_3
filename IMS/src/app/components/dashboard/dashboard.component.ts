import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LoginService} from "../login/login.service";
import { DashboardService} from "./dashboard.service";
import { ToastrNotificationService} from "../../globalServices/toastr-notification.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
    providers:[DashboardService]
})
export class DashboardComponent implements OnInit {
  // Global Variable
  chart = Chart;
  public user = [];
  public userType;
  public userID:any;
  public filter = null;
  public days:number=7;
  public title:any;
  public equipmentExtras:any;
  public equipmentHistoryExtras:any;

  // Default Constructor
  constructor(private login:LoginService,
              private service:DashboardService,
              private tService:ToastrNotificationService) { }

  // Form Load
  ngOnInit() {
    this.userType = this.login.getUserType();
    this.userID = this.login.getUserID();

    if(this.userType === 1) {
        this.itAdminChart();
    }
    else if(this.userType ===2) {
        this.technicalEmployeeEquipmentChart();
    }
    else if (this.userType === 3) {
        this.sectionHeadEquipmentChart();
    }
  }

  // Set days
  setDays(e) {
      this.days = e;

      if(this.userType === 1) {
          this.itAdminChart();
      }
      else if(this.userType ===2) {
          this.technicalEmployeeEquipmentChart();
      }
      else if (this.userType === 3) {
          this.sectionHeadEquipmentChart();
      }
  }

  // IT Admin dashboard chart
  itAdminChart() {
      this.service.getUsers(this.days)
          .subscribe
          (data => {
                  // Full Data for table display
                  this.user = data;

                  // First name column data for labels
                  let firstName = data.map(function(value,index) {return value['FirstName'];});

                  // Count column for chart data
                  let count = data.map(function(value,index) {return value['count'];});

                  // Parsing data to chart and generating chart
                  this.barChart(firstName,count,'User movement in past '+this.days+' days.','Users','# of logins','ItAdminCanvas');
              },
              //Error handling
              error => this.tService.handleError(error));
  }

  // User Data
  itAdminUserData(input, username) {
      this.service.getIndivdualData(input,this.days)
          .subscribe(
              data => {
              //Dates Load up
              let loginDate = data.map(function(value,index) {return value['loginDate'];});

              // Count column for chart data
              let count = data.map(function(value,index) {return value['count'];});

              // Parsing data to chart and generating chart
              this.chart.destroy();
              this.barChart(loginDate,count,username + "'s" + ' movement in past '+this.days+' days.','Dates','# of logins','ItAdminCanvas');
          },
              error => this.tService.handleError(error));
  }

  // Equipment for specific user
  technicalEmployeeEquipmentChart() {
      this.service.getEquipmentUser(this.userID,this.days)
          .subscribe(
              data=> {
                  // Count column for chart data
                  let count = data.map(function(value,index) {return value['count'];});

                  // Date column for chart data
                  let date = data.map(function (value,index) {return value['Date'];});

                  // Parsing data to chart and generating chart
                  this.barChart(date,count,'Equipment allocated to you in '+this.days+' days.','Dates','# of Equipment', 'TechnicalHeadCanvas');
              },
              //Error handling
              error => this.tService.handleError(error)
          );
      this.service.getEquipmentHistoryUser(this.userID,this.days)
          .subscribe
          (
              data=> this.equipmentHistoryExtras = data[0],
              //Error handling
              error => this.tService.handleError(error));

  }

  // Equipment dashboard chart
  sectionHeadEquipmentChart() {
    this.service.getEquipment(this.days)
        .subscribe
        (
            data=>{
                // Count column for chart data
                let count = data.map(function(value,index) {return value['count'];});

                // Date Received column for chart data
                let dateReceived = data.map(function(value,index) {return value['DateReceived'];});

                // Parsing data to chart and generating chart
                this.barChart(dateReceived,count,'Equipment Received in past '+this.days+' days.','Dates','# of Equipment','SectionHeadCanvas');
            },
            //Error handling
            error => this.tService.handleError(error)
        );
      this.service.getEquipmentExtras(this.days)
          .subscribe
          (
              data=> this.equipmentExtras = data[0],
              //Error handling
              error => this.tService.handleError(error));
  }

  // Dynamic chart function
  barChart(xAxis, yAxis, title,xTitle,yTitle,chart) {
      // Chart Title assign
      this.title = title;

      // Chart creation
      this.chart = new Chart(chart, {
          type: 'line',
          data: {
              labels: xAxis,
              datasets: [{
                  borderColor:"#007BFF",
                  data: yAxis,
                  fill: false
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      scaleLabel: {
                          display: true,
                          labelString: yTitle
                      },
                      ticks: {
                          beginAtZero: true
                      }
                  }],
                  xAxes: [{
                      scaleLabel: {
                          display: true,
                          labelString: xTitle
                      }
                  }]
              },
              legend: {
                  display: false
              },
              elements: {
                  line: {
                      tension: 0,
                  }
              },
              responsive: true
          }
      });
  }

  // Sorting
  key: string = 'lastAccess'; //set default
  reverse: boolean = true;

  // Sorting method
  sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
  }
}
