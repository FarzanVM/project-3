import { Component, OnInit } from '@angular/core';
import data from '../../../../data/data.json'

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss']
})
export class AllproductsComponent implements OnInit {
  itemlist:any[]=[];
  constructor() { }
  h:string="300px"
  showcat:boolean=false;
  slideheight:number=0;

  msglist:string[] = ["Added to wishlist","Added to Cart","Added to Compare"]
  msg:string|any="";

  cartitem:number[]=[];
  qckview:boolean=false;
  quickviewitem:any[]=[]

  ngOnInit(): void {
    this.itemlist = data;
  }
  showslide(){
    this.showcat=!this.showcat;
  }

  addtoCart(id:number,msgIndex:number){
    this.cartitem.push(id);
    console.log(this.cartitem)
    localStorage.setItem('cartitems',JSON.stringify(this.cartitem));
    this.msg = this.msglist[msgIndex];
    setTimeout(() =>{
      this.msg = ""
    },3000)
  }

  addtowishlist(id:number,msgIndex:number){

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
  quickview(id:number){
    console.log(id)
    this.qckview = !this.qckview;
    if(this.qckview==true){
      this.quickviewitem = data.filter(data=>data.id==id)
      }
    console.log(this.quickviewitem[0].imgsrc)
  }
  
  closeview(){
    this.qckview=false;
  }

}
