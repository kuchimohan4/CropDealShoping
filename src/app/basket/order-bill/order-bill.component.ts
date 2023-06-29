import { Component,Input,OnInit } from '@angular/core';
import { basketService } from '../basket.service';
import { async } from 'rxjs';
import { productservice } from 'src/app/shop-list/products/products.service';

@Component({
  selector: 'app-order-bill',
  templateUrl: './order-bill.component.html',
  styleUrls: ['./order-bill.component.css']
})
export class OrderBillComponent implements OnInit {
  
  orderid:any=0;
  constructor(private basketService:basketService,private productService:productservice){}
  error:any

  products:{productId:string,productName:string,productPrice:number,productQuantity:number,totalPrice:number}[]=[];
  invoice:{billId:number,date:Date,amountPaid:number}={billId:0,date:new Date,amountPaid:0};
  bill:{totalAmount:number,DiscountAmount:number,amountPaid:number}={totalAmount:0,DiscountAmount:0,amountPaid:0}

ngOnInit(): void {
  
}

onintial(){
  this.orderid=this.basketService.orderid;
  console.log(this.orderid);
  this.basketService.getorder(this.orderid).subscribe(async (res:any)=>{
    if(res.status===200){
      this.invoice={billId:res.body.bill.billId,date:new Date(res.purchaseTime),amountPaid:res.body.bill.payableAmount};
      this.bill={totalAmount:res.body.bill.totalAmount,DiscountAmount:res.body.bill.discountAmount,amountPaid:res.body.bill.payableAmount};
      for (let [index, prod] of res.body.productIdList.entries()){
        {
          const dbproduct: any = await this.productService.getproductById(prod).toPromise();
          if (dbproduct) {
            console.log(dbproduct)
            const prodetail: {
              productId: string,
              productName: string,
              productPrice: number,
              productQuantity: number,
              totalPrice: number
            } = {
              productId: dbproduct.productId,
              productName: dbproduct.productName,
              productPrice: dbproduct.price,
              productQuantity: res.body.quantity[index], 
              totalPrice: dbproduct.price*res.body.quantity[index]
            };
            this.products.push(prodetail);
            console.log(prodetail)
          }
        }
      }

      console.log(this.products);
      console.log(this.bill);
      console.log(this.invoice)
    }else{
      console.log(res)
    }
  },error=>{
    console.log(error);
    this.error=error.error.message;
  })
}



}
