import { AfterViewInit, Component,Input,OnInit } from '@angular/core';
import { basketService } from '../basket.service';
import { async } from 'rxjs';
import { productservice } from 'src/app/shop-list/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { proileservice } from 'src/app/profile/profile.service';

@Component({
  selector: 'app-order-bill',
  templateUrl: './order-bill.component.html',
  styleUrls: ['./order-bill.component.css']
})
export class OrderBillComponent implements OnInit {
  
  orderid:number=0;
  constructor(private basketService:basketService,private productService:productservice,private activeroute:ActivatedRoute,private prifileservice:proileservice){}
  error:any

  products:{farmerId:number,productId:string,productName:string,productPrice:number,productQuantity:number,totalPrice:number}[]=[];
  invoice:{billId:number,date:Date,amountPaid:number}={billId:0,date:new Date,amountPaid:0};
  bill:{totalAmount:number,DiscountAmount:number,amountPaid:number}={totalAmount:0,DiscountAmount:0,amountPaid:0}
  prodlist:string[]=[];
  quntitylist:number[]=[];
  delear:any;
  farmers:any[]=[];
ngOnInit(): void {
  this.activeroute.params.subscribe(params=>{
    if(params['id']){
      this.orderid=params['id'];
    }
  })
  
  this.basketService.getorder(this.orderid).subscribe(async (res:any)=>{
    if(res.status===200){
      console.log(res)
      this.invoice={billId:res.body.bill.billId,date:new Date(res.body.purchaseTime),amountPaid:res.body.bill.payableAmount};
      this.bill={totalAmount:res.body.bill.totalAmount,DiscountAmount:res.body.bill.discountAmount,amountPaid:res.body.bill.payableAmount};
     this.prodlist=res.body.productIdList;
     this.quntitylist=res.body.quantity;
      const profile=await this.prifileservice.getProfileByid(res.body.marchentId).toPromise();
      if(profile){
        this.delear=profile.body;
        }
      for (let [index, prod] of this.prodlist.entries()){
          const dbproduct: any = await this.basketService.getproductById(prod).toPromise();
          if (dbproduct) {
            const prodetail: {
              farmerId:number
              productId: string,
              productName: string,
              productPrice: number,
              productQuantity: number,
              totalPrice: number
            } = {
              farmerId:dbproduct.body.farmerId,
              productId: dbproduct.body.productId,
              productName: dbproduct.body.productName,
              productPrice: dbproduct.body.price,
              productQuantity: this.quntitylist[index], 
              totalPrice: dbproduct.body.price*this.quntitylist[index]
            };
            console.log(prodetail)
            this.products.push(prodetail);
            try{
              const farprofile=await this.prifileservice.getProfileByid(dbproduct.body.farmerId).toPromise();
              if(farprofile){
                this.farmers.push(farprofile.body)
              }
            }catch{
              console.log("no address found for farmer id"+dbproduct.body.farmerId);
            }
            }
        
      }
    }else{
      console.log(res)
    }
  },error=>{
    console.log(error);
    this.error=error.error.message;
  }) 

}

  





}
