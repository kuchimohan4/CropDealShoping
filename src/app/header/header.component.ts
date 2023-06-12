import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isDropdownOpen=false;


  openDropdown(){
    this.isDropdownOpen=!this.isDropdownOpen;
  }


}
