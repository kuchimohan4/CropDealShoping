import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { Subject, map } from "rxjs";

export interface shop{ shopid:number,shopName:string,shopImg:string,shopRating:number,shopDesc:string}


@Injectable({
    providedIn:'root'
})
export class shopService{
    shopchanged:Subject<{ shopid:number,shopName:string,shopImg:string,shopRating:number,shopDesc:string}>=new Subject();
    shopschanged:Subject<{shopid:number,shopName:string,shopImg:string,shopRating:number,shopDesc:string}[]>=new Subject();

    constructor(private http:HttpClient,private authservice:AuthenticationService,private roter:Router){}

    shop:any={ shopid:0,shopName:'',shopImg:'',shopRating:0,shopDesc:''};
    shopsList:{shopid:number,shopName:string,shopImg:string,shopRating:number,shopDesc:string}[]=[];

    addshop(shopinput:{ shopid:number,shopName:string,shopImg:string,shopRating:number,shopDesc:string}){
        return  this.http.post('http://localhost:8765/shop/addShop',shopinput,{ observe: 'response' });
    }



    updateShop(shopinput:{shopid:number,shopName:string,shopImg:string,shopRating:number,shopDesc:string}){

      return  this.http.put('http://localhost:8765/shop/updateShop',shopinput,{ observe: 'response' });
    }





    getshop(){
      return  this.http.get<{ shopid:number,shopName:string,shopImg:string,shopRating:number,shopDesc:string}>('http://localhost:8765/shop/shopById/'+this.authservice.getauth().id,{ observe: 'response' }).subscribe((response)=>{
      if(response.status===200){
        this.shop=response.body;
        this.shopchanged.next(this.shop);
      } 
      
      },error=>{
        console.log(error.error.message);
      })
    }

    getshopdetails(){
        return {...this.shop};
        
    }
    
    setshopimg(imgdata:any){
        const uploadImageData = new FormData();
        uploadImageData.append('image', imgdata,this.authservice.getauth().id+'_shopImg');

            this.http.post('http://localhost:8765/profile/uploadimg', uploadImageData, { observe: 'response' })
            .subscribe((response) => {
                if (response.status === 200) {
                console.log('Image uploaded successfully');
                }
                console.log('Image uploaded failed continuing with profile upload');
            }
            );
    }


    getshops(){
      return this.http.get<{shopid:number,shopName:string,shopImg:string,shopRating:number,shopDesc:string}[]>('http://localhost:8765/shop/allShops',{ observe: 'response' }).pipe(map((res)=>{
        if(res.status===200){
          if(res.body){
            this.shopsList=res.body;
            this.shopschanged.next(this.shopsList);
          }
        }
      }))

    }

    
    getImage(imagename:string) {
        //Make a call to Sprinf Boot to get the Image Bytes.
      return   this.http.get('http://localhost:8765/profile/downloadimg/' + imagename,{ responseType: 'blob'});
          
      }

    getshoprating(id:number){

      return this.http.get<{avgrating:number}>('http://localhost:8765/review/getavgreviewofshop/'+id);
    }

}