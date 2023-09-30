import { Component, Input, OnInit } from '@angular/core';
import data from '../../../../data/data.json'
import {item} from'./item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itemcard',
  templateUrl: './itemcard.component.html',
  styleUrls: ['./itemcard.component.scss']
})
export class ItemcardComponent implements OnInit {
  @Input() item:item|any={}

  msglist:string[] = ["Added to wishlist","Added to Cart","Added to Compare"]
  msg:string|any="";

  qckview:boolean=false;
  quickviewitem:item|any={};
  cartitem:number[]=[];
  // itemlist:any[]=[]
  constructor(private router:Router) { }

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
  addtoCart(id:number,msgIndex:number){
    const cartitem = localStorage.getItem('cartitems');
    if(cartitem){
      this.cartitem= JSON.parse(cartitem);
      this.cartitem.push(id)
    }
    else{
      this.cartitem.push(id)
    }
    // this.cartitem.push(id);
    // console.log(this.cartitem)
    localStorage.setItem('cartitems',JSON.stringify(this.cartitem));
    this.msg = this.msglist[msgIndex];
    setTimeout(() =>{
      this.msg = ""
    },3000)
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
