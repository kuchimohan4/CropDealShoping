import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { productservice } from '../products.service';
import { basketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  isowner=false;
  role='';
  shopId=0;
  error:any;
  constructor(private activeroute:ActivatedRoute,private authservice:AuthenticationService,private productservice:productservice,private basketservice:basketService){}
  ngOnInit(): void {
    
    this.activeroute.params.subscribe((params)=>{
      this.role=this.authservice.getauth().role;
      if(params['id']){
        this.shopId=params['id']
        if(this.shopId===this.authservice.getauth().id){
          this.isowner=true;
        }
        this.productservice.getproductsoffarmer(this.shopId).subscribe((responce)=>{
          
        }, error=>{
          this.error=error.error.message
        })
        this.productservice.productschanged.subscribe(async (productlist)=>{
          productlist.forEach(async (productdb)=>{
            let product:{productId:string,productName:string,productPrice:number,ProductDescription:string,
              productRating:number,productQuantityAvl:number,productImg:string,CartQuantity:number,productimgfile:any}={
                productId:productdb.productId,productName:productdb.productName,productPrice:productdb.price,ProductDescription:productdb.productDetails,
              productRating:4.1,productQuantityAvl:productdb.availableQuantity,productImg:productdb.productImages.length ? productdb.productImages[0] : '',CartQuantity:0,productimgfile:''}

              if (productdb.productImages.length) {
                const imageResponse = await this.productservice.getImage(
                  productdb.farmerId + '_' + productdb.productName + '_productImg'
                ).toPromise();
              
                if (imageResponse) {
                  product.productimgfile = imageResponse;
                  product.productImg = URL.createObjectURL(imageResponse);
                } 
              }
              const prodrating=await this.productservice.getProductrating(product.productId).toPromise();
              if(prodrating){
                product.productRating=prodrating.avgrating;
              }
             const cartitems=await  this.basketservice.getcartItems().toPromise();
             if(cartitems){
                if (cartitems.status === 200) {
                  for (let cartitem of cartitems.body) {
                      if (product.productId === cartitem.product.productId) {
                        product.CartQuantity = cartitem.quantity;
                      }
                  }
                }
             }
             
              this.products.push(product);
          });

          

        })

        

      }
    })

  }

  

  products:{productId:string,productName:string,productPrice:number,ProductDescription:string,
    productRating:number,productQuantityAvl:number,productImg:string,CartQuantity:number,productimgfile:any}[]=[];


    quantityIncresend(productId:string){
     let cartinput:{productId:string,quantity:number}={productId:productId,quantity:1}
      this.basketservice.increseCartitem(cartinput).subscribe((res)=>{
        if(res.status===200){
          this.products.forEach((product)=>{ 
            if(product.productId===productId){
              if(!(product.CartQuantity===product.productQuantityAvl)){
              product.CartQuantity=product.CartQuantity+1;
              }
            }
    
          })
        }else{
          console.log(res)
        }
      },error=>{
        this.error=error.error.message;
      })
      
    }

    quantitydecresed(productId:string){
      let cartinput:{productId:string,quantity:number}={productId:productId,quantity:1}
      this.basketservice.decreseCartItem(cartinput).subscribe((res)=>{
        if(res.status===200){
          this.products.forEach((product)=>{ 
        
            if(product.productId===productId){
              if(!(product.CartQuantity===0)){
              product.CartQuantity=product.CartQuantity-1;
              }
            }else{
              console.log(res);
            }
          })}
      },error=>{
        this.error=error.error.message;
      })
     
    }

}
