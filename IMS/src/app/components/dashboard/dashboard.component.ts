import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LoginService} from "../login/login.service";
import { DashboardService} from "./dashboard.service";
import { GlobalService} from "../../globalAssets/global.service";

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
  public filter = null;
  public days:number=7;

  // Default Constructor
  constructor(private login:LoginService,
              private service:DashboardService,
              private gService:GlobalService) { }

  // Form Load
  ngOnInit() {
      this.userType = this.login.getUserType();
    if(this.userType === 1) {
        this.dashboardChart();
    }
  }

  // Set days
  setDays(e) {
      this.days=e;
      this.dashboardChart();
  }

  // Users dashboard chart
  dashboardChart() {
      this.service.getUsers(this.days)
          .subscribe
          (data => {
                  // Full Data for table display
                  this.user = data;

                  // First name column data for labels
                  let firstName = data.map(function(value,index) {return value['FirstName'];});

                  // Count column for chart data
                  let count = data.map(function(value,index) {return value['count'];});

                  // Random color per column
                  let color = [];
                  for (let dataKey in data) {
                      color.push(this.colorFunction());
                  }

                  // Parsing data to chart and generating chart
                  this.barChart(firstName,count,color,'User movement in past '+this.days+' days.','Users','# of logins');
              },
              //Error handling
              error => this.gService.handleError(error));
  }
  // User Data
  userData(input,username) {
      this.service.getIndivdualData(input,this.days)
          .subscribe(
              data => {
              //Dates Load up
              let loginDate = data.map(function(value,index) {return value['loginDate'];});

              // Count column for chart data
              let count = data.map(function(value,index) {return value['count'];});

              // Random color per column
              let color = [];
              for (let dataKey in data) {
                  color.push(this.colorFunction());
              }

              // Parsing data to chart and generating chart
              this.chart.destroy();
              this.barChart(loginDate,count,color,username + "'s" + ' movement in past '+this.days+' days.','Dates','# of logins');
          },
              error => this.gService.handleError(error))
  }

  // Dynamic chart function
  barChart(xAxis, yAxis, color, title,xTitle,yTitle) {
      this.chart = new Chart('canvas', {
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
              title: {
                  display: true,
                  text: title
              },
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

  // Random color function
  colorFunction() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
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
