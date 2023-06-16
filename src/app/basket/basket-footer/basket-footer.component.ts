import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { BasketComponent } from '../basket.component';

@Component({
  selector: 'app-basket-footer',
  templateUrl: './basket-footer.component.html',
  styleUrls: ['./basket-footer.component.css']
})
export class BasketFooterComponent {
  constructor(private matdialo:MatDialog){}

   cart:{totalCartItems:number,totalCartPrice:number}={totalCartItems:2,totalCartPrice:250.0};

  productinCart=true;


  opencart(){
   this.matdialo.open(BasketComponent,{
    width:'60%',
   })
  }

}
