import { Component,OnInit } from '@angular/core';
import { basketService } from '../basket/basket.service';
import { productservice } from '../shop-list/products/products.service';
import { async } from 'rxjs';
import { AuthenticationService } from '../auth/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  error:any;
  constructor(private basketservice:basketService,private productservice:productservice,private authservice:AuthenticationService){}
  role:string='';
  orderData:any[]=[];
  ngOnInit(): void {
    this.role=this.authservice.getauth().role;
    if(this.authservice.getauth().role==='DEALER'){
    this.basketservice.getOrderOfDelear().subscribe( async(res:any)=>{
      if(res.status===200){
      for(let order of res.body){ 
       let orderitem:{orderId:number,products:{productName:string,productPrice:number,productQuantity:number,totalPrice:number}[],amountPaid:number,totalPrice:number,discount:number}=
        {
          orderId:order.orderId,products:[],amountPaid:order.bill.payableAmount,totalPrice:order.bill.totalAmount,discount:order.bill.discountAmount
        }
        for(let [index, productid] of order.productIdList.entries()){
          const product:any=await this.basketservice.getproductById(productid).toPromise();
          if(product){
           let productdetails:{productName:string,productPrice:number,productQuantity:number,totalPrice:number}=
            {productName:product.body.productName,productPrice:product.body.price,productQuantity:order.quantity[index],totalPrice:product.body.price*order.quantity[index]}
            orderitem.products.push(productdetails);
          }
        }
        this.orderData.push(orderitem);

      }

    }
    this.sortappdate()
  },error=>{
      this.error=error.error.message;
    })
  }else if(this.authservice.getauth().role==='FARMER'){
    this.basketservice.getOdersOfFarmer().subscribe(async(res:any)=>{
      if(res.status===200){
        for(let order of res.body){
          let orderitem:{orderId:number,products:{productName:string,productPrice:number,productQuantity:number,totalPrice:number}[],amountPaid:number,totalPrice:number,discount:number}=
        {
          orderId:order.orderId,products:[],amountPaid:0,totalPrice:0,discount:0
        }
        for(let [index, productid] of order.productIdList.entries()){
          const product:any=await this.basketservice.getproductById(productid).toPromise();
          if(product){
            if(product.body.farmerId==this.authservice.getauth().id){
           let productdetails:{productName:string,productPrice:number,productQuantity:number,totalPrice:number}=
            {productName:product.body.productName,productPrice:product.body.price,productQuantity:order.quantity[index],totalPrice:product.body.price*order.quantity[index]}
            orderitem.products.push(productdetails);
            orderitem.totalPrice=orderitem.totalPrice+product.body.price*order.quantity[index]
            }
          }
        }
        orderitem.discount=orderitem.totalPrice/10;
        orderitem.amountPaid=orderitem.totalPrice-orderitem.totalPrice/10;
        this.orderData.push(orderitem);
        }
      }
      this.sortappdate()
      
    })
    
  }else if(this.role==='ADMIN'){
    this.basketservice.getallOrders().subscribe( async(res:any)=>{
      if(res.status===200){
      for(let order of res.body){ 
       let orderitem:{orderId:number,products:{productName:string,productPrice:number,productQuantity:number,totalPrice:number,farmerId:number}[],amountPaid:number,totalPrice:number,discount:number,delearId:number}=
        {
          orderId:order.orderId,products:[],amountPaid:order.bill.payableAmount,totalPrice:order.bill.totalAmount,discount:order.bill.discountAmount,delearId:order.marchentId
        }
        for(let [index, productid] of order.productIdList.entries()){
          const product:any=await this.basketservice.getproductById(productid).toPromise();
          if(product){
           let productdetails:{productName:string,productPrice:number,productQuantity:number,totalPrice:number,farmerId:number}=
            {productName:product.body.productName,productPrice:product.body.price,productQuantity:order.quantity[index],totalPrice:product.body.price*order.quantity[index],farmerId:product.body.farmerId}
            orderitem.products.push(productdetails);
          }
        }
        this.orderData.push(orderitem);

      }

    }
    this.sortappdate()
  },error=>{
      this.error=error.error.message;
    })

  }
   
    
  }


  sortappdate(){
    this.orderData.sort((a, b) => b.orderId - a.orderId);
    console.log(this.orderData)
  }

}
