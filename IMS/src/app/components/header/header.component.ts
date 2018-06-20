import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Global Declaration
  private iT = [ {'path': '/Add User', 'name': 'Add User'}, {'path': '/Remove User', 'name': 'Remove User'}];
  private tE = [ {'path': '/Add Equipment', 'name': 'Add Equipment'}, {'path': '/Update Equipment', 'name': 'Update Equipment'},
      {'path': '/Locate Equipment', 'name': 'Locate Equipment'}];
  private sH = [ {'path': '/Void Equipment', 'name': 'Dispose Equipment'}];
  private router = [];
  private userType = null;
  // Default Constructor
  constructor() { }

  // Page Load
  ngOnInit() {
    this.userType = 1;
    if (this.userType === 1) {
      this.router = this.iT;
    } else if (this.userType === 2) {
      this.router = this.tE;
    } else if (this.userType === 3) {
      this.router = this.tE.concat(this.sH);
    }
  }
}
