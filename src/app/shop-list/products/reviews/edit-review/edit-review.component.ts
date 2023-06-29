import { Component, Input,Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent {


  
  @Input() productId:string='';
  @Output( )  cancelediting:Subject<boolean>=new Subject<boolean>();
  reviewForm:FormGroup=new FormGroup({
    'review':new FormControl(null,[Validators.required]),
    'reviwDesc':new FormControl(null,[Validators.required,Validators.minLength(40)])
  })

  currentRate=0;

  submitForm(){
    console.log(this.reviewForm,this.productId,this.currentRate);
    this.cancelediting.next(true);
  }


  canceladding(){
    this.cancelediting.next(true);
  }

}
