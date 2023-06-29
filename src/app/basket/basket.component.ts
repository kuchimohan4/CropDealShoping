import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { basketService } from './basket.service';
import { async } from 'rxjs';
import { productservice } from '../shop-list/products/products.service';
import { proileservice } from '../profile/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderBillComponent } from './order-bill/order-bill.component';

declare var Razorpay:any;


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private authservice:AuthenticationService,private router:Router,private basketService:basketService,private productService:productservice,private profileservice:proileservice,private matdialo:MatDialog){}
  error:any;
  couponError:any;
  couponapplied=false;
  couponCode='';
  coupon:{coupon:string,couponDiscount:number,couponId:number,enddate:Date,maxLimit:number,startDate:Date}={coupon:'',couponDiscount:0,couponId:0,enddate:new Date,maxLimit:0,startDate:new Date};
  basket:{productId:string,productName:string,productQuantity:number,productRating:number,AvalibleQuantity:number,productPrice:number}[]=[]

  priceDetails:{totalAmount:number,totalDiscount:number}={totalAmount:0,totalDiscount:0};
  ngOnInit(): void {
    this.basketService.getcartItems().subscribe(async(res)=>{
      if(res.status===200){
        for(let cart of res.body){
          let basketitem:{productId:string,productName:string,productQuantity:number,productRating:number,AvalibleQuantity:number,productPrice:number}=
          {productId:cart.product.productId,productName:cart.product.productName,productQuantity:cart.quantity,
            productRating:0,AvalibleQuantity:cart.product.availableQuantity,productPrice:cart.product.price}

            const prodrating=await this.productService.getProductrating(cart.product.productId).toPromise();
            if(prodrating){
              basketitem.productRating=prodrating.avgrating;
            }
          this.basket.push(basketitem);
        }
      }
      this.getTotalAmount();
    })
    
  }

  getTotalAmount(){
    this.priceDetails.totalAmount=0;  
    this.basket.forEach((product)=>{ 
      this.priceDetails.totalAmount=this.priceDetails.totalAmount+product.productPrice*product.productQuantity;
      })
  }

  quantityIncresend(productId:string){
     
    let cartinput:{productId:string,quantity:number}={productId:productId,quantity:1}
    this.basketService.increseCartitem(cartinput).subscribe((res)=>{
      if(res.status===200){
        this.basket.forEach((product)=>{ 
      
          if(product.productId===productId){
            if(!(product.productQuantity===product.AvalibleQuantity)){
            product.productQuantity=product.productQuantity+1;
            }
            
          }
    
        })
        this.getTotalAmount();
        this.getdiscount()
      }else{
        console.log(res)
      }
    },error=>{
      this.error=error.error.message;
    }) 
    
  }

  quantitydecresed(productId:string){

    let cartinput:{productId:string,quantity:number}={productId:productId,quantity:1}
      this.basketService.decreseCartItem(cartinput).subscribe((res)=>{
        if(res.status===200){
          this.basket.forEach((product)=>{ 
      
            if(product.productId===productId){
              if(!(product.productQuantity===0)){
              product.productQuantity=product.productQuantity-1;
              }
            }
      
          })
          this.getTotalAmount();
          this.getdiscount()
         }
      },error=>{
        this.error=error.error.message;
      })
     

    
  }

  removecouponerror(){
    this.couponError='';
  }

  applyCoupon(){
    this.couponError='';
    this.basketService.validateCoupon(this.couponCode).subscribe(res=>{
      if(res.status===200){
        if(res.body){
          this.coupon=res.body;
          this.couponapplied=true;
          this.getdiscount()
        }else{
          this.couponError="Invalid Coupon"
        }
      }
      else{
        console.log(res)
        this.couponError="Invalid Coupon"
      }
    },error=>{
      this.couponError=error.error;
    })

  }
  removeCoupon(){
    this.couponapplied=false;
    this.priceDetails.totalDiscount=0;
  }

  getdiscount(){
    let  discount=this.coupon.couponDiscount*this.priceDetails.totalAmount/100 <this.coupon.maxLimit ? this.coupon.couponDiscount*this.priceDetails.totalAmount/100:this.coupon.maxLimit;
    this.priceDetails.totalDiscount=discount;
  }


  placeorder(){
   let placeOrderInput:{copon:string}={copon:this.coupon.coupon};
    this.basketService.placeCartOrder(placeOrderInput).subscribe((res)=>{
      if(res.status===200){
        if(res.body){
           let razopayinput:{orderId: string,  "currency": string, "amount": string, "key":string}=res.body;
           this.openPaymentGateway(razopayinput);
        }
      }
    })
  }

  openPaymentGateway(razopayinput:{orderId: string,  "currency": string, "amount": string, "key":string}){
    var options={
      order_id:razopayinput.orderId,
      key_id:razopayinput.key,
      amount:razopayinput.amount,
      currency:razopayinput.currency,
      name:'KUCHI\'S',
      description:'payment for grocerries',
      image:'assets/images/icon.png',
      handler:(response:any)=>{
        if(response !=null && response.razorpay_payment_id !=null){
         let orderconformation: { "orderid":string,
            "razorpay_payment_id":string,
            "razorpay_order_id":string,
            "razorpay_signature": string }={orderid:razopayinput.orderId,razorpay_payment_id:response.razorpay_payment_id,razorpay_order_id:response.razorpay_order_id,razorpay_signature:response.razorpay_signature}
            console.log(orderconformation)
            this.basketService.paymentConformationCart(orderconformation).subscribe((res:any)=>{
              this.basketService.orderid=res.orderId;
              this.openBill();
            },error=>{
              console.log(error);

            });
          }
        else{
          alert('payment failed')
        }
        
      },
      prefill:{
          name:'kuchi',
          email:'kuchimohan4@gmail.com',
          contact:'7993319726'
      },
      notes:{
        address:'KUCHI"S Veggies'
      },
      theme:{
        color:'#34eb83'
      }
    };

    var rozorpayobj= new Razorpay(options);
    rozorpayobj.open();
    
  } 


  openBill(){
    this.matdialo.open(OrderBillComponent,{
     width:'60%'
    })

    
   }

}
