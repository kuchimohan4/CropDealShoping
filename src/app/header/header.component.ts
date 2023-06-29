import { Component,OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { BasketComponent } from '../basket/basket.component';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../auth/auth.service';
import { proileservice } from '../profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private matdialo:MatDialog,private authservice:AuthenticationService,private profilesrvice:proileservice){}


  role:string='';
  uplaodedimg:any;
  

  ngOnInit(): void {

    this.getprofileimg();
    
    this.role= this.authservice.getauth().role;
    this.authservice.authemiter.subscribe((role)=>{
    this.role=role;
    this.getprofileimg();
    })
     
    
  }

  getprofileimg(){
    this.profilesrvice.getImage(this.authservice.getauth().id+'_profile').subscribe(
      res => {
        console.log(res)
        this.uplaodedimg  = URL.createObjectURL(res); 
      });
  }



  isDropdownOpen=false;


  openDropdown(){
    this.isDropdownOpen=!this.isDropdownOpen;
  }

  opencart(){
    this.matdialo.open(BasketComponent,{
     width:'60%',
    })
   }

   logout(){
    this.authservice.logout()
   }


}
