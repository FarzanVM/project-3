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
    console.log(id)
    this.qckview = !this.qckview;
    if(this.qckview==true){
      this.quickviewitem = this.item
      }
    console.log(this.quickviewitem[0].imgsrc)
  }
  addtoCart(id:number,msgIndex:number){
    const cartitem = localStorage.getItem('cartitems');
    if(cartitem){
      console.log(cartitem,"cart")
      this.cartitem= JSON.parse(cartitem);
      console.log(this.cartitem,"now")
      this.cartitem.push(id)
      console.log("here",this.cartitem)
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
