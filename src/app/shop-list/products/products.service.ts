import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Injectable({
    providedIn:'root'
})
export class productservice{

    constructor(private http:HttpClient,private authservice:AuthenticationService,private roter:Router){}

    productsdb:{productId:string,productName:string,farmerId:string,date:Date,availableQuantity:number,price:number,productDetails:string,productImages:string[],status:string}[]=[];
    productdb:any;
    productschanged:Subject<{productId:string,productName:string,farmerId:string,date:Date,availableQuantity:number,price:number,productDetails:string,productImages:string[],status:string}[]>=new Subject();
    productchanged:Subject<{productId:string,productName:string,farmerId:string,date:Date,availableQuantity:number,price:number,productDetails:string,productImages:string[],status:string}>=new Subject();

    saveNewProduct(newprod:{
        productName:String,
        "availableQuantity": number,
        "date": string,
        "price": number,
        "productDetails": string,
        "status": string,
        "productImages": string[]
    }){
      return   this.http.post("http://localhost:8765/inventry/addproduct",newprod,{ observe: 'response' });

    }

    updateProduct(updatedproduct:{
        "productId": string,
        "productName": string,
        "availableQuantity": number,
        "date": Date,
        "price": number,
        "productDetails":string,
        "productImages": string[]
    }){
        return this.http.put('http://localhost:8765/inventry/updateproduct',updatedproduct,{ observe: 'response' });
    }



    getproductsoffarmer(id:number){

        return this.http.get<{productId:string,productName:string,farmerId:string,date:Date,availableQuantity:number,price:number,productDetails:string,productImages:string[],status:string}[]>("http://localhost:8765/inventry/getAllProductOfFarmer/"+id,{ observe: 'response' }).pipe(map((responce)=>{
            if(responce.status===200){
                this.productsdb=responce.body!;
                this.productschanged.next(this.productsdb);
            }
        }))
    }

    getproductById(prodId:string){
        return this.http.get<{productId:string,productName:string,farmerId:string,date:Date,availableQuantity:number,price:number,productDetails:string,productImages:string[],status:string}>('http://localhost:8765/inventry/getProductById/'+prodId,{ observe: 'response' }).pipe(map(responce=>{
            if(responce.status===200){
                this.productdb=responce.body;
                this.productchanged.next(this.productdb);

            }
        }))
    }

    deleteProductById(productId:string){
        return this.http.delete('http://localhost:8765/inventry/deleteProductByid/'+productId)
    }

    setshopimg(imgdata:any){
        

            this.http.post('http://localhost:8765/profile/uploadimg', imgdata, { observe: 'response' })
            .subscribe((response) => {
                if (response.status === 200) {
                console.log('Image uploaded successfully');
                }
                else{
                console.log('Image uploaded failed continuing with rest');
                }
            }
            );
    }


   

    
    getImage(imagename:string) {
      return   this.http.get('http://localhost:8765/profile/downloadimg/' + imagename,{ responseType: 'blob'});
          
      }

      getProductrating(id:string){

        return this.http.get<{avgrating:number}>('http://localhost:8765/review/getavgreviewofProduct/'+id);
      }

}