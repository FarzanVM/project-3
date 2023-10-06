import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
// importing actions
import * as AllActions from "../../../store/product.action"
import { allProductSelector } from '../../../store/store.selector';
import { Observable } from 'rxjs';
import { AllProduct, Product } from 'src/shared/interfaces';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {

  index=0;
  imglist:string[]=["assets/images/background/shoes.jpg","assets/images/background/shirts.jpg","assets/images/background/watch.jpg"]
  msglist:string[] = ["Added to wishlist","Added to Cart","Added to Compare"]
  msg:string|any="";

  // Observable of type Product list is the data we get from the store
  itemlist$:Observable<Product[]>;

  qckview:boolean=false;
  quickviewitem:any[]=[]

  constructor(private sanitizer: DomSanitizer,private router:Router,private store:Store) { 
  }
 
  ngOnInit(): void {
   
    this.store.dispatch(AllActions.getAllProduct())
    this.itemlist$ = this.store.pipe(select(allProductSelector))
  }

  goleft(i:number){
    this.index+=i
    if(this.index<0){
      this.index=this.imglist.length-1
    }

  }
  goright(i:number){
    this.index+=i
    if(this.index>=this.imglist.length){
      this.index=0;
    }

  }
  gotoproduct(id:number){
    this.router.navigate(['/','product',id])
  }
}
