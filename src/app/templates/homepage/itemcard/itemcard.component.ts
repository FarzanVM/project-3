import { Component, Input, OnInit } from '@angular/core';
import * as AllActions from "../../../store/product.action"
import {item} from'./item';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Product } from 'src/shared/interfaces';
import { cartItemsSelector } from '../../../store/store.selector';

@Component({
  selector: 'app-itemcard',
  templateUrl: './itemcard.component.html',
  styleUrls: ['./itemcard.component.scss']
})
export class ItemcardComponent implements OnInit {
  @Input() item:item|any={}

  msglist:string[] = ["Added to wishlist","Added to Cart","Added to Compare","Already Exist in Cart"]
  msg:string|any="";

  qckview:boolean=false;
  quickviewitem:item|any={};
  cartitem:number[]=[];
  exist:boolean;
  // itemlist:any[]=[]
  constructor(private router:Router,private store:Store) { }

  ngOnInit(): void {
    localStorage.removeItem('cartitems')
  }
  gotoproduct(id:number){
    this.router.navigate(['/','product',id])
  }

  addtowishlist(id:number,msgIndex:number){
    this.msg = this.msglist[msgIndex];
    setTimeout(() =>{
      this.msg = ""
    },3000)

  }

  quickview(id:number){
    // getting the id of product for quickview
    this.qckview = !this.qckview;
    if(this.qckview==true){
      this.quickviewitem = this.item
      }
  }

  addtoCart(product:Product,msgIndex:number){
    // checking if item already added to cart
    this.store.pipe(select(cartItemsSelector)).subscribe(items=>{
      for(let item of items){
        if(item==product){
          this.exist=true;
        }
      }
    })

    if(this.exist){
      this.msg = this.msglist[3];
        setTimeout(() =>{
        this.msg = ""
      },3000)
    }
    else{
      this.store.dispatch(AllActions.addToCart({product}))
      this.msg = this.msglist[msgIndex];
        setTimeout(() =>{
        this.msg = ""
      },3000)
    }
   
  }
  addtocompare(id:number,msgIndex:number){
    this.msg = this.msglist[msgIndex];
    setTimeout(() =>{
      this.msg = ""
    },3000)

  }
  closeview(){
    this.qckview=false;
  }

}
