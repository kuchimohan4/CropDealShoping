import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Injectable({
    providedIn:'root'
})
export class reviewService{
    constructor(private http:HttpClient,private authservice:AuthenticationService){}


    getProductReviews(productId:string){
        return this.http.get('http://localhost:8765/review/getReviewsByProductId/'+productId,{ observe: 'response' })
    }

    getIsReviewAddedByDelear(productId:string){
        return this.http.get('http://localhost:8765/review/isDelearAddedreviewForProduct/'+productId)
    }

    addreview(productId:string, inputReview:{rating:number,review:string,description:string}){

        return this.http.post('http://localhost:8765/review/addReview/'+productId,inputReview,{ observe: 'response' });
    }

}