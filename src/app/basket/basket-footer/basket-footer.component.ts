import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { BasketComponent } from '../basket.component';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-basket-footer',
  templateUrl: './basket-footer.component.html',
  styleUrls: ['./basket-footer.component.css']
})
export class BasketFooterComponent implements OnInit{
  constructor(private matdialo:MatDialog,private authservice:AuthenticationService){}
  role:string='';

   cart:{totalCartItems:number,totalCartPrice:number}={totalCartItems:2,totalCartPrice:250.0};

  productinCart=true;

  ngOnInit(): void {
    this.role=this.authservice.getauth().role;
    
  }



  opencart(){
   this.matdialo.open(BasketComponent,{
    width:'60%',
   })
  }

}
