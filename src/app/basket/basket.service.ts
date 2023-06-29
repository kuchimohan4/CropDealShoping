import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class basketService{

    constructor(private http:HttpClient,private authservice:AuthenticationService,private roter:Router){}
    orderid:any;


    getcartItems(){
        return  this.http.get<any>('http://localhost:8765/inventry/getCartItemsByMarchent',{ observe: 'response' });
    
      }

    increseCartitem(cartinput:{productId:string,quantity:number}){

       return this.http.post('http://localhost:8765/inventry/addtocart',cartinput,{ observe: 'response' });
    }

    decreseCartItem(cartinput:{productId:string,quantity:number}){
        
      return  this.http.put('http://localhost:8765/inventry/reduceFromCart',cartinput,{ observe: 'response' });
    }

    validateCoupon(couponCode:string){

      return this.http.get<{coupon:string,couponDiscount:number,couponId:number,enddate:Date,maxLimit:number,startDate:Date}>('http://localhost:8765/order/getCouponByName/'+couponCode,{ observe: 'response' });

    }


    placeCartOrder(placeorderInput:{copon:string}){
      return  this.http.post<{orderId: string,  "currency": string, "amount": string, "key":string}>('http://localhost:8765/order/orderCartProducts',placeorderInput,{ observe: 'response' });
    }

    paymentConformationCart(orderconformation: { "orderid":string,
    "razorpay_payment_id":string,
    "razorpay_order_id":string,
    "razorpay_signature": string }){
      
      return this.http.post('http://localhost:8765/order/cartPaymentConformation',orderconformation);
    }


    getorder(orderId:number){
      return this.http.get("http://localhost:8765/order/getOrderByOrderId/"+orderId,{ observe: 'response' });
    }

}