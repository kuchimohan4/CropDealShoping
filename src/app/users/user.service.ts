import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})
export class userService{
    constructor(private http:HttpClient){}

    getFarmers(){

       return this.http.get('http://localhost:8765/adminControl/getFarmers',{ observe: 'response' })

    }

    doesFarmerHaveashop(farmerid:number){
        return this.http.get('http://localhost:8765/shop/doesFarmerHaveShop/'+farmerid,{ observe: 'response' })
    }


    getproductsoffarmer(id:number){

        return this.http.get<{productId:string,productName:string,farmerId:string,date:Date,availableQuantity:number,price:number,productDetails:string,productImages:string[],status:string}[]>("http://localhost:8765/inventry/getAllProductOfFarmer/"+id,{ observe: 'response' });
    }

    getDelears(){
        return this.http.get('http://localhost:8765/adminControl/getDelears',{ observe: 'response' })
    }

    changeAccountStatus(AccountStatus:{id:number,accountNonLocked:boolean}){
        return this.http.put('http://localhost:8765/adminControl/changeAccountStatus',AccountStatus,{ observe: 'response' })

    }

}