import { Component, OnInit } from '@angular/core';
import { shopService } from '../shop.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  constructor(private shopservice:shopService){}
  error:any;

  ngOnInit(): void {
    this.shopservice.getshops().subscribe((res)=>{
    },error=>{
      console.log(error)
      this.error=error.error.message;
    })
    this.shopservice.shopschanged.subscribe((shopsList)=>{
      shopsList.forEach(async(shop)=>{

        if(shop.shopImg){
           const imgfile=  await  this.shopservice.getImage(shop.shopid+'_shopImg').toPromise();
          if(imgfile){
            shop.shopImg=URL.createObjectURL(imgfile);
          }
          const shoprating=await  this.shopservice.getshoprating(shop.shopid).toPromise();
          if(shoprating){
            shop.shopRating=shoprating.avgrating;
          }
        }
       let shopmaped:{shopid:number,shopTittle:string,shopImage:string,shopRating:number,shopDescription:string}=
        {shopid:shop.shopid,shopTittle:shop.shopName,shopImage:shop.shopImg,shopRating:shop.shopRating,shopDescription:shop.shopDesc}
      
        this.shopsList.push(shopmaped)
      })
    })
  }


  shopsList:{shopid:number,shopTittle:string,shopImage:string,shopRating:number,shopDescription:string}[]=[
    // {shopid:2,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    // {shopid:1,shopTittle:'Burger King',shopImage:'assets/images/burger.avif',shopRating:4.5,shopDescription:'This is a longer card with supporting text below as a natural lead-in to additional content.'},
    

  ];  


}
