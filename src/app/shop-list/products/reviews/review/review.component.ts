import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  role='DEALEAR';
  isaddingReview=false;

  product={productId:"pro1",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
  productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0};

  reviews:{reviewid:number,DealearName:string,rating:number,review:string,reviewDesc:string}[]=[
    {reviewid:1,DealearName:'Kuchi Hareesh',rating:4,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:2,DealearName:'Kuchi Hareesh',rating:5,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:3,DealearName:'Kuchi Hareesh',rating:1,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:4,DealearName:'Kuchi Hareesh',rating:3,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:5,DealearName:'Kuchi Hareesh',rating:2,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:6,DealearName:'Kuchi Hareesh',rating:1,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:7,DealearName:'Kuchi Hareesh',rating:5,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:8,DealearName:'Kuchi Hareesh',rating:2,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:9,DealearName:'Kuchi Hareesh',rating:3,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:10,DealearName:'Kuchi Hareesh',rating:4,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:11,DealearName:'Kuchi Hareesh',rating:5,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
    {reviewid:12,DealearName:'Kuchi Hareesh',rating:2,review:'good',reviewDesc:'one of the best vegitables i have ever brought.pakaging was also great.'},
 
  ]

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
   
  }

  


}
