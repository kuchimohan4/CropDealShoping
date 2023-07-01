import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { BasketComponent } from '../basket.component';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { basketService } from '../basket.service';

@Component({
  selector: 'app-basket-footer',
  templateUrl: './basket-footer.component.html',
  styleUrls: ['./basket-footer.component.css']
})
export class BasketFooterComponent implements OnInit{
  constructor(private matdialo:MatDialog,private authservice:AuthenticationService,private basketService:basketService){}
  role:string='';

   cart:{totalCartItems:number,totalCartPrice:number}={totalCartItems:0,totalCartPrice:0};

  productinCart=true;

  ngOnInit(): void {
    this.role=this.authservice.getauth().role;
    this.basketService.getcartItems().subscribe((res=>{
      if(res.status===200){
      for(let cartitem of res.body){
        this.cart.totalCartItems=this.cart.totalCartItems+cartitem.quantity;
        this.cart.totalCartPrice=this.cart.totalCartPrice+cartitem.quantity*cartitem.product.price;
      }

    }
    }))

    this.basketService.cartChanged.subscribe((change)=>{
      this.getcart()
    })
    
  }


  getcart(){
    this.cart={totalCartItems:0,totalCartPrice:0};
    this.basketService.getcartItems().subscribe((res=>{
      if(res.status===200){
      for(let cartitem of res.body){
        this.cart.totalCartItems=this.cart.totalCartItems+cartitem.quantity;
        this.cart.totalCartPrice=this.cart.totalCartPrice+cartitem.quantity*cartitem.product.price;
      }

    }
    }))

  }


  opencart(){
   this.matdialo.open(BasketComponent,{
    width:'60%',
   })
  }

}
