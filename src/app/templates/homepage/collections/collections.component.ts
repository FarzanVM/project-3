import { Component, OnInit } from '@angular/core';
import data from '../../../../data/data.json'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  msglist:string[] = ["Added to wishlist","Added to Cart","Added to Compare"]
  msg:string|any="";

  itemlist:any[] =[];
  cartitem:number[]=[];
  qckview:boolean=false;
  quickviewitem:any[]=[]

  constructor(private sanitizer: DomSanitizer,private router:Router) { 
    
  }
 
  ngOnInit(): void {
    this.itemlist = data;
    console.log(this.itemlist)
    for(let item of this.itemlist){
      console.log(item.imgsrc)
    }
  }
  gotoproduct(id:number){
    console.log(id)
    this.router.navigate(['/','product',id])
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
