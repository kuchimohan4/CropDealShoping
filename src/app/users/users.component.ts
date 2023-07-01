import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';
import { userService } from './user.service';
import { async } from 'rxjs';
import { productservice } from '../shop-list/products/products.service';
import { basketService } from '../basket/basket.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  constructor(private router:Router,private activatedroute:ActivatedRoute,private authservice:AuthenticationService,private userservice:userService,private productService:productservice,private basketservice:basketService){}
  farmerlist:any[]=[];
  userType='';
  ngOnInit(): void {
    if(!(this.authservice.getauth().role==='ADMIN')){
      this.router.navigate(['/login'])
    }
    if(this.activatedroute.snapshot.url[0].path==='farmers'){
      this.userType='farmers';
      this.userservice.getFarmers().subscribe(async(res:any)=>{
        if(res.status===200){
          console.log(res.body)
          for(let farmer of res.body){
            console.log(farmer)
          let user:{userId:number,userName:string,userEmail:string,accountNonLocked:boolean,FarmerHaveAShop:boolean,noOfProducts:number}=
          {userId:farmer.id,userName:farmer.name,userEmail:farmer.email,accountNonLocked:farmer.accountNonLocked,FarmerHaveAShop:false,noOfProducts:0};
            const doesFarmerHAveaShop:any=await this.userservice.doesFarmerHaveashop(farmer.id).toPromise();
            if(doesFarmerHAveaShop){
              user.FarmerHaveAShop=doesFarmerHAveaShop.body.haveAShop;
            }
            const farmerProducts:any=await this.userservice.getproductsoffarmer(farmer.id).toPromise();
            if(farmerProducts){
              user.noOfProducts=farmerProducts.body.length;
            }
            console.log(user)
          this.farmerlist.push(user)
          }
        }
      })
    }else if(this.activatedroute.snapshot.url[0].path==='dealer'){
      this.userType='dealer';
      this.userservice.getDelears().subscribe(async(res:any)=>{
        if(res.status===200){
          console.log(res.body)
          for(let delear of res.body){
          let user:{userId:number,userName:string,userEmail:string,accountNonLocked:boolean,noOfOrders:number}=
          {userId:delear.id,userName:delear.name,userEmail:delear.email,accountNonLocked:delear.accountNonLocked,noOfOrders:0};
          const orderdetail:any=await this.basketservice.getOrdersOFDelearByDelaerId(delear.id).toPromise();
            if(orderdetail){
              user.noOfOrders=orderdetail.body.length;
            }
            console.log(user)
          this.farmerlist.push(user)
          }
        }
      })

    }
   
    

  }

  
  activateUser(userId:number){
    console.log(userId)
  let activateInput= {id:userId,accountNonLocked:true};
  this.userservice.changeAccountStatus(activateInput).subscribe((res)=>{
    if(res.status===200){
      this.farmerlist.forEach((farmer)=>{
        if(farmer.userId===userId){
          farmer.accountNonLocked=true;
        }
      })
    }
  })

  }

  lockUser(userId:number){
    let LockuserInput= {id:userId,accountNonLocked:false};
    this.userservice.changeAccountStatus(LockuserInput).subscribe((res)=>{
      if(res.status===200){
        this.farmerlist.forEach((farmer)=>{
          if(farmer.userId===userId){
            farmer.accountNonLocked=false;
          }
        })
      }
    })

  }

}
