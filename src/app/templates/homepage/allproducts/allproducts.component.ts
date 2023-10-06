import { Component, OnInit } from '@angular/core';

import * as AllActions from "../../../store/product.action";
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Product } from 'src/shared/interfaces';
import { allProductSelector } from '../../../store/store.selector';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss']
})
export class AllproductsComponent implements OnInit {

  itemlist$:Observable<Product[]>;
  constructor(private store:Store,private queryroute:ActivatedRoute) { }
  showcat:boolean=false;
  slideheight:number=0;

  ngOnInit(): void {
    // getting product id from urls and filtering only that products
    this.queryroute.params.subscribe(url=>{
      this.store.dispatch(AllActions.getAllProduct())
      this.itemlist$ = this.store.select(allProductSelector).pipe(
        map(itemlist => itemlist?.filter(item => item.type ===url['type'])
          )) 
    }) 
   
  }
  showslide(){
    this.showcat=!this.showcat;
  }
}
