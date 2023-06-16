import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private matdialo:MatDialog){}

  isDropdownOpen=false;


  openDropdown(){
    this.isDropdownOpen=!this.isDropdownOpen;
  }

  opencart(){
    this.matdialo.open(BasketComponent,{
     width:'60%',
    })
   }


}
