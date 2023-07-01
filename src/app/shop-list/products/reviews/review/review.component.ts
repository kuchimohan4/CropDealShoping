import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, async } from 'rxjs';
import { basketService } from 'src/app/basket/basket.service';
import { productservice } from '../../products.service';
import { reviewService } from '../review.service';
import { proileservice } from 'src/app/profile/profile.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{

  constructor(private activeroute:ActivatedRoute,private basketservice:basketService,private prodservice:productservice,private reviewService:reviewService,private profileService:proileservice){}
  role='DEALEAR';
  isaddingReview=false;
  productimg:any;
  isreviewAddedByDelear=false;
  product:any;

  reviews:{reviewid:number,DealearName:string,rating:number,review:string,reviewDesc:string}[]=[ ]

  getcolor(rating:number):string[]{
    let colors:string[]=[];
    switch(rating){
      case 1:
        colors.push('text-danger');
        colors.push('border-danger');
        
        break;
      case 2:
        colors.push('text-warning');
        colors.push('border-warning');
        break;
      case 3:
        colors.push('text-secondary');
        colors.push('border-secondary');
        break;
      case 4:
        colors.push('text-info');
        colors.push('border-info ');
        break;
      case 5:
        colors.push('text-success');
        colors.push('border-success');
        break;
    }

    // console.log(colors)

    return colors
  }
  
  ngOnInit(): void {
    this.activeroute.params.subscribe((params)=>{
      this.reviewService.getIsReviewAddedByDelear(params['productId']).subscribe((res:any)=>{
        if(res){
          this.isreviewAddedByDelear=res.added;
        }
      })
      this.basketservice.getproductById(params['productId']).subscribe(async(res:any)=>{
        if(res.status===200){
        this.product={productId:res.body.productId,productName:res.body.productName,productPrice:res.body.price,ProductDescription:res.body.productDetails,
        productRating:0,productQuantityAvl:res.body.availableQuantity};
          this.prodservice.getImage(res.body.farmerId+'_'+res.body.productName+'_productImg').subscribe((res)=>{
            this.productimg=URL.createObjectURL(res);
          })
        const prodrating=await this.prodservice.getProductrating(res.body.productId).toPromise();
        if(prodrating){
          this.product['productRating']=prodrating['avgrating']
        }
        const reviews:any=  await this.reviewService.getProductReviews(res.body.productId).toPromise();
        if(reviews){
          for( let review of reviews.body){
           let reviewdetail:{reviewid:number,DealearName:string,rating:number,review:string,reviewDesc:string}=
           {reviewid:review.reviewId,DealearName:'',rating:review.rating,review:review.review,reviewDesc:review.description}
           const profile:any=await this.profileService.getProfileByid(review.dealearId).toPromise();
           if(profile){
            reviewdetail.DealearName=profile.body.name;
           }
           this.reviews.push(reviewdetail);
          }
        }
        }
      })
    })
   
  }

  


}
