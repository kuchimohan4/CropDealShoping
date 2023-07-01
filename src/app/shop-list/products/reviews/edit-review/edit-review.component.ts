import { Component, Input,Output,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { reviewService } from '../review.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit{

  constructor(private reviewservice:reviewService,private routr:Router,private activeroute:ActivatedRoute){}
  error:any;
  @Input() productId:string='';
  @Output( )  cancelediting:Subject<boolean>=new Subject<boolean>();
  reviewForm:FormGroup=new FormGroup({
    'review':new FormControl(null,[Validators.required]),
    'reviwDesc':new FormControl(null,[Validators.required,Validators.minLength(40)])
  })

  ngOnInit(): void {
    console.log(this.productId)
  }

  currentRate=0;

  submitForm(){
    console.log(this.reviewForm.value['review'],this.productId,this.currentRate);
   let inputreview= {rating:this.currentRate,review:this.reviewForm.value['review'],description:this.reviewForm.value['reviwDesc']}
    this.reviewservice.addreview(this.productId,inputreview).subscribe((res)=>{
      if(res.status===200){
        this.routr.navigate(['../'], { relativeTo: this.activeroute });
      }
      else
      {console.log(res)}
    },error=>{
      console.log(error);
      this.error=error.error.message;
    });
   
  }


  canceladding(){
    this.cancelediting.next(true);
  }

}
