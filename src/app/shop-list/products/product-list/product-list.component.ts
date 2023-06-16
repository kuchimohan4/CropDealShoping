import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  isowner=true;

  products:{productId:string,productName:string,productPrice:number,ProductDescription:string,
    productRating:number,productQuantityAvl:number,productImg:string,CartQuantity:number}[]=[
      {productId:"pro1",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro2",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro3",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro4",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro5",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro6",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro7",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro8",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro9",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro10",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro11",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro12",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro13",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
        {productId:"pro14",productName:'Apple',productPrice:150.0,ProductDescription:'Card description goes here.',
        productRating:4.5,productQuantityAvl:56,productImg:'assets/images/apple.jfif',CartQuantity:0},
    ]


    quantityIncresend(productId:string){
     
      
      this.products.forEach((product)=>{ 
        
        if(product.productId===productId){
          if(!(product.CartQuantity===product.productQuantityAvl)){
          product.CartQuantity=product.CartQuantity+1;
          }
          
        }

      })
    }

    quantitydecresed(productId:string){

      this.products.forEach((product)=>{ 
        
        if(product.productId===productId){
          if(!(product.CartQuantity===0)){
          product.CartQuantity=product.CartQuantity-1;
          }
        }

      })
    }

}
