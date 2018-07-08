import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LoginService} from "../login/login.service";
import { DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
    providers:[DashboardService]
})
export class DashboardComponent implements OnInit {
  // Global Variable
  chart = [];
  public user = [];

  // Default Constructor
  constructor(private login:LoginService,private service:DashboardService) { }

  // Form Load
  ngOnInit() {
    let userType = this.login.getUserType();
    if(userType === 1) {
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
                this.chartFunction('bar',firstName,count,color,'The users in past 7 days.');
            });
    }
  }
  // Dynamic chart function
  chartFunction(type,label,data,color,title) {
      this.chart = new Chart('canvas', {
          type: type,
          data: {
              labels: label,
              datasets: [{
                  label: title,
                  data: data,
                  backgroundColor: color
              }]
          },
          options: {
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
