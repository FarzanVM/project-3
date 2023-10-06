import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { cartItemsSelector } from '../../../store/store.selector';
import { Observable } from 'rxjs';
import { Product } from 'src/shared/interfaces';
import * as AllActions from "../../../store/product.action"

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItemId:number[]=[]
  cartitems$:Observable<Product[]>
  total:number=0;

  constructor(private router:Router,private store:Store) { }

  ngOnInit(): void {
   
    this.cartitems$ = this.store.pipe(select(cartItemsSelector))
    this.cartitems$.subscribe(data=>{
      for(let item of data){
        this.total+=item.price
      }
    })
  }

  clearAll(){
    this.store.dispatch(AllActions.clearCart());
  }

  deletefromcart(product:Product){
    this.store.dispatch(AllActions.removeFromCart({product}))
  }

  gotocheckout(){
    this.router.navigate(['/','checkout'])
  }
}
