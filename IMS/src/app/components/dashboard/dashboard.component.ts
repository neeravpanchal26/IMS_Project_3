import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LoginService} from "../login/login.service";
import { DashboardService} from "./dashboard.service";
import {ToastrService} from "ngx-toastr";
import {handleError} from "../error/error";

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

  // Default Constructor
  constructor(private login:LoginService,
              private service:DashboardService,
              private toastr:ToastrService) { }

  // Form Load
  ngOnInit() {
      this.userType = this.login.getUserType();
    if(this.userType === 1) {
        this.service.getUsers()
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
                this.barChart(firstName,count,color,'User movement in past 7 days.','Users','# of logins');
            },
                //Error handling
                error => this.toastr.error(handleError(error),'Oops!'));
    }
  }
  // User Data
  userData(input,username) {
      this.service.getIndivdualData(input)
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
              this.barChart(loginDate,count,color,username + "'s" + ' movement in past 7 days.','Dates','# of logins');
          },
              error => this.toastr.error(handleError(error),'Oops!')
              )
  }

  // Dynamic chart function
  barChart(xAxis, yAxis, color, title,xTitle,yTitle) {
      this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
              labels: xAxis,
              datasets: [{
                  data: yAxis,
                  backgroundColor: color
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
}
