import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  couponapplied=false;
  coupon:{couponName:string,couponDiscount:number}={couponName:'Diwali10',couponDiscount:1000};
  basket:{productId:string,productName:string,productQuantity:number,productRating:number,AvalibleQuantity:number,productPrice:number}[]=[]

  priceDetails:{totalAmount:number,totalDiscount:number}={totalAmount:0,totalDiscount:0};
  ngOnInit(): void {
    this.basket=[{productId:"pro1",productName:"Brianjle",productQuantity:5,productRating:4.5,AvalibleQuantity:16,productPrice:40},
    {productId:"pro2",productName:"Brianjle",productQuantity:6,productRating:4.5,AvalibleQuantity:13,productPrice:50},
    {productId:"pro3",productName:"Brianjle",productQuantity:9,productRating:4.5,AvalibleQuantity:10,productPrice:20},
    {productId:"pro4",productName:"Brianjle",productQuantity:1,productRating:4.5,AvalibleQuantity:5,productPrice:35},
    {productId:"pro5",productName:"Brianjle",productQuantity:8,productRating:4.5,AvalibleQuantity:3,productPrice:65},
    {productId:"pro6",productName:"Brianjle",productQuantity:5,productRating:4.5,AvalibleQuantity:7,productPrice:30},
    {productId:"pro1",productName:"Brianjle",productQuantity:5,productRating:4.5,AvalibleQuantity:16,productPrice:40},
    {productId:"pro2",productName:"Brianjle",productQuantity:6,productRating:4.5,AvalibleQuantity:13,productPrice:50},
    {productId:"pro3",productName:"Brianjle",productQuantity:9,productRating:4.5,AvalibleQuantity:10,productPrice:20},
    {productId:"pro4",productName:"Brianjle",productQuantity:1,productRating:4.5,AvalibleQuantity:5,productPrice:35},
    {productId:"pro5",productName:"Brianjle",productQuantity:8,productRating:4.5,AvalibleQuantity:3,productPrice:65},
    {productId:"pro6",productName:"Brianjle",productQuantity:5,productRating:4.5,AvalibleQuantity:7,productPrice:30} ]
    this.getTotalAmount();
  }

  getTotalAmount(){

    this.basket.forEach((product)=>{ 
      this.priceDetails.totalAmount=this.priceDetails.totalAmount+product.productPrice*product.productQuantity;
      })

  }

  quantityIncresend(productId:string){
     
      
    this.basket.forEach((product)=>{ 
      
      if(product.productId===productId){
        if(!(product.productQuantity===product.AvalibleQuantity)){
        product.productQuantity=product.productQuantity+1;
        }
        
      }

    })
    this.getTotalAmount();
  }

  quantitydecresed(productId:string){

    this.basket.forEach((product)=>{ 
      
      if(product.productId===productId){
        if(!(product.productQuantity===0)){
        product.productQuantity=product.productQuantity-1;
        }
      }

    })
    this.getTotalAmount();
  }

  applyCoupon(){
    this.couponapplied=true;
    this.priceDetails.totalDiscount=this.coupon.couponDiscount;
  }
  removeCoupon(){
    this.couponapplied=false;
    this.priceDetails.totalDiscount=0;
  }

}
