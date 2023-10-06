import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as AllActions from '../../../store/product.action';
import { Store, select } from '@ngrx/store';
import { allProductSelector } from '../../../store/store.selector';
import { Observable, map } from 'rxjs';
import { Product } from 'src/shared/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id:number=0;
  itemlist$:Observable<Product[]>;
  // item:any[] =[]
  item:Observable<Product>;
  constructor(private queryroute:ActivatedRoute,private router:Router,private store:Store) { }

  ngOnInit(): void {

    this.queryroute.params.subscribe(url=>{
      this.store.dispatch(AllActions.getAllProduct())
      this.itemlist$ = this.store.pipe(select(allProductSelector))
      this.item = this.store.select(allProductSelector).pipe(
        map(itemlist => itemlist?.filter(item=>item.id==url['id'])))
    })

  }
  gotoproduct(id:number){
    this.router.navigate(['/','product',id]);
  }
  
}
